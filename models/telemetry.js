'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Telemetry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Telemetry.belongsTo(models.User, { foreignKey: 'userId' });
      Telemetry.belongsTo(models.Raffle, { foreignKey: 'raffleId' });
      Telemetry.belongsTo(models.EventType, { foreignKey: 'eventTypeId' });
    }
  }
  Telemetry.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    raffleId: DataTypes.UUID,
    eventTypeId: DataTypes.UUID,
    ubication: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Telemetry',
  });
  return Telemetry;
};