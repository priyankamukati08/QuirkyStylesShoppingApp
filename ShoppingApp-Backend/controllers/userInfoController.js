const pool = require("../db");

const addUserInfo = async (req, res) => {
  try {
    let { name, email, phone_number, birthdate, age, gender, nickname } =
      req.body;

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
        user_type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id, name, email, phone_number, birthdate, age, gender, user_type;`;

    const result = await pool.query(query, [
      name,
      email,
      phone_number,
      birthdate,
      age,
      gender,
      user_type, // Pass userType to the query
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userid;

    const userInfo = await pool.query(
      `SELECT
        id,         
        name,
        email,
        phone_number,
        birthdate,
        age,
        gender,
        user_type
        FROM public.user_info WHERE id = $1`,
      [userId]
    );

    if (userInfo.rows.length > 0) {
      res.status(200).json(userInfo.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.userid;
    const { fullName, email, mobileNumber, birthday, gender, age } =
      req.body;

    const query = `
      UPDATE public.user_info
      SET 
        name = $1,
        email = $2,
        phone_number = $3,
        birthdate = $4,
        gender = $5,
        age = $6

      WHERE id = $7
      RETURNING id, name, email, phone_number, birthdate, gender,age;`;

    const result = await pool.query(query, [
      fullName,
      email,
      mobileNumber,
      birthday,
      gender,
      age,
      userId,
    ]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addUserInfo,
  getUserInfo,
  updateUserInfo,
};
