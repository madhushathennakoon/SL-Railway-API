const express = require("express");
const cors = require("cors");
const trainRouter = require("./routes/trainRoute");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

// Express app
const app = express();

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(cors());

const swaggerJSDocs = YAML.load("./swagger-docs.yaml");
app.use("/api/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

// Routes
app.use("/api/train", trainRouter);

module.exports = app;
