'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class announced_pu_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      announced_pu_results.belongsTo(models.polling_unit);
    }
  }
  announced_pu_results.init({
    result_id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    pollingUnitUniqueid:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
      field: 'polling_unit_uniqueid'
    },
    party_abbreviation: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    party_score: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    entered_by_user: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    date_entered: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    user_ip_address: {
      type: DataTypes.STRING,
      allowNull: true 
    },
  }, {
    sequelize,
    modelName: 'announced_pu_results',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });
  return announced_pu_results;
};