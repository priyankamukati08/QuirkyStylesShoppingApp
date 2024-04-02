const pool = require("../db");

// GET all wishlist items for a user
const getWishlistItemsByUserId = async (req, res) => {
  const userId = req.params.userid;
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT w.*, p.product_brand_name, p.product_image_url, p.product_price,p.product_description
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = $1`,
      [userId]
    );
    const wishlistItems = result.rows;
  
    res.json(wishlistItems);
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

// const getCartByUserId = async (req, res) => {
//   const userId = req.params.userid;

//   try {
//     const client = await pool.connect();
//     const result = await client.query(
//       `SELECT c.*, p.product_brand_name, p.product_image_url, p.product_price,p.product_description
//        FROM carts c
//        JOIN products p ON c.product_id = p.id
//        WHERE c.user_id = $1`,
//       [userId]
//     );
//     const cartItems = result.rows;
//     client.release();
//     res.json(cartItems);
//   } catch (err) {
//     console.error("Error executing query", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// POST a new wishlist item
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

// DELETE a wishlist item
const removeFromWishlist = async (req, res) => {
  const user_id = req.params.userid;
  const product_id = req.params.productid; // Assuming you pass product id as a URL parameter

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
