const pool = require("../db");

const createUser = async (req, res) => {
  try {
    const {
      user_full_name,
      user_email,
      user_phone_number,
      user_age,
      user_gender,
      user_shipping_address,
      user_billing_address,
      user_profile_picture_url,
      cash_balance,
    } = req.body;

    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO user_info (user_full_name, user_email, user_phone_number, user_age, user_gender, user_shipping_address, user_billing_address, user_profile_picture_url, cash_balance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
      [
        user_full_name,
        user_email,
        user_phone_number,
        user_age,
        user_gender,
        user_shipping_address,
        user_billing_address,
        user_profile_picture_url,
        cash_balance,
      ]
    );

    const newUser = result.rows[0];
    client.release();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
};
