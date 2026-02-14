function cargarVista(vista) {
    $("#contenido").load(vista);
    cambiarTitulo(vista)

}

$(document).ready(function(){
    $("#contenido").load("minfo.html");
    cambiarTitulo("minfo.html");
});

function cambiarTitulo(ruta) {
    let tituloBase = "EduControl";

    if (ruta.includes("minfo.html")) {
        document.title = tituloBase + " | Mi Información";
    } else if (ruta.includes("subirnotas.html")) {
        document.title = tituloBase + " | Subir Notas";
    } else if (ruta.includes("asistenciadoc.html")) {
        document.title = tituloBase + " | Asistencias";
    } else if (ruta.includes("obserdoc.html")) {
        document.title = tituloBase + " | Observaciones";
    } else {
        document.title = tituloBase;
    }
}
