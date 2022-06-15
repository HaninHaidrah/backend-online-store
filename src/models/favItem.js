"use strict";

const favItem = (sequelize, DataTypes) =>
  sequelize.define("fav", {
    productName: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.STRING, allowNull: false },
    Discription: { type: DataTypes.STRING },
  });

module.exports = favItem;