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
    raffleId: DataTypes.UUID,
    drawTypeId: DataTypes.UUID,
    drawDate: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Drawing',
  });
  return Drawing;
};