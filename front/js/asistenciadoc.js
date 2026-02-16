function actualizarTotal(input) {

    const fila = input.closest("tr");
    const radios = fila.querySelectorAll("input[type='radio']");

    let estadoSeleccionado = null;

    radios.forEach(radio => {
        if (radio.checked) {
            estadoSeleccionado = radio.value;
        }
    });

    fila.dataset.estado = estadoSeleccionado;
}


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