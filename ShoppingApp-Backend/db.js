const { Pool } = require("pg");
// const dotenv = require("dotenv");

// const path = require("path");

// dotenv.config({ path: path.resolve(__dirname, "config.env") });
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
module.exports = pool;
