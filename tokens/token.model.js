const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true, autoIncrement: true },
  token: {
    type: DataTypes.STRING,
    required: true,
  },
  createdAt: {
      type: DataTypes.DATE,
      default: Date.now,
      expires: 3600
  }
}
return sequelize.define('Token', attributes);
}
