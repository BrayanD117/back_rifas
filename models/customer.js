'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.User, { foreignKey: 'userId' });

      Customer.hasMany(models.Transaction, { foreignKey: 'customerId' });
      Customer.hasMany(models.AwardPrize, { foreignKey: 'customerId' });
    }
  }
  Customer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    name: DataTypes.STRING,
    documentNumber: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    phoneNumber: DataTypes.STRING(10),
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};