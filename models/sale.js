'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
    }
  }
  Sale.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    transactionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    baseValue: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    ivaValue: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    totalValue: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};