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

let estadosPorGrado = {};

function agregarNota(tipo) {

    const estado = obtenerEstadoActual();
    if (!estado) return;

    const nuevoNumero = estado[tipo].length + 1;
    estado[tipo].push("N" + nuevoNumero);

    aplicarFiltrosNotas(); // reconstruye solo el grado actual
}

function reconstruirTablaNotas(listaEstudiantes = []) {

    const estado = obtenerEstadoActual();
    if (!estado) return;

    const filaHead = document.getElementById("filaHead");
    const tbody = document.getElementById("tabla-upnota-doc");

    if (!filaHead || !tbody) return;

    // ===== LIMPIAR HEAD =====

    filaHead.innerHTML = `
        <th style="width:5%">Item</th>
        <th style="width:25%">Estudiantes</th>
    `;

    // ===== SABER =====
    estado.saber.forEach((col, index) => {
        filaHead.innerHTML += `
            <th>
                <input type="text"
                    class="input-titulo-nota"
                    value="${col}"
                    onchange="editarTitulo('saber', ${index}, this.value)"
                >
                ${index === estado.saber.length - 1
                    ? `<button class="btn-add-col" onclick="agregarNota('saber')">+</button>`
                    : ""
                }
            </th>
        `;
    });

    filaHead.innerHTML += `<th id="colNotaSaber" style="width:6%">Saber</th>`;

    // ===== HACER =====
    estado.hacer.forEach((col, index) => {
        filaHead.innerHTML += `
            <th>
                <input type="text"
                    class="input-titulo-nota"
                    value="${col}"
                    onchange="editarTitulo('hacer', ${index}, this.value)"
                >
                ${index === estado.hacer.length - 1
                    ? `<button class="btn-add-col" onclick="agregarNota('hacer')">+</button>`
                    : ""
                }
            </th>
        `;
    });

    filaHead.innerHTML += `<th id="colNotaHacer" style="width:6%">Hacer</th>`;

    // ===== SER =====
    estado.ser.forEach((col, index) => {
        filaHead.innerHTML += `
            <th>
                <input type="text"
                    class="input-titulo-nota"
                    value="${col}"
                    onchange="editarTitulo('ser', ${index}, this.value)"
                >
                ${index === estado.ser.length - 1
                    ? `<button class="btn-add-col" onclick="agregarNota('ser')">+</button>`
                    : ""
                }
            </th>
        `;
    });

    filaHead.innerHTML += `
        <th id="colNotaSer" style="width:4%">Ser</th>
        <th id="colNotaFinal" style="width:9%">Nota Final</th>
    `;

    // ===== RECONSTRUIR BODY =====
    let html = "";

    listaEstudiantes.forEach((estudiante, filaIndex) => {
        

            html += `
                <tr>
                    <td>${filaIndex + 1}</td>
                    <td>${estudiante.nombre}</td>
            `;

            // ===== SABER =====
            estado.saber.forEach((col, colIndex )=> {
                html += `
                    <td>
                        <input type="number" 
                            class="nota input-nota"
                            value="${estado.datos?.[filaIndex]?.[`saber_${colIndex}`] || 0}"
                            min="0" 
                            max="5" 
                            step="0.1"
                            data-columna="saber_${colIndex}"
                            onclick="this.select()" 
                            oninput="guardarNota(${filaIndex}, this);"
                        >
                    </td>
                `;
            });

            html += `<td class="notaSaber">0</td>`;

            // ===== HACER =====
            estado.hacer.forEach((col, colIndex) => {
                html += `
                    <td>
                        <input type="number" 
                            class="nota input-nota"
                            value="${estado.datos?.[filaIndex]?.[`hacer_${colIndex}`] || 0}"
                            min="0" 
                            max="5" 
                            step="0.1"
                            data-columna="hacer_${colIndex}"
                            onclick="this.select()" 
                            oninput="guardarNota(${filaIndex}, this);"
                        >
                    </td>
                `;
            });

            html += `<td class="notaHacer">0</td>`;

            // ===== SER =====
            estado.ser.forEach((col, colIndex) => {
                html += `
                    <td>
                        <input type="number" 
                            class="nota input-nota"
                            value="${estado.datos?.[filaIndex]?.[`ser_${colIndex}`] || 0}"
                            min="0" 
                            max="5" 
                            step="0.1"
                            data-columna="ser_${colIndex}"
                            onclick="this.select()" 
                            oninput="guardarNota(${filaIndex}, this);"
                        >
                    </td>
                `;
            });

            html += `
                <td class="notaSer">0</td>
                <td class="notaFinal">0</td>
                </tr>
            `;

        
    });

    tbody.innerHTML = html;

    recalcularTodos();
}

function recalcularTodos() {
    const filas = document.querySelectorAll("#tabla-upnota-doc tr");

    filas.forEach(fila => {
        const primerInput = fila.querySelector(".nota");
        if (primerInput) {
            calcularPromedio(primerInput);
        }
    });
}

function editarTitulo(tipo, index, nuevoNombre) {

    const estado = obtenerEstadoActual();
    if (!estado) return;

    const nombreLimpio = nuevoNombre.trim();

    if (nombreLimpio === "") {
        aplicarFiltrosNotas();
        return;
    }

    estado[tipo][index] = nombreLimpio;

    aplicarFiltrosNotas();
}

function calcularPromedio(input) {

    const fila = input.closest("tr");
    const estado = obtenerEstadoActual();
    if (!estado) return;

    const inputs = fila.querySelectorAll(".nota");

    let index = 0;

    // ===== SABER =====
    let sumaSaber = 0;
    estado.saber.forEach(() => {
        sumaSaber += parseFloat(inputs[index].value) || 0;
        index++;
    });

    let promedioSaber = estado.saber.length > 0
        ? sumaSaber / estado.saber.length
        : 0;

    let valorSaber = promedioSaber * 0.30;


    // ===== HACER =====
    let sumaHacer = 0;
    estado.hacer.forEach(() => {
        sumaHacer += parseFloat(inputs[index].value) || 0;
        index++;
    });

    let promedioHacer = estado.hacer.length > 0
        ? sumaHacer / estado.hacer.length
        : 0;

    let valorHacer = promedioHacer * 0.40;


    // ===== SER =====
    let sumaSer = 0;
    estado.ser.forEach(() => {
        sumaSer += parseFloat(inputs[index].value) || 0;
        index++;
    });

    let promedioSer = estado.ser.length > 0
        ? sumaSer / estado.ser.length
        : 0;

    let valorSer = promedioSer * 0.30;


    // ===== NOTA FINAL =====
    let notaFinal = valorSaber + valorHacer + valorSer;


    // ===== MOSTRAR RESULTADOS =====
    fila.querySelector(".notaSaber").textContent = valorSaber.toFixed(2);
    fila.querySelector(".notaHacer").textContent = valorHacer.toFixed(2);
    fila.querySelector(".notaSer").textContent = valorSer.toFixed(2);
    fila.querySelector(".notaFinal").textContent = notaFinal.toFixed(2);
}

function guardarNota(index, input) {

    const estado = obtenerEstadoActual();
    if (!estado) return;

    if (!estado.datos[index]) {
        estado.datos[index] = {};
    }

    const columna = input.dataset.columna;
    const valor = parseFloat(input.value) || 0;

    estado.datos[index][columna] = valor;

    calcularPromedio(input);
}

function construirComponente(nombreComponente, listaActividades, filaIndex, estado) {

    let actividades = [];
    let suma = 0;

    listaActividades.forEach((nombreActividad, colIndex) => {

        const valor =
            parseFloat(
                estado.datos?.[filaIndex]?.[`${nombreComponente}_${colIndex}`]
            ) || 0;

        suma += valor;

        actividades.push({
            nombreActividad: nombreActividad,
            nota: valor
        });
    });

    const promedio = listaActividades.length > 0
        ? (suma / listaActividades.length)
        : 0;

    return {
        componente: nombreComponente,
        promedio: parseFloat(promedio.toFixed(2)),
        actividades: actividades
    };
}

function actualizarNota(estudianteIndex, componente, nombreActividad, nuevaNota) {

    const estado = obtenerEstadoActual();
    if (!estado) return;

    const actividades = estado[componente];
    const actividadIndex = actividades.indexOf(nombreActividad);

    if (actividadIndex === -1) return;

    if (!estado.datos[estudianteIndex]) {
        estado.datos[estudianteIndex] = {};
    }

    estado.datos[estudianteIndex][`${componente}_${actividadIndex}`] =
        parseFloat(nuevaNota);

    reconstruirTablaNotas();
}

function guardarTodasLasNotas() {

    const estado = obtenerEstadoActual();
    if (!estado) return;

    const gradoSelect = document.getElementById("filtroGrado");
    const subgrado = document.getElementById("filtroSubgrado")?.value;
    const asignatura = document.getElementById("filtroAsignatura")?.value;
    const periodo = document.getElementById("periodo")?.value;

    if (!gradoSelect || !subgrado || !asignatura) {
        alert("Debe seleccionar grado, subgrado y asignatura.");
        return;
    }

    const gradoCompleto =
        gradoSelect.options[gradoSelect.selectedIndex].text + " " + subgrado;

    const filas = document.querySelectorAll("#tabla-upnota-doc tr");

    let resultado = [];

    filas.forEach((fila, filaIndex) => {

        const nombreEstudiante = fila.children[1].textContent;
        const notaFinal = fila.querySelector(".notaFinal").textContent;

        let notas = [];

        // ===== SABER =====
        let actividadesSaber = [];

        estado.saber.forEach((nombreActividad, colIndex) => {

            const valor =
                estado.datos?.[filaIndex]?.[`saber_${colIndex}`] || 0;

            actividadesSaber.push({
                nombreActividad: nombreActividad,
                nota: parseFloat(valor)
            });
        });

        notas.push(
            construirComponente("saber", estado.saber, filaIndex, estado)
        );

        // ===== HACER =====
        let actividadesHacer = [];

        estado.hacer.forEach((nombreActividad, colIndex) => {

            const valor =
                estado.datos?.[filaIndex]?.[`hacer_${colIndex}`] || 0;

            actividadesHacer.push({
                nombreActividad: nombreActividad,
                nota: parseFloat(valor)
            });
        });

        notas.push(
            construirComponente("hacer", estado.hacer, filaIndex, estado)
        );

        // ===== SER =====
        let actividadesSer = [];

        estado.ser.forEach((nombreActividad, colIndex) => {

            const valor =
                estado.datos?.[filaIndex]?.[`ser_${colIndex}`] || 0;

            actividadesSer.push({
                nombreActividad: nombreActividad,
                nota: parseFloat(valor)
            });
        });

        notas.push(
            construirComponente("ser", estado.ser, filaIndex, estado)
        );

        resultado.push({
            estudiante: nombreEstudiante,
            grado_uuid: gradoCompleto,
            materia_nombre: asignatura,
            docente_uuid: "Porfirio Acero Robbles",
            periodo: periodo,
            notas: notas,
            promedio: parseFloat(notaFinal)
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

function obtenerClaveGradoActual() {

    const gradoSelect = document.getElementById("filtroGrado");
    const subgrado = document.getElementById("filtroSubgrado")?.value;

    if (!gradoSelect || !subgrado) return null;

    const gradoTexto = gradoSelect.options[gradoSelect.selectedIndex].text;

    return gradoTexto + " " + subgrado;
}

function obtenerEstadoActual() {

    const clave = obtenerClaveGradoActual();
    if (!clave) return null;

    if (!estadosPorGrado[clave]) {
        estadosPorGrado[clave] = {
            saber: ["N1", "N2"],
            hacer: ["N1", "N2"],
            ser: ["N1", "N2"],
            datos: {}
        };
    }

    return estadosPorGrado[clave];
}
