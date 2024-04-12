const pool = require("../db");

const getAllUserOrders = async (req, res) => {
  try {
    const userId = req.params.userid;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const client = await pool.connect();
    const result = await client.query(
      `SELECT 
        user_order.id AS order_id, 
        user_order.user_id, 
        user_order.status, 
        user_order.order_payment_type, 
        user_order.shipping_address, 
        user_order.billing_address, 
        user_order.payment_status, 
        user_order.delivery_status, 
        user_order.order_notes, 
        user_order.estimated_tax, 
        user_order.order_price,
        user_order.total_order_price_with_tax,  
        user_order.create_date, 
        order_details.product_id, 
        order_details.product_price, 
        order_details.product_quantity,
        order_details.product_size,
        products.product_image_url,
        products.product_brand_name,
        products.product_description
      FROM 
        user_order
      JOIN 
        order_details ON user_order.id = order_details.order_id
      JOIN 
        products ON order_details.product_id = products.id
      WHERE 
        user_order.user_id = $1`,
      [userId]
    );

    const userOrders = result.rows;
    client.release();
    res.json(userOrders);
  } catch (err) {
    console.error("Error fetching user orders", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUserOrder = async (req, res) => {
  let client;
  try {
    const {
      user_id,
      status,
      order_payment_type,
      shipping_address,
      billing_address,
      payment_status,
      delivery_status,
      order_notes,
      estimated_tax,
      order_price,
      total_order_price_with_tax,
      products,
    } = req.body;

    if (
      !user_id ||
      !status ||
      !shipping_address ||
      !billing_address ||
      !payment_status ||
      !delivery_status ||
      !products
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Products must be a non-empty array" });
    }

    client = await pool.connect();
    await client.query("BEGIN");

    const orderResult = await client.query(
      "INSERT INTO user_order (user_id, status, order_payment_type, shipping_address, billing_address, payment_status, delivery_status, order_notes,estimated_tax,order_price,total_order_price_with_tax) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id",
      [
        user_id,
        status,
        order_payment_type,
        shipping_address,
        billing_address,
        payment_status,
        delivery_status,
        order_notes,
        estimated_tax,
        order_price,
        total_order_price_with_tax,
      ]
    );
    const orderId = orderResult.rows[0].id;

    for (const product of products) {
      await client.query(
        "INSERT INTO order_details (order_id, product_id, product_price, product_quantity, product_size) VALUES ($1, $2, $3, $4, $5)",
        [
          orderId,
          product.product_id,
          product.product_price,
          product.product_quantity,
          product.product_size,
        ]
      );
    }

    await client.query("COMMIT");
    client.release();

    res.status(201).json({ message: "User order created successfully" });
  } catch (err) {
    console.error("Error creating user order", err);
    if (client) await client.query("ROLLBACK");
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

const updateUserOrder = async (req, res) => {
  let client;
  try {
    const id = req.params.id;
    const {
      status,
      order_payment_type,
      total_price,
      shipping_address,
      billing_address,
      payment_status,
      delivery_status,
      order_notes,
      products,
    } = req.body;

    if (
      !status ||
      !total_price ||
      !shipping_address ||
      !billing_address ||
      !payment_status ||
      !delivery_status ||
      !order_notes ||
      !products
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Products must be a non-empty array" });
    }

    client = await pool.connect();
    await client.query("BEGIN");

    await client.query(
      "UPDATE user_order SET status = $1, order_payment_type = $2, total_price = $3, shipping_address = $4, billing_address = $5, payment_status = $6, delivery_status = $7, order_notes = $8, update_date = CURRENT_TIMESTAMP WHERE id = $9",
      [
        status,
        order_payment_type,
        total_price,
        shipping_address,
        billing_address,
        payment_status,
        delivery_status,
        order_notes,
        id,
      ]
    );

    await client.query("DELETE FROM order_details WHERE order_id = $1", [id]);

    for (const product of products) {
      await client.query(
        "INSERT INTO order_details (order_id, product_id, product_price, product_quantity, product_size) VALUES ($1, $2, $3, $4, $5)",
        [
          id,
          product.product_id,
          product.product_price,
          product.product_quantity,
          product.product_size,
        ]
      );
    }

    await client.query("COMMIT");
    client.release();

    res.json({ message: "User order updated successfully" });
  } catch (err) {
    console.error("Error updating user order", err);
    if (client) await client.query("ROLLBACK");
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

const deleteUserOrder = async (req, res) => {
  let client;
  try {
    const id = req.params.id;
    client = await pool.connect();
    await client.query("BEGIN");

    await client.query("DELETE FROM order_details WHERE order_id = $1", [id]);
    await client.query("DELETE FROM user_order WHERE id = $1", [id]);

    await client.query("COMMIT");
    client.release();

    res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting user order", err);
    if (client) await client.query("ROLLBACK");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserOrdersByUserIdAndOrderId = async (req, res) => {
  try {
    const { userid, orderid } = req.params;

    if (!userid || !orderid) {
      return res
        .status(400)
        .json({ error: "Both user ID and order ID are required" });
    }

    const client = await pool.connect();
    const result = await client.query(
      `SELECT 
        user_order.id AS order_id, 
        user_order.user_id,   
        user_order.status, 
        user_order.order_payment_type, 
        user_order.shipping_address, 
        user_order.billing_address, 
        user_order.payment_status, 
        user_order.delivery_status, 
        user_order.order_notes,
        user_order.estimated_tax,
        user_order.order_price,
        user_order.total_order_price_with_tax,   
        user_order.create_date, 
        order_details.product_id, 
        order_details.product_price, 
        order_details.product_quantity,
        order_details.product_size,
        products.product_image_url,
        products.product_brand_name,
        products.product_description
      FROM 
        user_order
      JOIN 
        order_details ON user_order.id = order_details.order_id
      JOIN 
        products ON order_details.product_id = products.id
      WHERE 
        user_order.user_id = $1
      AND
        user_order.id = $2`,
      [userid, orderid]
    );

    const userOrder = result.rows;
    client.release();
    res.json(userOrder);
  } catch (err) {
    console.error("Error fetching user orders by order ID", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUserOrders,
  getUserOrdersByUserIdAndOrderId,
  createUserOrder,
  updateUserOrder,
  deleteUserOrder,
};
