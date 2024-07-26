const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./order");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Product.belongsToMany(Order, { through: "OrderProducts" });

module.exports = Product;
