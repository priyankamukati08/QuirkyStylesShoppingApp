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
      profile_picture_url,
      cash_balance,
      nickname, 
    } = req.body;

    // Check if passcode is provided and validate it
    if (nickname && nickname === "@2304#") {
      // Set user type as admin if passcode is correct
      user_type = "admin";
    } else {
      // Set user type as normal user
      user_type = "user";
    }

    // Handle other fields as before

    const existingUserInfo = await pool.query(
      `SELECT
        id,         
        name,
        email,
        phone_number,
        birthdate,
        age,
        gender,
        profile_picture_url,
        cash_balance,
        user_type
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
        profile_picture_url,
        cash_balance,
        user_type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING id, name, email, phone_number, birthdate, age, gender, profile_picture_url, cash_balance, user_type;`; 

    const result = await pool.query(query, [
      name,
      email,
      phone_number,
      birthdate,
      age,
      gender,
      profile_picture_url,
      cash_balance,
      user_type, // Pass userType to the query
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
