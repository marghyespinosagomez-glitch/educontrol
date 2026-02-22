const crypto = require('crypto');
const grados = require('./grados')

const crearAlumno = async (data) => {
    const objeto = {
        uuid: crypto.randomUUID(),
        typeDoc: data.tipoDocumento,
        document: data.documento,
        name: data.nombre,
        email: data.correo,
        cell: data.telefono,
        adress: data.direccion,
        nameAcudiente: data.acudiente_nombre,
        cellAcudiente: data.acudiente_telefono,
        emailAcudiente: data.acudiente_email,
        adressAcudiente: data.acudiente_direccion,
        grado: data.grado,
    }
    const buscarGrado = await __Db.obtenerLogs({ table: 'grados', datos: { uuid: data.grado } })
    console.log('buscarGrado::: ', buscarGrado)
    if (buscarGrado.length == 0) {
        throw Error(`NO_GRADE || ${data.grado}`)
    }

    const insert = await __Db.insertDatos({ table: 'alumnos', datos: objeto })
    if (!insert) {
        throw Error('NO_INSERT')
    }

    const alumnos = buscarGrado[0].alumnos
    alumnos.push(objeto.uuid)
    const update = await __Db.updateData({ table: 'grados', datos: { uuid: data.grado, alumnos } })
    return update
}

const buscarAlumno = async (data) => {
    const buscar = await __Db.searchData({ table: 'alumnos', datos: data })
    return buscar
}

const buscarAlumnosGrado = async (data) => {
    const buscarGrado = await __Db.obtenerLogs({ table: 'grados', datos: { uuid: data.uuid } })
    if (buscarGrado == 0) {
        throw Error(`NO_GRADE || ${data.grado}`)
    }
    const alumnosGrado = buscarGrado[0].alumnos
    const alumnos = []
    for (let index = 0; index < alumnosGrado.length; index++) {
        const element = alumnosGrado[index];
        const buscarAlumnos = await __Db.obtenerLogs({ table: 'alumnos', datos: {uuid:element} })
        if(buscarAlumnos != 0){
            alumnos.push(buscarAlumnos[0])
        }
    }
    return alumnos
}

module.exports.buscarAlumnosGrado = buscarAlumnosGrado
module.exports.crearAlumno = crearAlumno
module.exports.buscarAlumno = buscarAlumno