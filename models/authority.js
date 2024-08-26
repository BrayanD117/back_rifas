'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Authority.hasMany(models.Raffle, { foreignKey: 'authorityId' });
    }
  }
  Authority.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Authority',
  });
  return Authority;
};