const sequelize = require('../db')
const {DataTypes} = require("sequelize")

module.exports = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        admin : {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    })
