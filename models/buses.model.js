const sequelize = require('../config/db');
const {DataType, DataTypes} = require("sequelize");
const Driver = require('./drivers.model');

const Buses = sequelize.define("buses",
{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    number_plate: {
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    seat_count: {
        type: DataTypes.INTEGER,
    },
    model: {
        type: DataTypes.STRING(50),
    },

}, {freezeTableName: true, timestamps: false})

Driver.hasMany(Buses)
Buses.belongsTo(Driver)

module.exports = Buses