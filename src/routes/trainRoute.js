const express = require("express");
const {
  addNewTrainData,
  getTrain,
  validateApiKey,
} = require("../controller/trainController");

const router = express.Router();

router.post("/add", validateApiKey, addNewTrainData);

router.get("/:trainId", validateApiKey, getTrain);

module.exports = router;
