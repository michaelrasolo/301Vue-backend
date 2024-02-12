const mongoose = require("mongoose");

const CONNECTION_STRING =
  process.env.CONNECTION_STRING;

mongoose
  .connect(CONNECTION_STRING)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`📁 Mongo database connected: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
