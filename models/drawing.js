'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drawing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Drawing.belongsTo(models.Raffle, { foreignKey: 'raffleId' });
      Drawing.belongsTo(models.DrawType, { foreignKey: 'drawTypeId' });

      Drawing.hasMany(models.Prize, { foreignKey: 'drawingId' });
    }
  }
  Drawing.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    raffleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    drawTypeId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    drawDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: DataTypes.STRING,
    lottery: {
     type: DataTypes.STRING,
     allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Drawing',
  });
  return Drawing;
};