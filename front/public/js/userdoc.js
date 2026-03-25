const contenedor = document.getElementById("contenido")

async function cargarVista(vista){

    try{

        const res = await fetch(vista)
        const html = await res.text()

        contenedor.innerHTML = html

        cambiarTitulo(vista)
        inicializarVista(vista)

    }catch(e){

        contenedor.innerHTML = "<h2>Error cargando la vista</h2>"

    }

}

function inicializarVista(vista){

    if(vista.includes("minfo")){
        initMinfo()
    }
    if(vista.includes("subirnotas")){
        initSubirNotas()
    }
    if(vista.includes("asistenciadoc")){
        initAsistenciasDoc()
    }
    if(vista.includes("obserdoc")){
        initObservacionesDoc()
    }

}

function cambiarTitulo(ruta){

    const tituloBase = "EduControl"

    const titulos = {
        minfo:"Mi Información",
        subirnotas:"Subir Notas",
        asistenciadoc:"Asistencias",
        obserdoc:"Observaciones",
    }

    for(let key in titulos){
        if(ruta.includes(key)){
            document.title = `${tituloBase} | ${titulos[key]}`;
            return;
        }
    }
}

document.addEventListener("click",function(e){
    if(e.target.classList.contains("nav-link-spa")){
        e.preventDefault()
        const vista = e.target.dataset.vista
        cargarVista(vista)
    }
})

document.addEventListener("DOMContentLoaded",function(){
    cargarVista("/minfo.html") 
})
