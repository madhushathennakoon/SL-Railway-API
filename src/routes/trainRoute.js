const express = require("express");
const { addNewTrainData, getTrain } = require("../controller/trainController");

const router = express.Router();

router.post("/add", addNewTrainData);

router.get("/:trainId", getTrain);

module.exports = router;
