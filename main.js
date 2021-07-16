//Toma nombre de Usuario y lo muestra en la navbar
function showUser() {
    let userName = document.getElementById("userName").value;
    document.getElementById("userLogged").innerHTML = "Bienvenido, " + userName;  
}