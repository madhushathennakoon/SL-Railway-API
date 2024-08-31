const trainModel = require("../models/trainModel");

// Simulate storing your API key in an environment variable
const API_KEY = process.env.API_KEY;

// Middleware to validate the API key
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === API_KEY) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid API Key" });
  }
};

//Add New Train_Data
const addNewTrainData = async (req, res) => {
  try {
    // validating request body
    const { trainId, location, speed, timestamp } = req.body;

    const newtrain = await trainModel.create({
      trainId,
      location,
      speed,
      timestamp,
    });
    res.status(201).json(newtrain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//Get Train_Data
const getTrain = async (req, res) => {
  console.log("Inside get train");
  const { trainId } = req.params;

  try {
    // Find the latest entry for the given trainId
    const latestData = await trainModel
      .findOne({ trainId })
      .sort({ timestamp: -1 })
      .limit(1);

    if (latestData) {
      res.json(latestData);
    } else {
      res.status(404).json({ message: "No data found for this train" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = { addNewTrainData, getTrain, validateApiKey };
