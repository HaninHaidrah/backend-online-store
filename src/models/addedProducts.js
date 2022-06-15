"use strict";

const addedproducts = (sequelize, DataTypes) =>
  sequelize.define("addedproducts", {
    productName: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.STRING, allowNull: false },
    Discription: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, allowNull: false },
  });

module.exports = addedproducts;
