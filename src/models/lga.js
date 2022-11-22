'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        lga.belongsTo(models.states, {
            foreignKey: {
                name: 'state_id',
                type: DataTypes.INTEGER
            }, 
            sourceKey: 'state_id'
        });

        lga.hasMany(models.polling_unit, {
          foreignKey: {
            name: 'lga_id',
            type: DataTypes.INTEGER
          },
          sourceKey: 'uniqueid'
        });
    }
  }
  lga.init({
    uniqueid:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    lga_id:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
    lga_name: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    state_id:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
    lga_description: {
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
    modelName: 'lga',
    freezeTableName: true,
    timestamps: false,
  });
  return lga;
};