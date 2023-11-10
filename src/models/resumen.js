const { DataTypes } = require('sequelize')
const sequelize = require('../conection/conection')

const Resumen = sequelize.define('Resumen', {
    resumen_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resumen: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Resumen',
    timestamps: false,
})

module.exports = Resumen