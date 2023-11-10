const { DataTypes } = require('sequelize');
const sequelize = require('../conection/conection'); // Asegúrate de importar tu instancia de Sequelize

const VistaTipoJson = sequelize.define('vista_tipo_json', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    poster: {
        type: DataTypes.STRING,
    },
    titulo: {
        type: DataTypes.STRING,
    },
    categoria: {
        type: DataTypes.STRING,
    },
    genero: {
        type: DataTypes.STRING,
    },
    resumen: {
        type: DataTypes.STRING,
    },
    temporadas: {
        type: DataTypes.INTEGER,
    },
    reparto: {
        type: DataTypes.STRING,
    },
    trailer: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'vista_tipo_json', // Nombre de la vista en la base de datos
    timestamps: false, // Deshabilita timestamps si la vista no los tiene
});

module.exports = VistaTipoJson;