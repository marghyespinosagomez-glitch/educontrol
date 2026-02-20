let vistaActual = "";

function cargarVista(vista) {
    if (vistaActual === vista) return;

    vistaActual = vista;

    $("#contenido").load(vista, function () {

        cambiarTitulo(vista);


        if (vista.includes("minfo.html")) {
            generarTablaInfo();
            activarFiltros();    
        }

        if (vista.includes("subirnotas.html")) {
            setTimeout(() => {
                reconstruirTablaNotas([]);
                activarFiltrosNotas();
                const btnGuardar = document.getElementById("btnGuardarNotas");
                if (btnGuardar) {
                    btnGuardar.addEventListener("click", guardarTodasLasNotas);
                }

            }, 0);
        }
        

        if (vista.includes("asistenciadoc.html")) {
                mostrarFechaActual();
                setTimeout(()=>{
                reconstruirTablaAsistencia([]);
                activarFiltrosAsistencia();
                const btnGuardar = document.getElementById("btnGuardarAsistencia");
                if (btnGuardar) {
                    btnGuardar.addEventListener("click", guardarAsistencia);
                }

        },0 )
        }

        if (vista.includes("obserdoc.html")) {
                mostrarFechaActual();
                setTimeout(()=>{
                reconstruirTablaObservacion([]);
                activarFiltrosObservacion();
                const btnGuardar = document.getElementById("btnGuardarObservacion");
                if (btnGuardar) {
                    btnGuardar.addEventListener("click", guardarAsistencia);
                }

        },0 )
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