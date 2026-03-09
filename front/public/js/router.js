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

    if(vista.includes("Dashboard")){
        initDashboard()
    }
    if(vista.includes("Docentes")){
        initDocentes()
    }
    if(vista.includes("Estudiantes")){
        initDocentes()
    }
    if(vista.includes("Grados")){
        initDocentes()
    }
    if(vista.includes("docentes")){
        initDocentes()
    }

}

function cambiarTitulo(ruta){

    const tituloBase = "EduControl"

    const titulos = {
        dashboard:"Dashboard",
        docentes:"Docentes",
        estudiantes:"Estudiantes",
        grados:"Grados",
        notas:"Notas",
        asistencias:"Asistencias",
        observaciones:"Observaciones",
        // index:"Inicio",
        // nosotros:"Nosotros",
        // galeria:"Galeria",
        // noticias:"Noticias",
        // contacto:"Contacto",
        // ingresar:"Ingresar"
    }.contacto

    for(let key in titulos){
        if(ruta.includes(key)){
            document.title = `${tituloBase} | ${titulos[key]}`
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
    cargarVista("/dashboard.html") 
})