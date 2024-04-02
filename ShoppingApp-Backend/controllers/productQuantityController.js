const pool = require("../db");

// Get all product sizes and colors by product ID
const getProductSizesAndQuantities = async (req, res) => {
  const { productId } = req.params;
  let client;
  try {
    // Query the database to get sizes and quantities for the specified product ID
    client = await pool.connect();
    const result = await client.query(
      "SELECT PRODUCT_SIZE, SUM(PRODUCT_SIZE_QUANTITY) AS TOTAL_QUANTITY FROM PRODUCTS_QUANTITY WHERE product_id = $1 GROUP BY PRODUCT_SIZE",
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

// Add a new size and color for a product
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

// Update size and color quantity for a product
const updateProductSizeAndColorQuantity = async (req, res) => {
  const { productId, size, color, quantity } = req.body;
  try {
    const client = await pool.connect();
    await client.query(
      "UPDATE PRODUCTS_QUANTITY SET PRODUCT_SIZE_QUANTITY = $1 WHERE product_id = $2 AND PRODUCT_SIZE = $3 AND PRODUCT_COLOR = $4",
      [quantity, productId, size, color]
    );
    client.release();
    res.json({ message: "Size and color quantity updated successfully" });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  getProductSizesAndQuantities,
  addProductSizeAndColor,
  updateProductSizeAndColorQuantity,
};
