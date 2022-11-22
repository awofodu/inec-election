'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        ward.belongsTo(models.lga, {
            foreignKey: {
                name: 'lga_id',
                type: DataTypes.INTEGER
            }, 
            sourceKey: 'uniqueid'
        });
    }
  }
  ward.init({
    uniqueid:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    ward_id:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
    ward_name: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    lga_id:{
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false
    },
    ward_description: {
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
    modelName: 'ward',
    freezeTableName: true,
    timestamps: false,
  });
  return ward;
};