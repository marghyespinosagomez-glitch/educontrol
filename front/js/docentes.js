function aggDoc(){

    const typeDoc = document.getElementById('tipodoc').value;
    const doc = document.getElementById('doc').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const grade = document.getElementById('grado');
    const letter = document.getElementById('letra').value;
    const matter = Array.from(document.querySelectorAll('input[name="matter"]:checked')).map(el => el.value);
    const tel = document.getElementById('tel').value;
    const dir = document.getElementById('dir').value;

    const objDoc = {
        tipoDocumento:typeDoc,
        documento:doc,
        nombre:name,
        correo:email,
        telefono:tel,
        direccion:dir,
        observacion:[{grados:grade.options[grade.selectedIndex].text+'-'+letter, materias:[matter]}]
    }

    console.log('Objeto de Docentes: ', objDoc)
}

document.getElementById("formAggDoc").addEventListener("submit", function(e){
    e.preventDefault();
    aggDoc();
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
