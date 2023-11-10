const { DataTypes } = require('sequelize')
const sequelize = require('../conection/conection')

const Categorias = sequelize.define('Categorias', {
    categoria_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    categoria_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Categorias',
    timestamps: false,
})

module.exports = Categorias