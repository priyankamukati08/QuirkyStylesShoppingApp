const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "config.env") });

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const port = process.env.PORT || 3001;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: " A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["ShoppingApp-Backend/swaggerDefinitions/*.yaml"],
  //apis: ["./swaggerDefinitions/*.yaml"],
};
const specs = swaggerJsDoc(options);
const app = require("./app");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
