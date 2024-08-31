const mongoose = require("mongoose");

async function connectWithRetry() {
  try {
    console.log("Start connecting MongoDB");
    // const options = {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    //   keepAlive: true,
    //   retryWrites: false,
    // };
    const connection = await mongoose.connect(process.env.MONG_URI);
    return connection;
  } catch (error) {
    console.error(error);
    return null;
  }
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection open");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("Mongoose connection re-established");
});

mongoose.connection.on("disconnecting", () => {
  console.log("Mongoose connection is disconnecting");
});

module.exports = { connectWithRetry };
