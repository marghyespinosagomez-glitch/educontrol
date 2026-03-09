let vistaActual = "";

function cargarVista(vista) {
    if (vistaActual === vista) return;

    vistaActual = vista;

    $("#contenido").load(vista, function () {

        cambiarTitulo(vista);


        if (vista.includes("/docentes.html")) {
            activarControlDirector();
        }

    });

}

$(document).ready(function(){
    cargarVista("/dashboard.html");
});

function cambiarTitulo(ruta) {

    const tituloBase = "EduControl";

    const titulos = {
        "/dashboard.html": "Dashboard",
        "/docentes.html": "Docentes",
        "/estudiantes.html": "Estudiantes",
        "/grados.html": "Grados",
        "/notasglob.html": "Notas",
        "/asistencia.html": "Asistencias",
        "/observaciones.html": "Observaciones"
    };

    const pagina = Object.keys(titulos).find(p => ruta.includes(p));

    document.title = pagina
        ? `${tituloBase} | ${titulos[pagina]}`
        : tituloBase;
}