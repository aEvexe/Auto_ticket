const sequelize = require('../config/db');
const {DataType, DataTypes} = require("sequelize");
const User = require('./users.model');
const Role = require('./role.model');
const Buses = require('./buses.model');
const Driver = require('./drivers.model');

const BusDriver = sequelize.define("bus-driver",
{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

}, {freezeTableName: true, timestamps: false})

Buses.belongsToMany(Driver, {through: BusDriver})

Driver.belongsToMany(Buses, {through: BusDriver})

BusDriver.belongsTo(Driver)
Driver.hasMany(BusDriver)

module.exports = BusDriver