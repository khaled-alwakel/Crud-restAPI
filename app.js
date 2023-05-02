const fs = require("fs");
const express = require("express");

const app = express();
module.exports = app;

app.get("/", (req, res) => {
  res.end("hello from server");
});
