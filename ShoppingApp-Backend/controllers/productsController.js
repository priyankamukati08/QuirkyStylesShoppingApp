const pool = require("../db");

const getAllProducts = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products");
    const products = result.rows;
    client.release();
    res.json(products);
  } catch (err) {
    console.error("Error executing query", err);
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
      product_rating,
      product_total_quantity,
      product_image_url,
    } = req.body;

    const query = `
      INSERT INTO public.products (
        product_brand_name, product_description, product_category,
        product_price, product_rating, product_total_quantity
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`;

    const result = await pool.query(query, [
      product_brand_name,
      product_description,
      product_category,
      product_price,
      product_rating,
      product_total_quantity,
      product_image_url,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  let client;
  try {
    client = await pool.connect();
    const result = await client.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    const product = result.rows[0];


    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.release();
    }
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
           product_price = $4, product_rating = $5, product_total_quantity = $6
       WHERE id = $7
       RETURNING *`,
      [
        product_brand_name,
        product_description,
        product_category,
        product_price,
        product_rating,
        product_total_quantity,
        productId,
        product_image_url,
      ]
    );
    const updatedProduct = result.rows[0];
    client.release();

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

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
    client.release();

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
