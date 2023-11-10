const { DataTypes } = require("sequelize")
const sequelize = require("../conection/conection")

const Titulos = sequelize.define('Titulos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false, 
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Titulos',
    timestamps: false,
})

module.exports = Titulos