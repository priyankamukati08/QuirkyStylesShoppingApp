const pool = require("../db"); // Assuming you have a pool instance for database connections

const addUserAddress = async (req, res) => {
  try {
    const {
      user_id,
      fullname,
      mobilenumber,
      address,
      localitytown,
      city,
      state,
      zip,
      country,
      is_default,
      addresstype,
    } = req.body;

    // Insert the new address into the database
    const query = `
      INSERT INTO public.user_addresses (
        user_id,
        fullname,
        mobilenumber,
        address,
        localitytown,
        city,
        state,
        zip,
        country,
        is_default,
        addresstype
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11)
      RETURNING *;`;

    const result = await pool.query(query, [
      user_id,
      fullname,
      mobilenumber,
      address,
      localitytown,
      city,
      state,
      zip,
      country,
      is_default,
      addresstype,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding user address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const user_id = req.params.userid;

    // Fetch user addresses from the database based on user_id
    const query = `
      SELECT id, fullname, mobilenumber, address,localitytown, city, state, zip, country, is_default,addresstype
      FROM public.user_addresses
      WHERE user_id = $1;`;
      [user_id];

    const result = await pool.query(query, [user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user addresses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullname,
      mobilenumber,
      address,
      city,
      state,
      zip,
      country,
      is_default,
      addresstype,
    } = req.body;

    // Update the address in the database
    const query = `
      UPDATE public.user_addresses
      SET fullname = $1, mobilenumber = $2, address = $3, city = $4, state = $5, zip = $6, country = $7, is_default = $8,localitytown=$9,addresstype=$10
      WHERE id = $9
      RETURNING *;`;

    const result = await pool.query(query, [
      fullname,
      mobilenumber,
      address,
      city,
      state,
      zip,
      country,
      is_default,
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the address from the database
    const query = `
      DELETE FROM public.user_addresses
      WHERE id = $1;`;

    await pool.query(query, [id]);
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting user address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
 getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
