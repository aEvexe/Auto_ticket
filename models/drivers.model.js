const sequelize = require('../config/db');
const {DataType, DataTypes} = require("sequelize");

const Driver = sequelize.define("driver",
{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
    },
    phone: {
        type: DataTypes.STRING(50),
    },

}, {freezeTableName: true, timestamps: false})


module.exports = Driver