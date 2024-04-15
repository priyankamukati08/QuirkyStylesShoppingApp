const pool = require("../db");

const getAllProducts = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products");
    const products = result.rows;
    client.release();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addNewProduct = async (req, res) => {
  try { 
    const {
      product_brand_name,
      product_description,
      product_category,
      product_price,
      product_image_url,
      sizes,
    } = req.body;

    // Set a default initial rating value
    const INITIAL_RATING = 0; // You can set any default value you prefer

    // Input validation
    if (
      !product_brand_name ||
      !product_description ||
      !product_category ||
      !product_price ||
      !product_image_url ||
      !sizes
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Begin transaction
    await pool.query("BEGIN");

    // Insert into PRODUCTS table
    const productInsertQuery = `
      INSERT INTO public.products (
        product_brand_name, product_description, product_category,
        product_price, product_rating, product_image_url
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;`;

    const productResult = await pool.query(productInsertQuery, [
      product_brand_name,
      product_description,
      product_category,
      product_price,
      INITIAL_RATING, // Set the initial rating value here
      product_image_url,
    ]);

    const productId = productResult.rows[0].id;

    // Extract sizes and quantities from the sizes string
    const sizesAndQuantities = sizes.split(",").reduce((acc, sizeQty) => {
      const [size, quantity] = sizeQty.trim().split(":");
      acc.push({ size: size.trim(), quantity: parseInt(quantity.trim()) });
      return acc;
    }, []);

    // Insert sizes and quantities into PRODUCTS_QUANTITY table
    for (const { size, quantity } of sizesAndQuantities) {
      const productQuantityInsertQuery = `
        INSERT INTO public.products_quantity (
          product_id, product_size, product_size_quantity
        ) VALUES ($1, $2, $3);`;

      await pool.query(productQuantityInsertQuery, [productId, size, quantity]);
    }

    await pool.query("COMMIT");

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding new product:", error);

    await pool.query("ROLLBACK");

    res.status(500).json({ error: "Internal Server Error" });
  }
};



const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    const product = result.rows[0];

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    client.release();
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProductById = async (req, res) => {
  const productId = req.params.id;
  const {
    product_brand_name,
    product_description,
    product_category,
    product_price,
    product_rating,
    product_total_quantity,
    product_image_url,
  } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE products 
       SET product_brand_name = $1, product_description = $2, product_category = $3, 
           product_price = $4, product_rating = $5, product_total_quantity = $6, product_image_url = $7
       WHERE id = $8
       RETURNING *`,
      [
        product_brand_name,
        product_description,
        product_category,
        product_price,
        product_rating,
        product_total_quantity,
        product_image_url,
        productId,
      ]
    );

    const updatedProduct = result.rows[0];

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    client.release();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId]
    );
    const deletedProduct = result.rows[0];

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    client.release();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProductDetails = async (req, res) => {
  const { id } = req.params;
  let { product_description, product_price } = req.body;

  // Parse product_price as a number
  product_price = parseFloat(product_price);

  if (isNaN(product_price)) {
    return res.status(400).json({ error: "Invalid product price" });
  }

  let client;

  try {
    client = await pool.connect();

    await client.query("BEGIN");

    // Update product details
    const query = `
      UPDATE products
      SET product_description = $1, product_price = $2
      WHERE id = $3
    `;
    const values = [product_description, product_price, id];
    await client.query(query, values);

    await client.query("COMMIT");

    res.json({ message: "Product details updated successfully" });
  } catch (err) {
    console.error("Error executing query", err);

    if (client) {
      await client.query("ROLLBACK");
      client.release();
    }

    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.release();
  }
};



module.exports = {
  getAllProducts,
  addNewProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  updateProductDetails,
};
