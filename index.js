require("dotenv").config();
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const mongodbConnection = require("./mongoConnect");

const app = require("./src/app");

let connection = null;
const handler = async (event, context) => {
  const results = [];
  const expressApp = serverless(app);
  let response;
  try {
    // context.callbackWaitsForEmptyEventLoop = false;
    // if (connection === null) {
    //   connection = await mongodbConnection.connectWithRetry();
    // }
    // connect to DB
    mongoose
      .connect(process.env.MONG_URI)
      .then(() => {
        console.log("Datbase connection is succesfull");
      })
      .catch((error) => {
        console.log(error);
      });
    if (event.requestContext) {
      response = await expressApp(event, context);
      return response;
    }
    response = {
      statusCode: 200,
      body: JSON.stringify(event),
    };
    if (event.detail) {
      if (!Array.isArray(event.detail)) {
        console.log("Single object ");
        results.push(handleRequest(event.detail));
      } else {
        console.log("Single array ");
        event.detail.forEach((data) => {
          results.push(handleRequest(data));
        });
      }
    } else if (!Array.isArray(event)) {
      console.log("Single object ");
      results.push(handleRequest(event));
    } else {
      console.log("Single array ");
      event.forEach((data) => {
        results.push(handleRequest(data));
      });
    }

    await Promise.all(results);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { handler };
