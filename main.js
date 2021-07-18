//Toma nombre de Usuario y lo muestra en la navbar
const showUser = () => {
    let userName = document.getElementById("userName").value;
    document.getElementById("userLogged").innerHTML = "Bienvenido, " + userName;  
}

//Carrito
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};



