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

function reconstruirTablaAsistencia(listaEstudiantes = baseEstudiantes || []) {

    const tbody = document.getElementById("table-asis-doc");
    if (!tbody) return;

    tbody.innerHTML = "";

    // listaEstudiantes.forEach((estudiante, index) => {

    //     const fila = `
    //         <tr>
    //             <td>${index + 1}</td>
    //             <td>${estudiante.nombre}</td>

    //             <td><input type="radio" name="asis_${index}" value="Presente" checked></td>
    //             <td><input type="radio" name="asis_${index}" value="Evadido"></td>
    //             <td><input type="radio" name="asis_${index}" value="Ausente"></td>
    //             <td><input type="radio" name="asis_${index}" value="Ausente Excusa"></td>
    //             <td><input type="file" class="form-control form-control-sm input-excusa" disabled></td>
    //         </tr>
    //     `;

    //     tbody.innerHTML += fila;
    // });

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

            <td><input type="radio" name="asis_${index}" value="Presente" checked></td>
            <td><input type="radio" name="asis_${index}" value="Evadido"></td>
            <td><input type="radio" name="asis_${index}" value="Ausente"></td>
            <td><input type="radio" name="asis_${index}" value="Ausente Excusa"></td>
            <td><input type="file" class="form-control form-control-sm input-excusa" disabled></td>
        `;

        fragment.appendChild(tr);
    });
    tbody.appendChild(fragment);
    activarControlExcusas();

   
}

function activarControlExcusas() {

    const filas = document.querySelectorAll("#table-asis-doc tr");

    filas.forEach(fila => {

        const radios = fila.querySelectorAll("input[type='radio']");
        const inputFile = fila.querySelector(".input-excusa");

        if (!inputFile) return; // seguridad

        radios.forEach(radio => {

            radio.addEventListener("change", function() {

                if (this.value === "Ausente Excusa" && this.checked) {
                    inputFile.disabled = false;
                } else {
                    inputFile.disabled = true;
                    inputFile.value = "";
                }

            });

        });

    });
}

async function guardarAsistencia() {

    const filas = document.querySelectorAll("#table-asis-doc tr");

    const gradoSelect = document.getElementById("filtroGrado");
    const subgradoSelect = document.getElementById("filtroSubgrado");
    const asignaturaSelect = document.getElementById("filtroAsignatura");

    const hoy = new Date();
    const fecha = hoy.toISOString().split("T")[0];
    const dia = hoy.getDay();

    const gradoTexto = gradoSelect.options[gradoSelect.selectedIndex].text;
    const subgrado = subgradoSelect.value;
    const asignatura = asignaturaSelect.value;

    const gradoCompleto = gradoTexto + " " + subgrado;

    for (let index = 0; index < filas.length; index++) {

        const fila = filas[index];
        const nombre = fila.children[1].textContent;

        const radios = fila.querySelectorAll(`input[name="asis_${index}"]`);
        let estado = "Presente";

        radios.forEach(radio => {
            if (radio.checked) {
                estado = radio.value;
            }
        });

        // 📎 Capturar archivo
        const inputFile = fila.querySelector("input[type='file']");
        let excusaData = null;

        if (estado === "Ausente Excusa" && inputFile.files.length > 0) {

            const archivo = inputFile.files[0];
            const extension = archivo.name.split('.').pop().toLowerCase();

            const base64 = await archivoABase64(archivo);

            excusaData = {
                b64: base64,
                ext: extension
            };
        }

        const objAsis ={
            grado_id: gradoCompleto,
            docente_id: "Bartolomeo Casas",
            materia_id: asignatura,
            fecha: fecha,
            dia: dia,
            estudiante: [{
                nombre: nombre,
                estado: estado,
                excusa: excusaData
            }]
        };
        console.log("ASISTENCIA GUARDADA: ", objAsis);
    }

    

    return objAsis;

}

function archivoABase64(file) {
    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function(e) {
            const base64Completo = e.target.result;
            const base64Limpio = base64Completo.split(',')[1];
            resolve(base64Limpio);
        };

        reader.onerror = function(error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

function aplicarFiltrosAsistencia() {

    const gradoSelect = document.getElementById("filtroGrado");
    const subgradoSelect = document.getElementById("filtroSubgrado");
    const asignaturaSelect = document.getElementById("filtroAsignatura");

    if (!gradoSelect || !subgradoSelect || !asignaturaSelect) return;

    const gradoTexto = gradoSelect.options[gradoSelect.selectedIndex].text;
    const subgrado = subgradoSelect.value;
    const asignatura = asignaturaSelect.value;

    // 🚨 Hasta que no estén los 3 filtros no mostrar nada
    if (!gradoTexto || gradoSelect.value === "" || !subgrado || !asignatura) {
        reconstruirTablaAsistencia([]);
        return;
    }

    // Construir grado completo
    const gradoCompleto = gradoTexto + " " + subgrado;

    // Filtrar estudiantes según grado completo
    const estudiantesFiltrados = baseEstudiantes.filter(est => {
        return est.grado === gradoCompleto;
    });

    reconstruirTablaAsistencia(estudiantesFiltrados);
}

function activarFiltrosAsistencia() {

    const filtroGrado = document.getElementById("filtroGrado");
    const filtroSubgrado = document.getElementById("filtroSubgrado");
    const filtroAsignatura = document.getElementById("filtroAsignatura");

    if (filtroGrado) {
        filtroGrado.addEventListener("change", aplicarFiltrosAsistencia);
    }

    if (filtroSubgrado) {
        filtroSubgrado.addEventListener("change", aplicarFiltrosAsistencia);
    }

    if (filtroAsignatura) {
        filtroAsignatura.addEventListener("change", aplicarFiltrosAsistencia);
    }
}
