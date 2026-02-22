const crypto = require('crypto');

const crearNotas = async (data) => {
    const config = {
        uuid: crypto.randomUUID(),
        grado_id: data.grado_uuid,
        materia: data.materia_nombre,
        docente_uuid: data.docente_uuid,
        periodo: data.periodo,
        componente: data.componente,
        nombre_actividad: data.actividad,
        porcentaje_sobre_total: data.promedio
    }
    const buscarGrado = await __Db.obtenerLogs({ table: 'grados', datos: { uuid: data.grado_uuid } })
    console.log('buscarGrado::: ', buscarGrado)
    if (buscarGrado.length == 0) {
        throw Error(`NO_GRADE || ${data.grado_uuid}`)
    }
    const buscarDocente = await __Db.obtenerLogs({ table: 'docentes', datos: { uuid: data.docente_uuid } })
    console.log('buscarDocente::: ', buscarDocente)
    if (buscarDocente.length == 0) {
        throw Error(`NO_DOCENTE || ${data.docente_id}`)
    }

    const docenteDatos = buscarDocente[0].datos
    const gradosDocentes = validarMaterias(docenteDatos, config)
    console.log('gradosDocentes::: ', gradosDocentes)
    if (!gradosDocentes.success) {
        if (gradosDocentes.message == "NO_MATERIA") {
            throw Error(`${gradosDocentes.message} || ${data.grado_id} || ${data.materia}`)
        }
        throw Error(`${gradosDocentes.message} || ${data.grado_id}`)
    }

    // console.log('crearGrado::: ', objeto)
    // const insert = await __Db.insertDatos({table:'configuracion_notas',datos:config})

    const arrayAlumnos = data.alumnos
    for (let index = 0; index < arrayAlumnos.length; index++) {
        const element = arrayAlumnos[index];
        const uuid = element.uuid
        const nota = element.valor_nota
        const notas = {
            configuracion_uuid: config.uuid,
            alumno_uuid: uuid,
            valor_nota: nota,
            fecha_registro: new Date()
        }

        // console.log('crearGrado::: ', objeto)
        // const insert = await __Db.insertDatos({table:'notas_estudiantes',datos:notas})
    }


    // return insert


}

const buscarGrado = async (data) => {
    const buscar = await __Db.obtenerLogs({ table: 'grados', datos: data })
    return buscar
}


const validarMaterias = (grado, data) => {
    for (let index = 0; index < grado.length; index++) {
        const element = grado[index];
        if (element.grados === data.grado_id) {
            const materias = element.materias
            console.log('materias::: ', materias)
            if (materias.includes(data.materia)) {
                return { success: true }
            }
            return { success: false, message: "NO_MATERIA" }
        }

    }
    return { success: false, message: "NO_GRADO" }
}

module.exports.crearNotas = crearNotas
module.exports.buscarGrado = buscarGrado