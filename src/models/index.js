/* const Catalogo = require("./catalogo")
const Categorias = require("./categoria")
const Actores = require("./actores")
const Catalogo_actores = require("./catalogo_actores")

// Relacion one-to-many entre Catalogo y Categorias

Categorias.hasMany(Catalogo)
Catalogo.belongsTo(Categorias)

//Relacion many-tomany entre Catalogo y Actores
Actores.belongsTo(Catalogo, { through: Catalogo_actores })
Catalogo.belongsToMany(Actores, { through: Catalogo_actores })


module.exports = { Catalogo, Categorias, Actores } */