let vistaActual = "";


function cargarVista(vista) {
    if (vistaActual === vista) return;

    vistaActual = vista;

    $("#contenido").load(vista, function () {

        cambiarTitulo(vista);

        if (vista.includes("asistenciadoc.html")) {
            mostrarFechaActual();
        }

    });

}

$(document).ready(function(){
    cargarVista("./minfo.html");
});

function cambiarTitulo(ruta) {
    let tituloBase = "EduControl";

    if (ruta.includes("./minfo.html")) {
        document.title = tituloBase + " | Mi Información";
    } else if (ruta.includes("./subirnotas.html")) {
        document.title = tituloBase + " | Subir Notas";
    } else if (ruta.includes("./asistenciadoc.html")) {
        document.title = tituloBase + " | Asistencias";
    } else if (ruta.includes("./obserdoc.html")) {
        document.title = tituloBase + " | Observaciones";
    } else {
        document.title = tituloBase;
    }
}