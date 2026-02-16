function cargarVista(vista) {
    $("#contenido").load(vista);
    cambiarTitulo(vista)

}

$(document).ready(function(){
    $("#contenido").load("./dashboard.html");
    cambiarTitulo("./dashboard.html");
});

function cambiarTitulo(ruta) {
    let tituloBase = "EduControl";

    if (ruta.includes("./dashboard.html")) {
        document.title = tituloBase + " | Dashboard";
    } else if (ruta.includes("./docentes.html")) {
        document.title = tituloBase + " | Docentes";
    } else if (ruta.includes("./estudiantes.html")) {
        document.title = tituloBase + " | Estudiantes";
    } else if (ruta.includes("./grados.html")) {
        document.title = tituloBase + " | Grados";
    } else if (ruta.includes("./notasglob.html")) {
        document.title = tituloBase + " | Notas";
    } else if (ruta.includes("./asistencia.html")) {
        document.title = tituloBase + " | Asistencias";
    } else if (ruta.includes("./observaciones.html")) {
        document.title = tituloBase + " | Observaciones";
    } else {
        document.title = tituloBase;
    }
}
