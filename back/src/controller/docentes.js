const crypto = require('crypto');
const { message } = require('protocol-buffers/compile');

const crearDocente = async (data) => {
    const datos = data.observaciones
    const objeto = {
        uuid: crypto.randomUUID(),
        typeDoc: data.tipoDocumento,
        document: data.documento,
        name: data.nombre,
        email: data.correo,
        datos,
        cell: data.telefono,
        adress: data.direccion
    }
    if (datos.length != 0) {
        for (let index = 0; index < datos.length; index++) {
            const element = datos[index];
            const buscargrado = await __Db.obtenerLogs({ table: 'grados', datos: { uuid: element.grados } })
            // console.log('buscargrado::: ', buscargrado)
            if (buscargrado.length == 0) {
                throw Error(`NO_GRADO || ${element.grados}`)
            }
            let aMateriasGrado = buscargrado[0].materias
            let aMateriasDocente = element.materias
            // console.log('aMateriasGrado::: ', aMateriasGrado)
            for (let index = 0; index < aMateriasDocente.length; index++) {
                const elementMateria = aMateriasDocente[index];
                if (!aMateriasGrado.some(materia => materia.nombre === elementMateria)) {
                    throw Error(`NO_MATERIA || ${element.grados} || ${elementMateria}`)

                }
            }
        }
    }



    const insert = await __Db.insertDatos({ table: 'docentes', datos: objeto })
    return insert
}

const buscarDocente = async (data) => {
    const buscar = await __Db.searchData({ table: 'docentes', datos:data })
    return buscar
}

const buscarDocenteXuuid = async (data) => {
    const buscar = await __Db.obtenerLogs({ table: 'docentes', datos:data })
    return buscar
}

module.exports.buscarDocenteXuuid = buscarDocenteXuuid
module.exports.crearDocente = crearDocente
module.exports.buscarDocente = buscarDocente