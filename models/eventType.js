'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventType.hasMany(models.Telemetry, { foreignKey: 'eventTypeId' });
    }
  }
  EventType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventType',
  });
  return EventType;
};