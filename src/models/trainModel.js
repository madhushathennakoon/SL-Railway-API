const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
  {
    trainId: {
      type: String,
    },
    location: {
      type: [String],
    },
    speed: {
      type: String,
    },
    timestamp: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(" train", trainSchema);
