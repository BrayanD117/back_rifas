'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SelectedNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SelectedNumber.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
      SelectedNumber.belongsTo(models.NumberStatus, { foreignKey: 'numberStatusId' });
    }
  }
  SelectedNumber.init({
    transactionId: DataTypes.UUID,
    number: DataTypes.INTEGER,
    numberStatusId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'SelectedNumber',
  });
  return SelectedNumber;
};