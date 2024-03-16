const pool = require("../db");

const addToCart = async (req, res) => {
  const { user_id, product_id, product_quantity, product_size } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO carts (user_id, product_id, product_quantity, product_size) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, product_id, product_quantity, product_size]
    );
    const addedItem = result.rows[0];
    client.release();
    res.status(201).json(addedItem);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCartByUserId = async (req, res) => {
  const userId = req.params.userid;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT c.*, p.product_brand_name, p.product_image_url, p.product_price,p.product_description
       FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );
    const cartItems = result.rows;
    client.release();
    res.json(cartItems);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { getCartByUserId, addToCart };
