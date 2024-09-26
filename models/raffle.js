'use strict';
const {
  Model
} = require('sequelize');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

// Extender dayjs con los plugins necesarios
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
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    prize: DataTypes.TEXT,
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
    imageUrl: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    dateTimePublication: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Raffle',
  });
  return Raffle;
};