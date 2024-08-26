'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NumberStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NumberStatus.hasMany(models.SelectedNumber, { foreignKey: 'numberStatusId' });
    }
  }
  NumberStatus.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NumberStatus',
  });
  return NumberStatus;
};