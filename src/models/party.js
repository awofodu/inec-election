'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  party.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    partyid: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    partyname:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'party',
    freezeTableName: true,
    timestamps: false,
  });
  return party;
};