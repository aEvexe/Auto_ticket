const sequelize = require('../config/db');
const {DataType, DataTypes} = require("sequelize")

const Role = sequelize.define("role",
{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
    },
    
    description: {
        type: DataTypes.STRING
    }

}, {freezeTableName: true, timestamps: false})

module.exports = Role