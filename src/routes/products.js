"use strict";
const express = require("express");
const bearer = require("../middleware/bearer");
const { products, fav, addedProducts } = require("../models");
const router = express.Router();

router.post("/products", handleCreateProducts);
router.delete("/products/:id", handleDeleteProducts);
router.get("/products", handleGetProducts);
router.get("/products/:id", handlegetOneProduct);

router.post("/addedproducts/:username", bearer, handleCreateAddedProducts);
router.get("/addedproducts/:username", bearer, handleGetAddedProducts);
router.delete("/addedproducts/:username/:id", handleDeleteAddedProducts);
router.get("/addedproducts/:username/:id", handlegetOneAddedProduct);
router.put("/addedproducts/:username/:id", handleUpdateAddedProducts);

router.post("/fav/:username", handleCreateFavList);
router.get("/fav/:username", handleGetFavList);
router.delete("/fav/:username/:id", handleDeleteFav);

async function handleCreateProducts(req, res) {
  const obj = req.body;
  const newRecord = await products.create(obj);
  res.status(201).json(newRecord);
}

async function handleDeleteProducts(req, res) {
  const id = req.params.id;
  const newRecord = await products.delete(id);
  res.status(200).json("newRecord deleted");
}
async function handleCreateAddedProducts(req, res) {
  const obj = req.body;

  const newRecord = await addedProducts.create(obj);
  const newRecord2 = await products.create(obj);
  res.status(201).json(newRecord);
}

async function handleDeleteFav(req, res) {
  const id = req.params.id;
  const newRecord = await fav.delete(id);
  res.status(200).json("newRecord deleted");
}
async function handleGetAddedProducts(req, res) {
  const username = req.params.username;

  try {
    if (username === req.user.dataValues.username) {
      const allRecords = await addedProducts.getUserData(username);
      res.status(200).json(allRecords);
    } else {
      res.send([]);
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleGetFavList(req, res) {
  const username = req.params.username;
  const allRecords = await fav.getUserData(username);
  res.status(200).json(allRecords);
}

async function handleUpdateAddedProducts(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let theRecord = await addedProducts.get(id);
  const desc = theRecord.Discription;
  let theRecord2 = await products.getDesc(desc);
  const record = await addedProducts.update(id, obj);
  const record2 = await products.update(theRecord2.id, obj);
  res.status(201).json(record);
}
async function handleDeleteAddedProducts(req, res) {
  let id = req.params.id;
  let theRecord = await addedProducts.get(id);
  const desc = theRecord.Discription;
  let theRecord2 = await products.getDesc(desc);
  let deletedRecord = await addedProducts.delete(id);
  let deletedRecord2 = await products.delete(theRecord2.id);
  res.status(200).json(` the product's id: ${id} deleted successfully`);
}
async function handleGetProducts(req, res) {
  const allRecords = await products.get();
  res.status(200).json(allRecords);
}
async function handlegetOneProduct(req, res) {
  const id = req.params.id;
  const oneData = await products.get(id);
  res.status(200).json(oneData);
}

async function handlegetOneAddedProduct(req, res) {
  const id = req.params.id;
  const oneData = await addedProducts.get(id);
  res.status(200).json(oneData);
}

async function handleCreateFavList(req, res) {
  const obj = req.body;

  const newData = await fav.create(obj);
  res.status(201).json(newData);
}

module.exports = router;
