'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Transaction.belongsTo(models.Raffle, { foreignKey: 'raffleId' });
      Transaction.belongsTo(models.TransactionStatus, { foreignKey: 'transactionStatusId' });

      Transaction.hasMany(models.SelectedNumber, { foreignKey: 'transactionId' });

      Transaction.hasOne(models.Sale, { foreignKey: 'transactionId' });
    }
  }
  Transaction.init({
    customerId: DataTypes.UUID,
    raffleId: DataTypes.UUID,
    orderNumber: DataTypes.INTEGER,
    transactionStatusId: DataTypes.UUID,
    purchasePlace: DataTypes.TEXT,
    reservationDate: DataTypes.DATE,
    purchaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};