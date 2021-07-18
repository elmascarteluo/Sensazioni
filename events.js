document.addEventListener("DOMContentLoaded", () => {
	fetchData();
	if (localStorage.getItem("carrito")) {
		carrito = JSON.parse(localStorage.getItem("carrito"));
		llevarACarrito();
	}
});
cards.addEventListener("click", (e) => {
	añadirCarrito(e);
});

items.addEventListener("click", (e) => {
	btnAccion(e);
});
const fetchData = async () => {
	try {
		const res = await fetch("api.json");
		const data = await res.json();
		// console.log(data)
		añadirCards(data);
	} catch (error) {
		console.log(error);
	}
};