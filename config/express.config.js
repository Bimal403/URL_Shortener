const express = require("express");
const app = express();
const { connectToMongoDB } = require("./connect");
const urlRoute = require("../routes/url");

connectToMongoDB("mongodb://localhost:27017/urlshortener").then(() =>
  console.log("db connected")
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/health", (req, res) => {
  res.send("good");
});
app.use("/url", urlRoute);
module.exports = app;
