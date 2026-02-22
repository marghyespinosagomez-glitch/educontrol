let vistaActual = "";

function cargarVista(vista) {
    if (vistaActual === vista) return;

    vistaActual = vista;

    $("#contenido").load(vista, function () {

        cambiarTitulo(vista);
    });
}

$(document).ready(function(){
    cargarVista("./views/index.html");
});

function cambiarTitulo(ruta) {
    let tituloBase = "EduControl";

    if (ruta.includes("./views/index.html")) {
        document.title = tituloBase + " | Inicio";
    } else if (ruta.includes("./views/nosotros.html")) {
        document.title = tituloBase + " | Nosotros";
    } else if (ruta.includes("./views/galeria.html")) {
        document.title = tituloBase + " | Galería";
    } else if (ruta.includes("./views/noticias.html")) {
        document.title = tituloBase + " | Noticias";
    } else if (ruta.includes("./views/contacto.html")) {
        document.title = tituloBase + " | Contáctenos";
    } else if (ruta.includes("./views/login.html")) {
        document.title = tituloBase + " | Ingresar";
    } else {
        document.title = tituloBase;
    }
}