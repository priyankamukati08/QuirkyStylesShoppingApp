const { OpenAI } = require("openai");
const pool = require("../db");

const openai = new OpenAI({
  apiKey: "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",
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
    const queryParam = req.query.search_query;
    const prompt =
      "get me just the product id and description and nothing else. closest to " +
      queryParam;
    const generatedAnswers = await findYellowShirt(prompt);
    res.json({ answer: generatedAnswers });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  searchProducts,
};
