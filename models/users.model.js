const sequelize = require('../config/db');
const {DataType, DataTypes} = require("sequelize")

const User = sequelize.define("users",
{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    phone: {
        type: DataTypes.STRING(15),
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    hashed_password: {
        type: DataTypes.STRING
    },

    hashed_token: {
        type: DataTypes.STRING
    },

    is_active: {
        type: DataTypes.STRING,
        defaultValue: false
    }

}, {freezeTableName: true, timestamps: false})



module.exports = User