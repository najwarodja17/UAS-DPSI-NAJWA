// models/orderProduct.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ganti dengan path ke file sequelize instance

const OrderProduct = sequelize.define(
  "OrderProduct",
  {
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "OrderProducts",
  }
);

module.exports = OrderProduct;
