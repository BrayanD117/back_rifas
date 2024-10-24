'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardPrize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AwardPrize.belongsTo(models.Customer, { foreignKey: 'customerId' });
      AwardPrize.belongsTo(models.Prize, { foreignKey: 'prizeId' });
    }
  }
  AwardPrize.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false
    }, 
    prizeId: {
      type: DataTypes.UUID,
      allowNull: false
    }, 
    deliveryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'AwardPrize',
  });
  return AwardPrize;
};