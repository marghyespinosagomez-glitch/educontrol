const crypto = require('crypto');

const crearDocente = async (data) => {
    const objeto = {
        uuid:crypto.randomUUID(),
        typeDoc: data.tipoDocumento,
        document: data.documento,
        name: data.nombre,
        email: data.correo,
        datos: data.observaciones,
        cell: data.telefono,
        adress: data.direccion
    }
    const insert = await __Db.insertDatos({table:'docentes',datos:objeto})
    return insert
}

const buscarDocente = async (data) => {
    const buscar = await __Db.searchData({table:'docentes'})
    return buscar
}

module.exports.crearDocente = crearDocente
module.exports.buscarDocente = buscarDocente