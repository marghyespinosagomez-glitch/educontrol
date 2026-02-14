function aggEst(){

    const typeDoc = document.getElementById('tipodoc').value;
    const doc = document.getElementById('doc').value;
    const name = document.getElementById('namest').value;
    const grade = document.getElementById('grado');
    const letter = document.getElementById('letra').value;
    const nameacu = document.getElementById('nameacu').value;
    const email = document.getElementById('emailacu').value;
    const tel = document.getElementById('telacu').value;
    const dir = document.getElementById('dir').value;

    const objEst = {
        tipoDocumento:typeDoc,
        documento:doc,
        nombre:name,
        grado:grade.options[grade.selectedIndex].text+'-'+letter,
        nombreacu:nameacu,
        correo:email,
        telefono:tel,
        direccion:dir,
    }

    console.log('Objeto de Estudiantes: ', objEst)
}

document.getElementById("formAggEst").addEventListener("submit", function(e){
    e.preventDefault();
    aggEst();
});


