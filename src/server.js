"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const authRouter = require("./routes/authRoutes");

const productsRoute = require("./routes/products");


const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(authRouter);

app.use(productsRoute);

app.get("/erro", (req, res) => {
  throw new Error("Error");
});


function start() {
  app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
  });
}

module.exports = {
  start,
  app,
};
