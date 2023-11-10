const { DataTypes } = require('sequelize')
const sequelize = require('../conection/conection')

const Contenido = sequelize.define('Contenido', {
    contenido_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,

    },
    resumen: {
        type: DataTypes.STRING,
    },
    temporadas: {
        type: DataTypes.INTEGER,
        default: false
    },
    poster: {
        type: DataTypes.STRING,
    },
    trailer: {
        type: DataTypes.STRING,
    },
    categoria_id: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'Contenido',
    timestamps: false,
})

module.exports = Contenido