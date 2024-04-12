const pool = require("../db");

// Function to add a product to the cart
const addToCart = async (req, res) => {
  const { user_id, product_id, product_quantity, product_size } = req.body;

  try {
    const client = await pool.connect();

    // Check if the product with the same ID and size already exists in the cart
    const existingProduct = await client.query(
      "SELECT * FROM carts WHERE user_id = $1 AND product_id = $2 AND product_size = $3",
      [user_id, product_id, product_size]
    );

    if (existingProduct.rows.length > 0) {
      // If the product exists, update its quantity
      const updatedQuantity = parseFloat(product_quantity);
      const result = await client.query(
        "UPDATE carts SET product_quantity = $1 WHERE user_id = $2 AND product_id = $3 AND product_size = $4 RETURNING *",
        [updatedQuantity, user_id, product_id, product_size]
      );
      const updatedItem = result.rows[0];
      res.status(200).json(updatedItem);
    } else {
      // If the product doesn't exist, add a new entry to the cart
      const result = await client.query(
        "INSERT INTO carts (user_id, product_id, product_quantity, product_size) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, product_id, product_quantity, product_size]
      );
      const addedItem = result.rows[0];
      res.status(201).json(addedItem);
    }

    client.release();
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get cart items by user ID
const getCartByUserId = async (req, res) => {
  const userId = req.params.userid;
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT c.*, p.product_brand_name, p.product_image_url, p.product_price, p.product_description, c.product_size
       FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );
    const cartItems = result.rows;
    res.json(cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};


// Function to delete cart items by user ID
const deleteCartByUserId = async (req, res) => {
  const userId = req.params.userid;

  try {
    const client = await pool.connect();
    await client.query("DELETE FROM carts WHERE user_id = $1", [userId]);
    client.release();
    res.sendStatus(204); // No content response
  } catch (err) {
    console.error("Error deleting cart items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCartByUserId, addToCart, deleteCartByUserId };
