const express = require("express");

const Product = require("../models/product.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    let page = req.query.page;
    let offset = (page - 1) * 10;
    let pages = Math.ceil((await Product.find().countDocuments()) / 10);
    const products = await Product.find().skip(offset).limit(10).lean().exec();
    return res.status(200).send({ products, pages });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
