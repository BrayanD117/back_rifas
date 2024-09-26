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
  class Coverage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coverage.hasMany(models.Raffle, { foreignKey: 'coverageId' });
    }
  }
  Coverage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coverage',
  });
  return Coverage;
};