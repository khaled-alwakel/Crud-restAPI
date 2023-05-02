const fs = require("fs");
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/products.json`)
);
exports.checkID = (req, res, next, val) => {
  console.log(`product id is : ${val}`);
  const id = req.params.id * 1;
  if (id > products.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id ",
    });
  }
  next();
};

// middleware for check the request body
exports.checkBody = (req, res, next) => {
  if (!req.body.Name || !req.body.SKU || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "missing name or SKU or price!",
    });
  }
  next(); // next is create product
};

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: "success",
    results: products.length,
    data: { products },
  });
};

exports.getProduct = (req, res) => {
  const id = req.params.id * 1;
  const product = products.find((product) => product["Product ID"] === id);
  res.status(200).json({
    status: "success",
    data: { product },
  });
};

exports.createProduct = (req, res) => {
  const newId = products.length + 1;
  const newProduct = Object.assign({ "Product ID": newId }, req.body);

  const productExist = products.find(
    (product) => product.Name === newProduct.Name
  );
  if (productExist) return res.send("product already exist");

  products.push(newProduct);
  fs.writeFile(
    `${__dirname}/../data/products.json`,
    JSON.stringify(products),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { newProduct },
      });
    }
  );
};

exports.updateProduct = (req, res) => {
  //TODO
};

exports.deleteProduct = (req, res) => {
  //TODO
};
