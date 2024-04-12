const pool = require("../db");

const getWishlistItemsByUserId = async (req, res) => {
  const userId = req.params.userid;
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT w.*, p.product_brand_name, p.product_image_url, p.product_price, p.product_description
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = $1`,
      [userId]
    );
    const wishlistItems = result.rows;
    client.release();
    res.json(wishlistItems);
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToWishlist = async (req, res) => {
  const { product_id, user_id } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO wishlist (product_id, user_id) VALUES ($1, $2) RETURNING *",
      [product_id, user_id]
    );
    const newItem = result.rows[0];
    client.release();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFromWishlist = async (req, res) => {
  const user_id = req.params.userid;
  const product_id = req.params.productid;

  try {
    const client = await pool.connect();
    await client.query(
      "DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );
    client.release();
    res.json({ message: "Wishlist item removed successfully" });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getWishlistItemsByUserId,
  addToWishlist,
  removeFromWishlist,
};
