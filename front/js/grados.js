function aggGrado(){

    const grade = document.getElementById('grado');
    const letter = document.getElementById('letra').value;
    const namedirec = document.getElementById('namedirec');

    if (materiasSeleccionadas.length === 0) {
        alert("Agrega al menos una materia");
        return;
    }

    const objGrado = {
        numero:grade.options[grade.selectedIndex].text,
        letra:letter,
        director_grado:namedirec.options[namedirec.selectedIndex].text,
        alumnos:[],
        materias:materiasSeleccionadas.map(m => ({
            nombre:m.nombre,
            horario:{
                dias:m.dias,
                bloques:m.bloques
            }
        }))
    };

    console.log('Objeto de Grados: ', objGrado)
}

document.getElementById("formAggGrado").addEventListener("submit", function(e){
    e.preventDefault();
    aggGrado();
    limpiarFormularioCompleto();
});

$(document).ready(function () {

    // Deshabilitar materias al iniciar
    $(".materia").prop("disabled", true);

    $("#grado, #letra").on("change", function () {
        validarSeleccion();
    });

});

function validarSeleccion() {
    let grado = $("#grado").val();
    let letra = $("#letra").val();

    if (grado && letra ) {
        $(".materia").prop("disabled", false);
    } else {
        $(".materia").prop("disabled", true);
        $(".materia").prop("checked", false); // opcional: desmarcar si se vuelve a deshabilitar
    }
}

const materiasSeleccionadas = [];

document.getElementById("btnAgregar").addEventListener("click", function () {

    const selectMateria = document.getElementById("matter");
    const materiaNombre = selectMateria.options[selectMateria.selectedIndex].text;

    // const dias = document.getElementById("day");
    const dias = Array.from(document.querySelectorAll("input[name='day']:checked"))
        .map(el => el.value)

    const bloques = Array.from(document.querySelectorAll("input[name='block']:checked"))
        .map(el => el.value);

    if (dias.length === 0 || bloques.length === 0) {
        alert("Selecciona al menos un bloque");
        return;
    }

    // Guardamos objeto completo
    materiasSeleccionadas.push({
        nombre: materiaNombre,
        dias: dias,
        bloques: bloques
    });

    mostrarMaterias();
    limpiarCampos();
});

function mostrarMaterias() {

    const contenedor = document.getElementById("materiasAgregadas");
    contenedor.innerHTML = "";

    materiasSeleccionadas.forEach(materia => {

        const div = document.createElement("div");
        div.classList.add("badge", "bg-secondary", "me-2", "mb-2");
        div.textContent = materia.nombre;

        contenedor.appendChild(div);
    });
}

function limpiarCampos() {

    document.getElementById("matter").selectedIndex = 0;

    document.querySelectorAll("input[name='day']").forEach(el => el.checked = false);
    document.querySelectorAll("input[name='block']").forEach(el => el.checked = false);
}

function limpiarFormularioCompleto() {

    // Resetear formulario completo
    document.getElementById("formAggGrado").reset();

    // Vaciar array de materias
    materiasSeleccionadas.length = 0;

    // Limpiar visualización de materias
    mostrarMaterias();

    // Deshabilitar días y bloques nuevamente
    $(".materia").prop("disabled", true);
    $(".materia").prop("checked", false);
}
