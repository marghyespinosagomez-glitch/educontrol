function logout(){
    localStorage.removeItem("rol");
    window.location.href="/main.html";
    window.alert("sesion cerrada, correctamente")
}
