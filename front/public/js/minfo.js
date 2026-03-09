const gradosAsignados = [
    {
        jornada: "Mañana",
        grado: "Sexto A",
        materias: [
            {
                nombre: "Matematicas",
                dias: [
                    { dia: "Lunes", bloques: "3 - 4" },
                    { dia: "Miercoles", bloques: "1" }
                ]
            },
            {
                nombre: "Educacion Fisica",
                dias: [
                    { dia: "Lunes", bloques: "1 - 2" }
                ]
            },
            {
                nombre: "Filosofia",
                dias: [
                    { dia: "Lunes", bloques: "5 - 6" },
                    { dia: "Viernes", bloques: "5 - 6" }
                ]
            }
        ]
    },
    {
        jornada: "Tarde",
        grado: "Sexto B",
        materias: [
            {
                nombre: "Matematicas",
                dias: [
                    { dia: "Lunes", bloques: "3 - 4" },
                    { dia: "Miercoles", bloques: "1" }
                ]
            },
            {
                nombre: "Educacion Fisica",
                dias: [
                    { dia: "Lunes", bloques: "1 - 2" }
                ]
            },
            {
                nombre: "Filosofia",
                dias: [
                    { dia: "Lunes", bloques: "5 - 6" },
                    { dia: "Viernes", bloques: "5 - 6" }
                ]
            }
        ]
    },
    {
        jornada: "Mañana",
        grado: "Septimo C",
        materias: [
            {
                nombre: "Matematicas",
                dias: [
                    { dia: "Lunes", bloques: "3 - 4" },
                    { dia: "Miercoles", bloques: "1" }
                ]
            },
            {
                nombre: "Educacion Fisica",
                dias: [
                    { dia: "Lunes", bloques: "1 - 2" }
                ]
            }
        ]
    },
    {
        jornada: "Tarde",
        grado: "Septimo D",
        materias: [
            
            {
                nombre: "Educacion Fisica",
                dias: [
                    { dia: "Lunes", bloques: "1 - 2" }
                ]
            },
            {
                nombre: "Filosofia",
                dias: [
                    { dia: "Lunes", bloques: "5 - 6" },
                    { dia: "Viernes", bloques: "5 - 6" }
                ]
            }
        ]
    },
    {
        jornada: "Mañana",
        grado: "Octavo E",
        materias: [
            {
                nombre: "Matematicas",
                dias: [
                    { dia: "Lunes", bloques: "3 - 4" },
                    { dia: "Miercoles", bloques: "1" }
                ]
            },
            {
                nombre: "Educacion Fisica",
                dias: [
                    { dia: "Lunes", bloques: "1 - 2" }
                ]
            },
            {
                nombre: "Filosofia",
                dias: [
                    { dia: "Lunes", bloques: "5 - 6" },
                    { dia: "Viernes", bloques: "5 - 6" }
                ]
            }
        ]
    },
    {
        jornada: "Tarde",
        grado: "Octavo F",
        materias: [
            {
                nombre: "Matematicas",
                dias: [
                    { dia: "Lunes", bloques: "3 - 4" },
                    { dia: "Miercoles", bloques: "1" }
                ]
            },
            {
                nombre: "Educacion Fisica",
                dias: [
                    { dia: "Lunes", bloques: "1 - 2" }
                ]
            },
            {
                nombre: "Filosofia",
                dias: [
                    { dia: "Lunes", bloques: "5 - 6" },
                    { dia: "Viernes", bloques: "5 - 6" }
                ]
            }
        ]
    },
    {
        jornada: "Mañana",
        grado: "Noveno G",
        materias: [
            {
                nombre: "Matematicas",
                dias: [
                    { dia: "Lunes", bloques: "3 - 4" },
                    { dia: "Miercoles", bloques: "1" }
                ]
            },
            {
                nombre: "Educacion Fisica",
                dias: [
                    { dia: "Jueves", bloques: "1 - 2" }
                ]
            },
            {
                nombre: "Filosofia",
                dias: [
                    { dia: "Lunes", bloques: "5 - 6" },
                    { dia: "Viernes", bloques: "5 - 6" }
                ]
            }
        ]
    },
    {
        jornada: "Mañana",
        grado: "Noveno H",
        materias: [
            {
                nombre: "Matematicas",
                dias: [
                    { dia: "Lunes", bloques: "3 - 4" },
                    { dia: "Miercoles", bloques: "1" }
                ]
            },
            {
                nombre: "Educacion Fisica",
                dias: [
                    { dia: "Lunes", bloques: "1 - 2" }
                ]
            },
            {
                nombre: "Filosofia",
                dias: [
                    { dia: "Lunes", bloques: "5 - 6" },
                    { dia: "Martes", bloques: "5 - 6" }
                ]
            }
        ]
    }
];


function generarTablaInfo(data = gradosAsignados) {

    const tbody = document.getElementById("tabla-minfo-doc");
    if (!tbody) return;

    tbody.innerHTML = "";

    let contadorItem = 1;

    data.forEach(grado => {

        let totalFilasGrado = 0;

        grado.materias.forEach(materia => {
            totalFilasGrado += materia.dias.length;
        });

        let primeraFilaGrado = true;

        grado.materias.forEach(materia => {

            let totalFilasMateria = materia.dias.length;
            let primeraFilaMateria = true;

            materia.dias.forEach(diaObj => {

                let fila = "<tr>";

                if (primeraFilaGrado) {
                    fila += `
                        <td rowspan="${totalFilasGrado}">${contadorItem}</td>
                        <td rowspan="${totalFilasGrado}">${grado.jornada}</td>
                        <td rowspan="${totalFilasGrado}">${grado.grado}</td>
                    `;
                    primeraFilaGrado = false;
                }

                if (primeraFilaMateria) {
                    fila += `
                        <td rowspan="${totalFilasMateria}">
                            ${materia.nombre}
                        </td>
                    `;
                    primeraFilaMateria = false;
                }

                fila += `
                    <td>${diaObj.dia}</td>
                    <td>${diaObj.bloques}</td>
                `;

                fila += "</tr>";

                tbody.innerHTML += fila;
            });

        });

        contadorItem++;
    });
}

function aplicarFiltros() {

    const jornada = document.getElementById("filtroJornada").value;
    const gradoFiltro = document.getElementById("filtroGrado").value;

    let resultado = gradosAsignados.filter(grado => {

        let coincideJornada = jornada === "" || grado.jornada === jornada;

        let coincideGrado = gradoFiltro === "" || 
                            grado.grado.includes(gradoFiltro);


        return coincideJornada && coincideGrado;
    });

    generarTablaInfo(resultado);
}

function activarFiltros() {

    const filtroJornada = document.getElementById("filtroJornada");
    const filtroGrado = document.getElementById("filtroGrado");

    if (filtroJornada) {
        filtroJornada.addEventListener("change", aplicarFiltros);
    }

    if (filtroGrado) {
        filtroGrado.addEventListener("change", aplicarFiltros);
    }
}

