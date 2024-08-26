'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
    }
  }
  Sale.init({
    transactionId: DataTypes.UUID,
    invoiceNumber: DataTypes.STRING,
    baseValue: DataTypes.DECIMAL,
    ivaValue: DataTypes.DECIMAL,
    totalValue: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};