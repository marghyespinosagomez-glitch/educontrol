function cargarVista(vista) {
    $("#contenido").load(vista);
    cambiarTitulo(vista)

}

$(document).ready(function(){
    $("#contenido").load("misnotas.html");
    cambiarTitulo("misnotas.html");
});

function cambiarTitulo(ruta) {
    let tituloBase = "EduControl";

    if (ruta.includes("misnotas.html")) {
        document.title = tituloBase + " | Mis Notas";
    } else if (ruta.includes("asistenciaest.html")) {
        document.title = tituloBase + " | Mis Asistencias";
    } else if (ruta.includes("obserest.html")) {
        document.title = tituloBase + " | Mis Observaciones";
    } else {
        document.title = tituloBase;
    }
}

document.getElementById("navhor").addEventListener("submit", function(e){
    e.preventDefault();
    aggDoc();
});
