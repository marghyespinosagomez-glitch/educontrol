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

    if(vista.includes("dashboard")){
        initDashboard()
    }
    if(vista.includes("docentes")){
        initDocentes()
    }
    if(vista.includes("estudiantes")){
        initEstudiantes()
    }
    if(vista.includes("grados")){
        initGrados()
    }
    if(vista.includes("notasglob")){
        initNotasGlobales()
    }
    if(vista.includes("asistencia")){
        initAsistencias()
    }
    if(vista.includes("obser")){
        initObservaciones()
    }

}

function cambiarTitulo(ruta){

    const tituloBase = "EduControl"

    const titulos = {
        dashboard:"Dashboard",
        docentes:"Docentes",
        estudiantes:"Estudiantes",
        grados:"Grados",
        notasglob:"Notas",
        asistencia:"Asistencias",
        obser:"Observaciones",
    }

    for(let key in titulos){
        if(ruta.includes(key)){
            document.title = `${tituloBase} | ${titulos[key]}`
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
    cargarVista("/dashboard.html") 
})

// const contenedor = document.getElementById("contenido")

// async function cargarVista(vista){

//     try{

//         const res = await fetch(vista)
//         const html = await res.text()

//         contenedor.innerHTML = html

//         cambiarTitulo(vista)
//         inicializarVista(vista)

//     }catch(e){

//         contenedor.innerHTML = "<h2>Error cargando la vista</h2>"

//     }

// }

// function inicializarVista(vista){

//     if(vista.includes("dashboard")){
//         initDashboard()
//     }
//     if(vista.includes("docentes")){
//         initDocentes()
//     }
//     if(vista.includes("estudiantes")){
//         initEstudiantes()
//     }
//     if(vista.includes("grados")){
//         initGrados()
//     }
//     if(vista.includes("notasglob")){
//         initNotasGlobales()
//     }
//     if(vista.includes("asistencia")){
//         initAsistencia()
//     }
//     if(vista.includes("obser")){
//         initObser()
//     }

// }

// function cambiarTitulo(ruta){

//     const tituloBase = "EduControl"

//     const titulos = {
//         dashboard:"Dashboard",
//         docentes:"Docentes",
//         estudiantes:"Estudiantes",
//         grados:"Grados",
//         notasglob:"Notas",
//         asistencia:"Asistencias",
//         obser:"Observaciones",
//     }

//     for(let key in titulos){
//         if(ruta.includes(key)){
//             document.title = `${tituloBase} | ${titulos[key]}`;
//             return;
//         }
//     }
// }

// document.addEventListener("click",function(e){
//     if(e.target.classList.contains("nav-link-spa")){
//         e.preventDefault()
//         const vista = e.target.dataset.vista
//         cargarVista(vista)
//     }
// })

// document.addEventListener("DOMContentLoaded",function(){
//     cargarVista("/dashboard.html") 
// })
