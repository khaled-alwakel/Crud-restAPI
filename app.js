const fs = require("fs");
const express = require("express");
const app = express();

// middle wares
app.use(express.json());

app.use((req, res, next) => {
  console.log("hello fromm the middleware 👋");
  next();
});

const data = JSON.parse(fs.readFileSync(`${__dirname}/data/searchspring.json`));

// useCase here : imagine that the route handler wants to know when exactly the request happens
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.end("hello from server");
});

module.exports = app;
