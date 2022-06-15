"use strict";
require("dotenv").config();

const userModel = require("./user.js");
const productsModel = require("../models/products");
const favModel = require("../models/favItem");
const addedproductsModel = require("../models/addedProducts");

// const houseModel = require("../models/housesModel");
// const rentModel = require("./rent-orderModel");
// const hotelModel = require("./hotelsModel");
// const roomModel = require("./roomModel");
// const bookModel = require("./booking-hotel");
const Collection = require("../models/data-collection");

const { Sequelize, DataTypes } = require("sequelize");

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;
let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const products = productsModel(sequelize, DataTypes);
const addedProducts = addedproductsModel(sequelize, DataTypes);

const fav = favModel(sequelize, DataTypes);

// const profile = profileModel(sequelize, DataTypes);
// const rent = rentModel(sequelize, DataTypes);
// const hotel = hotelModel(sequelize, DataTypes);
// const room = roomModel(sequelize, DataTypes);
// const book = bookModel(sequelize, DataTypes);

// hotel.hasMany(room, { foreignKey: "hotelid", sourceKey: "id" });
// room.belongsTo(hotel, { foreignKey: "hotelid", targetKey: "id" });
// room.hasMany(book, { foreignKey: "roomId", sourceKey: "id" });
// book.belongsTo(room, { foreignKey: "roomId", targetKey: "id" });

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  products: new Collection(products),
  fav: new Collection(fav),
  addedProducts: new Collection(addedProducts),
  //   rent: new Collection(rent),
  //   hotel: new Collection(hotel),
  //   room: new Collection(room),
  //   book: new Collection(book),
};
