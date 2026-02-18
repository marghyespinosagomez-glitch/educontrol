let contadorNotas = 2;

function agregarNota() {
    contadorNotas++;

    const filaHead = document.getElementById("filaHead");
    const notaFinal = document.getElementById("colNotaFinal");

    // Crear nueva columna en THEAD
    const nuevaColumna = document.createElement("th");
    nuevaColumna.textContent = "N" + contadorNotas;

    filaHead.insertBefore(nuevaColumna, notaFinal);

    // Agregar celda en cada fila del TBODY
    const filas = document.querySelectorAll("#bodyNotas tr");

    filas.forEach(fila => {
        const nuevaCelda = document.createElement("td");

        nuevaCelda.innerHTML =
            '<input type="number" class="form-control nota" oninput="calcularPromedio(this)">';

        fila.insertBefore(nuevaCelda, fila.querySelector(".notaFinal"));
    });
}

function agregarBotonesColumnas() {
    const columnas = document.querySelectorAll("#filaHead th");

    columnas.forEach((th, index) => {

        if (th.id === "colNotaFinal" || index < 2) return;

        const boton = document.createElement("button");
        boton.className = "btn-add-col";
        boton.innerHTML = "+";

        boton.onclick = function (e) {
            e.stopPropagation();
            agregarNota();
            agregarBotonesColumnas();
            generarTablaNotas();
            
        };

        th.appendChild(boton);
    });
}

agregarBotonesColumnas();

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

const estudiantes = [
    "Kevin Jefferson Fabian Acero Barrera",
    "Juan David Acero Urbano",
    "Maria Fernanda Torres Mujica"
]

function generarTablaNotas() {

    const tbody = document.getElementById("tabla-upnota-doc");
    const columnasNotas = document.querySelectorAll("#filaHead th").length - 3; 
    // -3 porque no contamos Item, Estudiantes y Nota Final

    tbody.innerHTML = "";

    estudiantes.forEach((nombre, index) => {

        let fila = `
            <tr>
                <td>${index + 1}</td>
                <td>${nombre}</td>
        `;

        // Generar inputs para cada N (N1, N2, N3...)
        for (let i = 0; i < columnasNotas; i++) {
            fila += `
                <td>
                    <input type="number"
                           class="form-control nota"
                           min="0"
                           max="5"
                           step="0.1"
                           oninput="calcularPromedio(this)">
                </td>
            `;
        }

        fila += `
                <td class="notaFinal">0</td>
            </tr>
        `;

        tbody.innerHTML += fila;
    });
}
