'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class polling_unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        polling_unit.hasOne(models.announced_pu_results, {
          foreignKey: {
            name: 'polling_unit_uniqueid',
            type: DataTypes.INTEGER
          },
          sourceKey: 'uniqueid'
        });

        
        polling_unit.belongsTo(models.ward, {
            foreignKey: {
                name: 'uniquewardid',
                type: DataTypes.INTEGER
            }, 
            sourceKey: 'uniqueid'
        });
    }
  }
  polling_unit.init({
    uniqueid:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    polling_unit_id:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
    ward_id:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
    lga_id:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
    uniquewardid:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
    polling_unit_number: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    polling_unit_name: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    polling_unit_description: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    long: {
      type: DataTypes.STRING,
      allowNull: true 
    },
  }, {
    sequelize,
    modelName: 'polling_unit',
    freezeTableName: true,
    timestamps: false,
  });
  return polling_unit;
};