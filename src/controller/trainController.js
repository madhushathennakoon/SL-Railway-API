const trainModel = require("../models/trainModel");

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
    res.status(500).json({ error: error.message });
  }
};

module.exports = addNewTrainData;
