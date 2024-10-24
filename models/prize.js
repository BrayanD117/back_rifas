'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prize.belongsTo(models.Drawing, { foreignKey: 'drawingId' });

      Prize.hasMany(models.AwardPrize, { foreignKey: 'prizeId' });
    }
  }
  Prize.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    drawingId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    commercialValuation: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Prize',
  });
  return Prize;
};