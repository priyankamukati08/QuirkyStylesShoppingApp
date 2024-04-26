const { OpenAI } = require("openai");
const pool = require("../db");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateResponse(messages) {
  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo-0125",
    });
    console.log(completion.choices[0].message.content);
    return completion;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function findYellowShirt(prompt) {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products");
    const products = result.rows;

    // Create a prompt using the product descriptions and the query
    const user_message =
      products
        .map(
          (message) =>
            `Product ID: ${message.id}\nDescription: ${message.product_description}`
        )
        .join("\n") +
      "\n" +
      prompt;

    // Example data
    const chat_messages = [{ role: "user", content: user_message }];

    // Generate a response based on the prompt
    const response = await generateResponse(chat_messages);

    client.release();
    return response;
  } catch (err) {
    console.error("Error fetching products:", err);
    return null;
  }
}

const searchProducts = async (req, res) => {
  try {
    const queryParam = req.query.search;
    const prompt =
      "get me just the product id and nothing else. closest to " + queryParam;
    const generatedAnswers = await findYellowShirt(prompt);

    // Extract the product IDs from the OpenAI response
    const productIds = generatedAnswers.choices[0].message.content
      .split("\n")
      .map((line) => {
        const match = line.match(/\d+/);
        return match ? match[0] : null;
      })
      .filter((productId) => productId !== null);

    // Query the database for product details using the extracted IDs
    const client = await pool.connect();
    const productDetails = await Promise.all(
      productIds.map(async (productId) => {
        const query = "SELECT * FROM products WHERE id = $1";
        const result = await client.query(query, [productId]);
        return result.rows[0];
      })
    );
    client.release();

    // Send the product details in the response
    res.json({ products: productDetails });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  searchProducts,
};
