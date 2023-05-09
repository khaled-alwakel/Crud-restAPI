const express = require("express");
const app = express();
const productsRouter = require("./routes/productsRouter");

// 1) MIDDLE WARES
app.use(express.json());

app.use((req, res, next) => {
  console.log("hello fromm the middleware 👋");
  next();
});

// 2) MOUNT MIDDLE WARE IN THIS ENDPOINT
app.use("/api/v1/products", productsRouter);

module.exports = app;
