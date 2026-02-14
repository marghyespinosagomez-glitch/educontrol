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
            
        };

        th.appendChild(boton);
    });
}

agregarBotonesColumnas();


function calcularPromedio(input) {
    const fila = input.closest("tr");
    const notas = fila.querySelectorAll(".nota");

    let suma = 0;
    let contador = 0;

    notas.forEach(nota => {
        if (nota.value !== "") {
            suma += parseFloat(nota.value);
            contador++;
        }
    });

    const promedio = contador > 0 ? (suma / contador).toFixed(2) : 0;

    fila.querySelector(".notaFinal").textContent = promedio;
}
