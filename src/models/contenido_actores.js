const { DataTypes } = require('sequelize')

const sequelize = require('../conection/conection')

const Contenido_actores = sequelize.define('Contenido_actores', {
    contenido_actores_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    contenido_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    actores_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        default: 1
    }
}, {
    tableName: 'Contenido_actores',
    timestamps: false,
})

module.exports = Contenido_actores