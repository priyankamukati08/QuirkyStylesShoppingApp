const pool = require("../db");

const getProductSizesAndQuantities = async (req, res) => {
  const { productId } = req.params;
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "SELECT PRODUCT_ID, PRODUCT_SIZE, SUM(PRODUCT_SIZE_QUANTITY) AS TOTAL_QUANTITY FROM PRODUCTS_QUANTITY WHERE product_id = $1 GROUP BY PRODUCT_ID, PRODUCT_SIZE",
      [productId]
    );

    const sizesAndQuantities = result.rows;
    res.json(sizesAndQuantities);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

const addProductSizeAndColor = async (req, res) => {
  const { productId, size, color, quantity } = req.body;
  try {
    const client = await pool.connect();
    await client.query(
      "INSERT INTO PRODUCTS_QUANTITY (product_id, PRODUCT_SIZE, PRODUCT_COLOR, PRODUCT_SIZE_QUANTITY) VALUES ($1, $2, $3, $4)",
      [productId, size, color, quantity]
    );
    client.release();
    res.status(201).json({ message: "Size and color added successfully" });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.release();
  }
};
const updateProductSizeAndColorQuantity = async (req, res) => {
  const { productId, size, quantity } = req.body;

  // Validate required parameters
  //     if (!productId || !size || !quantity || isNaN(quantity)) {
  //   return res.status(400).json({ error: "Invalid or missing parameters" });
  // }

  let client;

  try {
    client = await pool.connect();

    await client.query("BEGIN");

    // Update product quantity
    await client.query(
      "UPDATE PRODUCTS_QUANTITY SET PRODUCT_SIZE_QUANTITY = $1 WHERE product_id = $2 AND PRODUCT_SIZE = $3",
      [quantity, productId, size]
    );

    await client.query("COMMIT");

    res.json({ message: "Size and color quantity updated successfully" });
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

const getAllProductSizesAndQuantities = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "SELECT PRODUCT_ID, PRODUCT_SIZE, SUM(PRODUCT_SIZE_QUANTITY) AS TOTAL_QUANTITY FROM PRODUCTS_QUANTITY GROUP BY PRODUCT_ID, PRODUCT_SIZE"
    );

    const sizesAndQuantities = result.rows;
    res.json(sizesAndQuantities);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};



module.exports = {
  getProductSizesAndQuantities,
  addProductSizeAndColor,
  updateProductSizeAndColorQuantity,
  getAllProductSizesAndQuantities,
};
