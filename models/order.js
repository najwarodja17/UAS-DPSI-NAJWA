const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Product = require("./product");

const Order = sequelize.define("Order", {
  status: {
    type: DataTypes.ENUM("pending", "shipped", "delivered"),
    allowNull: false,
    defaultValue: "pending",
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;
