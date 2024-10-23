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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    transactionId: DataTypes.UUID,
    number: DataTypes.INTEGER,
    numberStatusId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'SelectedNumber',
  });

  SelectedNumber.afterCreate(async (selectedNumber, options) => {
    const transaction = await selectedNumber.getTransaction();
    if (transaction && transaction.raffleId) {
      await updateSalesPercentage(transaction.raffleId);
    }
  });

  SelectedNumber.afterDestroy(async (selectedNumber, options) => {
    const transaction = await selectedNumber.getTransaction();
    if (transaction && transaction.raffleId) {
      await updateSalesPercentage(transaction.raffleId);
    }
  });

  return SelectedNumber;
};

async function updateSalesPercentage(raffleId) {
  const { Raffle, SelectedNumber, Transaction } = require('../models');

  const raffle = await Raffle.findByPk(raffleId);
  if (!raffle) return;

  const totalNumbers = Math.pow(10, raffle.numberDigits) * raffle.numberSeries;

  const selectedNumbersCount = await SelectedNumber.count({
    include: [
      {
        model: Transaction,
        where: { raffleId: raffleId }
      }
    ]
  });

  console.log(selectedNumbersCount);

  const salesPercentage = (selectedNumbersCount * 100) / totalNumbers;

  await Raffle.update(
    { salesPercentage: salesPercentage || 0 },
    { where: { id: raffleId } }
  );
}