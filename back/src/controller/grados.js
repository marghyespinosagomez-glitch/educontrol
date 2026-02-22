const crypto = require('crypto');

const crearGrado = async (data) => {
    const objeto = {
        uuid:crypto.randomUUID(),
        number: data.numero,
        letter: data.letra,
        docDirector: data.director_grado,
        alumnos: data.alumnos,
        materias: data.materias
    }
    // console.log('crearGrado::: ', objeto)
    const insert = await __Db.insertDatos({table:'grados',datos:objeto})
    return insert
}

const buscarGrado = async (data) => {
    const buscar = await __Db.obtenerLogs({table:'grados', datos:data})
    return buscar
}

module.exports.crearGrado = crearGrado
module.exports.buscarGrado = buscarGrado