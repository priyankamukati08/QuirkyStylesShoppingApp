const pool = require("../db");

const addUserInfo = async (req, res) => {
  try {
    let {
      name,
      email,
      phone_number,
      birthdate,
      age,
      gender,
      shipping_address,
      billing_address,
      profile_picture_url,
      cash_balance,
    } = req.body;

    name = name ? name : null;
    phone_number = phone_number ? phone_number : null;
    birthdate = birthdate ? birthdate : null;
    age = age ? age : null;
    gender = gender ? gender : null;
    shipping_address = shipping_address ? shipping_address : null;
    billing_address = billing_address ? billing_address : null;
    profile_picture_url = profile_picture_url ? profile_picture_url : null;
    cash_balance = cash_balance ? cash_balance : null;

    const existingUserInfo = await pool.query(
      `SELECT
        id,         
        name,
        email,
        phone_number,
        birthdate,
        age,
        gender,
        shipping_address,
        billing_address,
        profile_picture_url,
        cash_balance 
        FROM public.user_info WHERE email = $1`,
      [email]
    );

    if (existingUserInfo.rows.length > 0) {
      res.status(201).json(existingUserInfo.rows[0]);
      return;
    }

    const query = `
      INSERT INTO public.user_info (
        name,
        email,
        phone_number,
        birthdate,
        age,
        gender,
        shipping_address,
        billing_address,
        profile_picture_url,
        cash_balance
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, name, email, phone_number, birthdate, age, gender, shipping_address, billing_address, profile_picture_url, cash_balance;`; // Include all columns in the RETURNING clause

    const result = await pool.query(query, [
      name,
      email,
      phone_number,
      birthdate,
      age,
      gender,
      shipping_address,
      billing_address,
      profile_picture_url,
      cash_balance,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addUserInfo,
};
