'use strict';
const {
  Model
} = require('sequelize');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(timezone);

module.exports = (sequelize, DataTypes) => {
  class Raffle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Raffle.belongsTo(models.Coverage, { foreignKey: 'coverageId' });
      Raffle.belongsTo(models.Authority, { foreignKey: 'authorityId' });
      Raffle.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Raffle.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Raffle.belongsTo(models.City, { foreignKey: 'cityId' });
      Raffle.hasMany(models.Telemetry, { foreignKey: 'raffleId' });
      Raffle.hasMany(models.Transaction, { foreignKey: 'raffleId' });
      Raffle.hasMany(models.Drawing, { foreignKey: 'raffleId' });
    }
  }
  Raffle.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    coverageId: DataTypes.UUID,
    authorityId: DataTypes.UUID,
    authorizationResolution: DataTypes.STRING,
    departmentId: DataTypes.STRING,
    cityId: DataTypes.STRING,
    categoryId: DataTypes.UUID,
    name: DataTypes.STRING,
    slogan: DataTypes.STRING,
    description: DataTypes.TEXT,
    baseValue: DataTypes.DECIMAL(12,2),
    ivaValue: DataTypes.DECIMAL(12,2),
    totalValue: DataTypes.DECIMAL(12,2),
    lottery: DataTypes.STRING,
    numberDigits: DataTypes.INTEGER,
    numberSeries: DataTypes.INTEGER,
    bearerCheck: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gameDate: DataTypes.DATE,
    closeDate: DataTypes.DATE,
    expirationDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
    dateTimePublication: DataTypes.DATE,
    dateTimeSale: DataTypes.DATE,
    imagesUrls: DataTypes.ARRAY(DataTypes.TEXT),
    managerName: DataTypes.STRING,
    managerContact: DataTypes.STRING,
    managerAddress: DataTypes.STRING,
    salesPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Raffle',
  });

  return Raffle;
};

function calculateVariations(numberDigits, numberSeries) {
  const variations = Math.pow(10, numberDigits);
  return variations * numberSeries;
}

async function updateSalesPercentage(raffleId) {
  const Raffle = require('./raffle');
  const SelectedNumber = require('./selectednumber');

  const raffle = await Raffle.findByPk(raffleId);
  if (!metaVenta) return;

  const totalNumbers = calculateVariations(raffle.numberDigits, raffle.numberSeries);

  const selectedNumbers = await SelectedNumber.findAll({
    where: {
      raffleId: raffleId
    }
  });
  if (!selectedNumbers) return;

  const salesPercentage = (selectedNumbers * 100) / totalNumbers;

  await Raffle.update(
    { salesPercentage: salesPercentage || 0 },
    { where: { id: raffleId } }
  );
}

