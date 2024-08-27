const express = require("express");
const addNewTrainData = require("../controller/trainController");

const router = express.Router();

router.post("/add", addNewTrainData);

module.exports = router;
