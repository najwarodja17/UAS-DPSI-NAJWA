const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Feedback = sequelize.define("Feedback", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "resolved"),
    allowNull: false,
    defaultValue: "pending",
  },
});

Feedback.belongsTo(User);

module.exports = Feedback;
