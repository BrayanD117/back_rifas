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
    customerId: DataTypes.UUID,
    prizeId: DataTypes.UUID,
    deliveryDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'AwardPrize',
  });
  return AwardPrize;
};