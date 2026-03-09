let vistaActual = "";

function cargarVista(vista) {
    if (vistaActual === vista) return;

    vistaActual = vista;

    $("#contenido").load(vista, function () {

        cambiarTitulo(vista);
    });
}

$(document).ready(function(){
    cargarVista("/ingresar.html");
});

function cambiarTitulo(ruta) {
    let tituloBase = "EduControl";

    // if (ruta.includes("/index.html")) {
    //     document.title = tituloBase + " | Inicio";
    // } else if (ruta.includes("/nosotros.html")) {
    //     document.title = tituloBase + " | Nosotros";
    // } else if (ruta.includes("/galeria.html")) {
    //     document.title = tituloBase + " | Galería";
    // } else if (ruta.includes("/noticias.html")) {
    //     document.title = tituloBase + " | Noticias";
    // } else if (ruta.includes("/contacto.html")) {
    //     document.title = tituloBase + " | Contáctenos";
    // } else 
        if (ruta.includes("/ingresar.html")) {
        document.title = tituloBase + " | Ingresar";
    } else {
        document.title = tituloBase;
    }
}