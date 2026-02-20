if (!window.baseEstudiantes) {
    window.baseEstudiantes =  [
        {
            nombre: "Juan Esteban Pérez",
            grado: "Cuarto A",
        },
        {
            nombre: "María Fernanda Gómez",
            grado: "Cuarto A",
        },
        {
            nombre: "Andrés Felipe Torres",
            grado: "Cuarto A",
        },
        {
            nombre: "Laura Sofía Ramírez",
            grado: "Cuarto B",
        },
        {
            nombre: "Santiago Rodríguez",
            grado: "Cuarto B",
        },
        {
            nombre: "Valentina Castro",
            grado: "Cuarto B",
        },
        {
            nombre: "Nicolás Herrera",
            grado: "Cuarto C",
        },
        {
            nombre: "Daniela Martínez",
            grado: "Cuarto C",
        },
        {
            nombre: "Sebastián López",
            grado: "Cuarto C",
        },
        {
            nombre: "Camila Vargas",
            grado: "Quinto A",
        },
        {
            nombre: "Natalia Córdoba",
            grado: "Quinto A",
        },
        {
            nombre: "Martín Salazar",
            grado: "Quinto A",
        },
        {
            nombre: "Mateo González",
            grado: "Quinto B",
        },
        {
            nombre: "sabella Rojas",
            grado: "Quinto B",
        },
        {
            nombre: "Samuel Díaz",
            grado: "Quinto B",
        },
        {
            nombre: "Sara Valentina Moreno",
            grado: "Quinto C",
        },
        {
            nombre: "Mariana Silva",
            grado: "Quinto C",
        },
        {
            nombre: "David Sánchez",
            grado: "Quinto C",
        },
        {
            nombre: "Jefferson Barrera",
            grado: "Sexto A",
        },
        {
            nombre: "Carla Sofia Acevedo Jimenez",
            grado: "Sexto A",
        },
        {
            nombre: "Kevin Acero ",
            grado: "Sexto A",
        },
        {
            nombre: "Kevin Barrera",
            grado: "Sexto B",
        },
        {
            nombre: "Jefferson Acero",
            grado: "Sexto B",
        },
        {
            nombre: "Fabian Acero",
            grado: "Sexto B",
        },
        {
            nombre: "Fabian Barrera",
            grado: "Sexto C",
        },
        {
            nombre: "Gabriela Mendoza",
            grado: "Sexto C",
        },
        {
            nombre: "Alejandro Jiménez",
            grado: "Sexto C",
        },
        {
            nombre: "Sofía Cárdenas",
            grado: "Septimo A",
        },
        {
            nombre: "Miguel Ángel Romero",
            grado: "Septimo A",
        },
        {
            nombre: "Luciana Castillo",
            grado: "Septimo A",
        },
        {
            nombre: "Tomás Aguilar",
            grado: "Septimo B",
        },
        {
            nombre: "Paula Andrea Ruiz",
            grado: "Septimo B",
        },
        {
            nombre: "Felipe Navarro",
            grado: "Septimo B",
        },
        {
            nombre: "Juliana Pardo",
            grado: "Septimo C",
        },
        {
            nombre: "Emmanuel Vega",
            grado: "Septimo C",
        },
        {
            nombre: "Antonia Cabrera",
            grado: "Septimo C",
        },
        {
            nombre: "Cristian Muñoz",
            grado: "Octavo A",
        },
        {
            nombre: "Valery Duarte",
            grado: "Octavo A",
        },
        {
            nombre: "Kevin Andrés Molina",
            grado: "Octavo A",
        },
        {
            nombre: "Ana Sofía Prieto",
            grado: "Octavo B",
        },
        {
            nombre: "Esteban Franco",
            grado: "Octavo B",
        },
        {
            nombre: "Manuela Beltrán",
            grado: "Octavo B",
        },
        {
            nombre: "Juan Sebastián Arias",
            grado: "Octavo C",
        },
        {
            nombre: "Salomé Rincón",
            grado: "Octavo C",
        },
        {
            nombre: "Diego Fernando León",
            grado: "Octavo C",
        },
    ];
}

let estadoNotas = {
    columnas: ["N1", "N2"], // ahora guardamos nombres
    datos: {}
};

function agregarNota() {

    const nuevoNumero = estadoNotas.columnas.length + 1;
    estadoNotas.columnas.push("N" + nuevoNumero);

    reconstruirTablaNotas();
}

function reconstruirTablaNotas(listaEstudiantes = baseEstudiantes) {

    const filaHead = document.getElementById("filaHead");
    const tbody = document.getElementById("tabla-upnota-doc");

    if (!filaHead || !tbody) return;

    // ===== LIMPIAR HEAD =====
    filaHead.innerHTML = `
        <th style="width: 5%;">Item</th>
        <th style="width: 30%;">Estudiantes</th>
    `;

    estadoNotas.columnas.forEach((nombreColumna, index) => {
        filaHead.innerHTML += `
            <th>
                <input type="text"
                    class="input-titulo-nota"
                    value="${nombreColumna}"
                    onchange="editarTitulo(${index}, this.value)">
                ${index === estadoNotas.columnas.length - 1 ?
                    `<button class="btn-add-col" onclick="agregarNota()">+</button>`
                    : ""
                }
            </th>
        `;
    });

    filaHead.innerHTML += `
        <th style="width: 9%;" id="colNotaFinal">Nota Final</th>
    `;
    // ===== RECONSTRUIR BODY =====
    tbody.innerHTML = "";

    listaEstudiantes.forEach((estudiante, index) => {

        let fila = `
            <tr>
                <td>${index + 1}</td>
                <td>${estudiante.nombre}</td>
        `;

        estadoNotas.columnas.forEach((nombreColumna) => {
            let valorGuardado = estadoNotas.datos[index]?.[nombreColumna] ?? "0";

            fila += `
                <td>
                    <input type="number"
                        class="nota input-nota"
                        value="${valorGuardado}"
                        min="0"
                        max="5"
                        step="0.1"
                        onclick="this.select()"
                        oninput="guardarNota(${index}, '${nombreColumna}', this)">
                </td>
            `;

        });

        fila += `<td class="notaFinal">0</td></tr>`;

        tbody.innerHTML += fila;
    });

    recalcularTodos();
}

function guardarNota(index, columna, input) {

    if (!estadoNotas.datos[index]) {
        estadoNotas.datos[index] = {};
    }
    
    let valor = input.value;

    if (valor === "") {
        valor = "0";
        input.value = "0";
    }

    estadoNotas.datos[index][columna] = valor;

    calcularPromedio(input);
}

function recalcularTodos() {
    document.querySelectorAll(".nota").forEach(input => {
        calcularPromedio(input);
    });
}

function editarTitulo(index, nuevoNombre) {

    const nombreLimpio = nuevoNombre.trim();

    // Si queda vacío, restaurar el valor anterior
    if (nombreLimpio === "") {
        reconstruirTablaNotas();
        return;
    }

    estadoNotas.columnas[index] = nombreLimpio;

    reconstruirTablaNotas();
}


function calcularPromedio(input) {

    const fila = input.closest("tr");
    const notas = fila.querySelectorAll(".nota");
    const celdaFinal = fila.querySelector(".notaFinal");

    let suma = 0;
    let cantidad = 0;

    notas.forEach(nota => {
        if (nota.value !== "") {
            suma += parseFloat(nota.value);
            cantidad++;
        }
    });

    const promedio = cantidad > 0 ? (suma / cantidad).toFixed(2) : 0;
    celdaFinal.textContent = promedio;
}

function guardarTodasLasNotas() {

    const grado = document.getElementById("filtroGrado");
    const subgrado = document.getElementById("filtroSubgrado")?.value;
    const asignatura = document.getElementById("filtroAsignatura")?.value;

    if (!grado || !subgrado || !asignatura) {
        alert("Debe seleccionar grado, subgrado y asignatura.");
        return;
    }

    const filas = document.querySelectorAll("#tabla-upnota-doc tr");

    let resultado = [];

    filas.forEach((fila, index) => {

        const nombre = fila.children[1].textContent;
        const inputs = fila.querySelectorAll(".nota");

        let notasEstudiante = {};

        inputs.forEach((input, i) => {
            const nombreColumna = estadoNotas.columnas[i];
            notasEstudiante[nombreColumna] = input.value;
        });

        const notaFinal = fila.querySelector(".notaFinal").textContent;

        resultado.push({
            estudiante: nombre,
            grado: grado.options[grado.selectedIndex].text+" "+subgrado,
            asignatura: asignatura,
            notas: notasEstudiante,
            promedio: notaFinal
        });
    });

    console.log("NOTAS GUARDADAS:");
    console.log(resultado);

    alert("Notas recolectadas correctamente. Revisar consola.");
}

function aplicarFiltrosNotas() {

    const gradoSelect = document.getElementById("filtroGrado");
    const subgradoSelect = document.getElementById("filtroSubgrado");
    const asignaturaSelect = document.getElementById("filtroAsignatura");

    if (!gradoSelect || !subgradoSelect || !asignaturaSelect) return;

    const gradoTexto = gradoSelect.options[gradoSelect.selectedIndex].text;
    const subgrado = subgradoSelect.value;
    const asignatura = asignaturaSelect.value;

    // 🚨 Hasta que no estén los 3 filtros no mostrar nada
    if (!gradoTexto || gradoSelect.value === "" || !subgrado || !asignatura) {
        reconstruirTablaNotas([]);
        return;
    }

    // Construir grado completo
    const gradoCompleto = gradoTexto + " " + subgrado;

    // Filtrar estudiantes según grado completo
    const estudiantesFiltrados = baseEstudiantes.filter(est => {
        return est.grado === gradoCompleto;
    });

    reconstruirTablaNotas(estudiantesFiltrados);
}

function activarFiltrosNotas() {

    const filtroGrado = document.getElementById("filtroGrado");
    const filtroSubgrado = document.getElementById("filtroSubgrado");
    const filtroAsignatura = document.getElementById("filtroAsignatura");

    if (filtroGrado) {
        filtroGrado.addEventListener("change", aplicarFiltrosNotas);
    }

    if (filtroSubgrado) {
        filtroSubgrado.addEventListener("change", aplicarFiltrosNotas);
    }

    if (filtroAsignatura) {
        filtroAsignatura.addEventListener("change", aplicarFiltrosNotas);
    }
}

