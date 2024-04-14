const pool = require("../db");

// Middleware function to verify ID token and restrict access based on user type
async function verifyIdToken(req, res, next) {
  const idToken = req.headers.authorization; // Extract ID token from request header
  const decodedToken = jwt.decode(idToken);

  if (!decodedToken || !decodedToken.sub) {
    console.error("Invalid or missing user ID in token");
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Fetch user details including user_type from the database
  try {
    const userId = decodedToken.sub;
    const queryResult = await pool.query(
      `SELECT user_type FROM users WHERE id = $1`,
      [userId]
    );

    if (queryResult.rows.length === 0) {
      console.error("User not found in the database");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userType = queryResult.rows[0].user_type;

    // Define allowed routes based on user type
    const allowedRoutes = {
      admin: ["/adminpage", "/productManagement"],
      user: ["/userOrders", "/userAddress", "/cart", "/userWishlist"],
    };

    // Check if the requested route is allowed for the user's type
    const isRouteAllowed = allowedRoutes[userType].includes(req.path);

    if (!isRouteAllowed) {
      console.error("User does not have access to this route");
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("Error fetching user details from the database:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
