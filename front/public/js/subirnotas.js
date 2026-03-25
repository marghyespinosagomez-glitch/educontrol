let estadosPorGrado = {};

function agregarNota(tipo) {

    const estado = obtenerEstadoActual();
    if (!estado) return;

    const nuevoNumero = estado[tipo].length + 1;
    estado[tipo].push("N" + nuevoNumero);

    aplicarFiltrosNotas();
}

function reconstruirTablaNotas(listaEstudiantes = baseEstudiantes || []) {

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

    const componentes = ["saber", "hacer", "ser"].map(componente => {

        const actividades = estado[componente].map((nombreActividad, colIndex) => {

            const alumnos = [];

            filas.forEach((fila, filaIndex) => {

                const nombreEstudiante = fila.children[1].textContent;

                const valor =
                    estado.datos?.[filaIndex]?.[`${componente}_${colIndex}`] || 0;

                alumnos.push({
                    alumno_uuid: nombreEstudiante,
                    nota: parseFloat(valor)
                });
            });

            return {
                nombreActividad,
                alumnos
            };
        });

        return {
            componente,
            actividades
        };
    });

    const objSubNotas= {
        configuracion: {
            grado_uuid: gradoCompleto,
            materia_nombre: asignatura,
            docente_uuid: "Porfirio Acero Robbles",
            periodo
        },
        componentes
    };

    console.log("NOTAS GUARDADAS: ", objSubNotas);

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
 
function initSubirNotas(){
    setTimeout(() => {
        reconstruirTablaNotas([]);
        activarFiltrosNotas();
        const btnGuardar = document.getElementById("btnGuardarNotas");
        if (btnGuardar) {
            btnGuardar.addEventListener("click", guardarTodasLasNotas);
        }

    }, 0);
}