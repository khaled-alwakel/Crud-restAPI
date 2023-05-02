const fs = require("fs");
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/products.json`)
);
exports.checkID = (req, res, next, value) => {
  console.log(`product id is : ${value}`);
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
  const product = products.find((ele) => ele["Product ID"] === id);
  res.status(200).json({
    status: "success",
    data: { product },
  });
};

exports.createProduct = (req, res) => {
  const newId = products.length + 1;
  const newProduct = Object.assign({ "Product ID": newId }, req.body);

  const productExist = products.find((ele) => ele.Name === newProduct.Name);
  if (productExist) return res.send("product already exist");

  products.push(newProduct);
  fs.writeFile(
    `${__dirname}/../data/products.json`,
    JSON.stringify(products),
    (err) => {
      if (err) return res.send("Error Wile Writing On File");
      res.status(201).json({
        status: "success",
        data: { newProduct },
      });
    }
  );
};

exports.updateProduct = (req, res) => {
  const id = req.params.id * 1;
  const existedProduct = products.find((ele) => ele["Product ID"] === id);

  //new fields
  const { Name, SKU, price, color } = req.body;

  const updateField = (newValue, oldValue) => (!newValue ? oldValue : newValue);
  const updatedProduct = {
    "Product ID": id,
    Name: updateField(Name, existedProduct.Name),
    SKU: updateField(SKU, existedProduct.SKU),
    price: updateField(price, existedProduct.price),
    color: updateField(color, existedProduct.color),
  };

  // get old product index to replace it with new updatedProduct
  const existedProductIndex = products.findIndex(
    (ele) => ele["Product ID"] === existedProduct["Product ID"]
  );
  products.splice(existedProductIndex, 1, updatedProduct);

  fs.writeFile(
    `${__dirname}/../data/products.json`,
    JSON.stringify(products),
    (err) => {
      if (err) return res.send("Error Wile Writing On File");
      res.status(200).json({
        status: "success",
        data: { updatedProduct },
      });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id * 1;
  const existedProduct = products.find((ele) => ele["Product ID"] === id);

  const existedProductIndex = products.findIndex(
    (ele) => ele["Product ID"] === existedProduct["Product ID"]
  );
  products.splice(existedProductIndex, 1);

  fs.writeFile(
    `${__dirname}/../data/products.json`,
    JSON.stringify(products),
    (err) => {
      res.status(204).json({
        status: "  Successfully Deleted",
        data :null
      });
    }
  );
};
