function aggEst(){

    const typeDoc = document.getElementById('tipodoc').value;
    const doc = document.getElementById('doc').value;
    const name = document.getElementById('namest').value;
    const emailest = document.getElementById('emailest').value;
    const telest = document.getElementById('telest').value;
    const direst = document.getElementById('direst').value;
    const grade = document.getElementById('grado');
    const letter = document.getElementById('letra').value;
    const nameacu = document.getElementById('nameacu').value;
    const emailacu = document.getElementById('emailacu').value;
    const telacu = document.getElementById('telacu').value;
    const diracu = document.getElementById('diracu').value;

    const objEst = {
        tipoDocumento:typeDoc,
        documento:doc,
        nombre:name,
        correo:emailest,
        telefono:telest,
        direccion:direst,
        grado:grade.options[grade.selectedIndex].text+'-'+letter,
        acudiente_nombre:nameacu,
        acudiente_email:emailacu,
        acudiente_telefono:telacu,
        acudiente_direccion:diracu,
    }

    console.log('Objeto de Estudiantes: ', objEst)
}

document.getElementById("formAggEst").addEventListener("submit", function(e){
    e.preventDefault();
    aggEst();
});


