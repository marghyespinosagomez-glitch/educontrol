function log(){

    const usuarios= [
        {user: "user", pass: "useradmin", rol: "admin"},
        {user: "user", pass: "userdoc", rol: "userdoc"},
        {user: "user", pass: "userest", rol: "userest"}
    ];
//gola

    const user=document.getElementById('user').value;
    const pass=document.getElementById('password').value;

    const usercheck = usuarios.find(
        u => u.user === user && u.pass === pass
    );

    if (usercheck){
        localStorage.setItem("rol", usercheck.rol);

        if(usercheck.rol === "admin"){
            window.location.href = "views/admin.html";
        }else if(usercheck.rol === "userdoc"){
            window.location.href = "views/userdoc.html";
        }else{
            window.location.href = "views/userest.html"
        }
    }else{
        document.getElementById("msg").innerText="Datos Incorrectos";
    }

}

document.getElementById("loginform").addEventListener("submit", function (e){
    e.preventDefault();
    log();

});




