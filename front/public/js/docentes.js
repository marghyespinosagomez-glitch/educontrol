function aggDoc(){

    const typeDoc = document.getElementById('tipodoc').value;
    const doc = document.getElementById('doc').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const elecDir = document.getElementById('elec-dir').value;
    const gradeDirec = document.getElementById('gradodirec');
    const letterDirec = document.getElementById('letradirec').value;
    const tel = document.getElementById('tel').value;
    const dir = document.getElementById('dir').value;

    if (materiasSeleccionadasDoc.length === 0) {
        alert("Agrega al menos una materia");
        return;
    }

    const objDoc = {
        tipoDocumento:typeDoc,
        documento:doc,
        nombre:name,
        correo:email,
        telefono:tel,
        direccion:dir,
        director:[
            {
                estado:elecDir, 
                grado_dir:gradeDirec.options[gradeDirec.selectedIndex].text+'-'+letterDirec,
            }
        ],
        observacion:materiasSeleccionadasDoc.map(m => ({
            grado_mat:m.grado_materia,
            materias:m.materia,
        }))
    }

    console.log('Objeto de Docentes: ', objDoc)
}

document.addEventListener("submit",function(e){
    if(e.target.id === "formAggDoc"){
        e.preventDefault();
        aggDoc();
    }
});

// document.getElementById('formAggDoc').addEventListener('submit', function(e){
//     e.preventDefault();
//     aggDoc();
// })

// const formAggDoc = document.getElementById("formAggDoc");

// if (formAggDoc) {
//     formAggDoc.addEventListener("submit", function(e){
//         e.preventDefault();
//         aggDoc();
//     });
// }

$(document).ready(function () {

    // Deshabilitar materias al iniciar
    $(".materia").prop("disabled", true);

    $("#grado, #letra").on("change", function () {
        validarSeleccionDocentes();
    });

});

function validarSeleccionDocentes() {

    let grado = $("#grado").val();
    let letra = $("#letra").val();

    if (grado && letra) {
        $(".materia").prop("disabled", false);
    } else {
        $(".materia").prop("disabled", true);
        $(".materia").prop("checked", false); // opcional: desmarcar si se vuelve a deshabilitar
    }
}

function activarControlDirectorDocentes() {

    const selectDirector = document.getElementById("elec-dir");
    const grado = document.getElementById("gradodirec");
    const letra = document.getElementById("letradirec");

    if (!selectDirector || !grado || !letra) return;

    selectDirector.addEventListener("change", function () {

        if (this.value === "si") {
            grado.disabled = false;
            letra.disabled = false;
        } else {
            grado.disabled = true;
            letra.disabled = true;

            // limpiar selección
            grado.selectedIndex = 0;
            letra.selectedIndex = 0;
        }

    });
}

const materiasSeleccionadasDoc = [];

$(document).off("click", "#btnAgregarMatDoc").on("click", "#btnAgregarMatDoc", function () {

    const selectGrado = document.getElementById("grado");
    const selectLetra = document.getElementById("letra").value;

    const materias = Array.from(document.querySelectorAll("input[name='matter']:checked"))
        .map(el => el.value);

    if (materias.length === 0 || !selectGrado.value || !selectLetra) {
        alert("Selecciona al menos una materia, un grado y una letra");
        return;
    }

    materiasSeleccionadasDoc.push({
        grado_materia: selectGrado.options[selectGrado.selectedIndex].text + " " + selectLetra,
        materia: materias
    });

    mostrarMateriasDocentes();
    limpiarCamposDocentes();
});

function mostrarMateriasDocentes() {

    const contenedor = document.getElementById("materiasAgregadas");
    contenedor.innerHTML = "";

    materiasSeleccionadasDoc.forEach(materia => {

        const div = document.createElement("div");
        div.classList.add("badge", "bg-secondary", "me-2", "mb-2");
        div.textContent = materia.materia;

        contenedor.appendChild(div);
    });
}

function limpiarCamposDocentes() {

    document.getElementById("grado").selectedIndex = 0;
    document.getElementById("letra").selectedIndex = 0;

    document.querySelectorAll("input[name='matter']").forEach(el => el.checked = false);
}

function initDocentes(){
    activarControlDirectorDocentes();
}
 