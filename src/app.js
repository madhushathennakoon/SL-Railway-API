const express = require("express");
const cors = require("cors");
const trainRouter = require("./routes/trainRoute");

// Express app
const app = express();

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/train", trainRouter);

module.exports = app;
