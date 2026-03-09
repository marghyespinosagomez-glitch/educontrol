function mostrarFechaActual() {

    const input = document.getElementById("fechaActual");
    if (!input) return;

    const hoy = new Date();

    input.value = hoy.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function reconstruirTablaObservacion(listaEstudiantes = baseEstudiantes || []) {

    const tbody = document.getElementById("table-obser-doc");
    if (!tbody) return;

    // Limpiar tabla
    tbody.innerHTML = "";

    // Usamos DocumentFragment para mejor performance
    const fragment = document.createDocumentFragment();

    listaEstudiantes.forEach((estudiante, index) => {

        const tr = document.createElement("tr");

        // Guardamos datos reales en atributos
        tr.dataset.nombre = estudiante.nombre;
        tr.dataset.grado = estudiante.grado;

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${estudiante.nombre}</td>

            <td>
                <select class="form-select reporte-select" required>
                    <option value="" disabled selected>Seleccionar Reporte</option>
                    <option value="1">Actividad Complementaria</option>
                    <option value="2">Llegada Tarde a la Institución</option>
                    <option value="3">Llegada Tarde al Aula</option>
                    <option value="4">Evadido de Clase</option>
                    <option value="5">Porte de Uniforme Inadecuado</option>
                    <option value="6">Uso Inadecuado de Dispositivo</option>
                    <option value="7">Fomenta Indisciplina</option>
                    <option value="8">Incumple con las Actividades Academicas</option>
                </select>
            </td>

            <td>
                <input class="form-control actividad-input" type="text">
            </td>

            <td>
                <input type="radio" class="estado-radio" value="presente">
            </td>
        `;

        fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
}

function guardarObservacion() {

    const filas = document.querySelectorAll("#table-obser-doc tr");

    const gradoSelect = document.getElementById("filtroGrado");
    const subgradoSelect = document.getElementById("filtroSubgrado");
    const asignaturaSelect = document.getElementById("filtroAsignatura");

    if (!gradoSelect.value || !subgradoSelect.value || !asignaturaSelect.value) {
        alert("Debe seleccionar grado, subgrado y asignatura.");
        return;
    }

    const hoy = new Date();
    const fecha = hoy.toISOString().split("T")[0];
    const dia = hoy.getDay();

    const gradoTexto = gradoSelect.options[gradoSelect.selectedIndex].text;
    const subgrado = subgradoSelect.value;
    const asignatura = asignaturaSelect.value;

    const gradoCompleto = `${gradoTexto} ${subgrado}`;

    const estudiantes = [];

    filas.forEach((fila) => {

        const nombre = fila.dataset.nombre;

        const reporte = fila.querySelector(".reporte-select")?.value || null;
        const complementaria = fila.querySelector(".actividad-input")?.value || "";
        const estado = fila.querySelector(".estado-radio:checked")?.value;

        estudiantes.push({
            nombre,
            reporte_dis: reporte,
            actividad_com: complementaria,
            estado
        });

    });

    const objObser = {
        grado_id: gradoCompleto,
        docente_id: "Bartolomeo Casas",
        materia_id: asignatura,
        fecha,
        dia,
        estudiantes
    };

    console.log("Observación Guardada:", objObser);

    return objObser;
}

function aplicarFiltrosObservacion() {

    const gradoSelect = document.getElementById("filtroGrado");
    const subgradoSelect = document.getElementById("filtroSubgrado");
    const asignaturaSelect = document.getElementById("filtroAsignatura");

    if (!gradoSelect || !subgradoSelect || !asignaturaSelect) return;

    const gradoTexto = gradoSelect.options[gradoSelect.selectedIndex].text;
    const subgrado = subgradoSelect.value;
    const asignatura = asignaturaSelect.value;

    // 🚨 Hasta que no estén los 3 filtros no mostrar nada
    if (!gradoTexto || gradoSelect.value === "" || !subgrado || !asignatura) {
        reconstruirTablaObservacion([]);
        return;
    }

    // Construir grado completo
    const gradoCompleto = gradoTexto + " " + subgrado;

    // Filtrar estudiantes según grado completo
    const estudiantesFiltrados = baseEstudiantes.filter(est => {
        return est.grado === gradoCompleto;
    });

    reconstruirTablaObservacion(estudiantesFiltrados);
}

function activarFiltrosObservacion() {

    const filtroGrado = document.getElementById("filtroGrado");
    const filtroSubgrado = document.getElementById("filtroSubgrado");
    const filtroAsignatura = document.getElementById("filtroAsignatura");

    if (filtroGrado) {
        filtroGrado.addEventListener("change", aplicarFiltrosObservacion);
    }

    if (filtroSubgrado) {
        filtroSubgrado.addEventListener("change", aplicarFiltrosObservacion);
    }

    if (filtroAsignatura) {
        filtroAsignatura.addEventListener("change", aplicarFiltrosObservacion);
    }
}
