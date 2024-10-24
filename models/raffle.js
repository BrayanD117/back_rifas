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
    coverageId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    authorityId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    authorizationResolution: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departmentId: DataTypes.STRING,
    cityId: DataTypes.STRING,
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slogan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    baseValue: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    ivaValue: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    totalValue: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    numberDigits: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numberSeries: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bearerCheck: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gameDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    closeDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dateTimePublication: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateTimeSale: {
      type: DataTypes.DATE,
      allowNull: false
    },
    imagesUrls: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    managerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    managerContact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    managerAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salesPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Raffle',
  });

  return Raffle;
};