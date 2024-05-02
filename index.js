const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const routes = require('./router/router')

app.use(express.json());

app.use('/api',routes)

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("db conneted ");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(8000, () => {
  console.log("server started");
});
