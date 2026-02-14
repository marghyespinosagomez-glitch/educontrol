function activarOpciones(elemento) {

    elemento.innerHTML = `
        <span onclick="marcarAsistencia(this, true)">✔</span>
        <span onclick="marcarAsistencia(this, false)">❌</span>
    `;
}

function marcarAsistencia(elemento, presente) {

    const celda = elemento.closest("td");

    if (presente) {
        celda.innerHTML = '<span class="estado">✔</span>';
        celda.dataset.estado = "presente";
    } else {
        celda.innerHTML = '<span class="estado">❌</span>';
        celda.dataset.estado = "inasistencia";
    }

    actualizarTotal(celda.closest("tr"));
}

function actualizarTotal(fila) {

    const celdas = fila.querySelectorAll(".celdaAsis");
    let total = 0;

    celdas.forEach(celda => {
        if (celda.dataset.estado === "inasistencia") {
            total++;
        }
    });

    fila.querySelector(".inasFinal").textContent = total;
}
