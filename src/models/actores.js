const { DataTypes } = require('sequelize')
const sequelize = require('../conection/conection')

const Actores = sequelize.define('Actores', {
    actores_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    actores_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Actores',
    timestamps: false,
})

module.exports = Actores