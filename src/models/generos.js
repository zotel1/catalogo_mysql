const { DataTypes } = require('sequelize')
const sequelize = require('../conection/conection')

const Generos = sequelize.define('Generos', {
    generos_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    generos_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Generos',
    timestamps: false,
})

module.exports = Generos