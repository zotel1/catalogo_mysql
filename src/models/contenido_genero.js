const { DataTypes } = require('sequelize')
const sequelize = require('../conection/conection')

const Contenido_genero = sequelize.define('Contenido_genero', {
    contenido_genero_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    contenido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genero_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'Contenido_genero',
    timestamps: false,
})

module.exports = Contenido_genero