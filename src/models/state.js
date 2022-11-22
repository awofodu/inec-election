'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class states extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  states.init({
    state_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    state_name: {
      type: DataTypes.STRING,
      allowNull: true 
    },
  }, {
    sequelize,
    modelName: 'states',
    freezeTableName: true,
    timestamps: false,
  });
  return states;
};