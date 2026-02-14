// const crypto = require('crypto');

// const datos = {
//     "grados": ["sexto-a", "sexto-b", "sexto-c", "sexto-d", "sexto-e", "sexto-f", "sexto-g", "sexto-h", "septimo-a", "septimo-b", "septimo-c", "septimo-d", "septimo-e", "septimo-f", "septimo-g", "septimo-h", "octavo-a", "octavo-b", "octavo-c", "octavo-d", "octavo-e", "octavo-f", "octavo-g", "octavo-h", "octavo-i", "noveno-a", "noveno-b", "noveno-c", "noveno-d", "noveno-e", "noveno-f", "noveno-g", "noveno-h", "decimo-a", "decimo-b", "decimo-c", "decimo-d", "decimo-e", "decimo-f", "decimo-g", "undecimo-a", "undecimo-b", "undecimo-c", "undecimo-d", "undecimo-e", "undecimo-f", "undecimo-g"],
//     "materias": ["ingles", "español", "etica-religion", "biologia", "educacion fisica", "matematicas", "fundamento", "informatica", "sociales", "quimica", "pre-saber", "artistica", "bioquimica", "fisica", "trigonometria", "ciencias politicas", "filosofia", "calculo", "presaber 11", "filosofia"]
// }

// const materiasObjetos = datos.materias.map(nombre => ({
//     id: crypto.randomBytes(5).toString('hex'),
//     name: nombre
// }));

// const gradosObjetos = datos.grados.map(grado => ({
//     id: crypto.randomBytes(5).toString('hex'),
//     name: grado
// }));

// console.log('materiasObjetos::: ', materiasObjetos);
// console.log('gradosObjetos::: ', gradosObjetos);
const datosJson = require("./data.json")

// let base = {
//     "plan": "grados",
//     "name": "",
//     "estudiantes": [],
//     "docentes": [],
//     "materias": []
// }

const insertarDatos = async () => {
    const materias = datosJson.materias
    for (let index = 0; index < materias.length; index++) {
        const element = materias[index];
        let base = {
            "table": "materias",
            "datos": {
                "uuid": element.id,
                "name": element.name,
                "docente": "",
                "grados": []
            }

        }
        const insert = await __Db.insertDatos(base)
        console.log('pasa insert::: ', insert)

    }
    return true
}

module.exports.insertarDatos = insertarDatos