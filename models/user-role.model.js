const sequelize = require('../config/db');
const {DataType, DataTypes} = require("sequelize");
const User = require('./users.model');
const Role = require('./role.model');

const UserRole = sequelize.define("user-role",
{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

}, {freezeTableName: true, timestamps: false})

User.belongsToMany(Role, {through: UserRole})

Role.belongsToMany(User, {through: UserRole})

UserRole.belongsTo(User)
User.hasMany(UserRole)

module.exports = UserRole