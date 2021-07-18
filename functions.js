const añadirCards = (data) => {
	data.forEach((producto) => {
		templateCard.querySelector("h5").textContent = producto.nombre;
		templateCard.querySelector("p").textContent = producto.precio;
		templateCard
			.querySelector("img")
			.setAttribute("src", producto.thumbnailUrl);
		templateCard.querySelector("button").dataset.id = producto.id;

		const clone = templateCard.cloneNode(true);
		fragment.appendChild(clone);
	});
	cards.appendChild(fragment);
};

const añadirCarrito = (e) => { //
	if (e.target.classList.contains("btn-dark")) {
		tomarCarrito(e.target.parentElement);
	}
	e.stopPropagation(); //Detener otras acciones aparte de la que se quiere hacer target
};

const tomarCarrito = (objeto) => {
	const producto = {
		id: objeto.querySelector(".btn-dark").dataset.id,
		nombre: objeto.querySelector("h5").textContent,
		precio: objeto.querySelector("p").textContent,
		cantidad: 1,
	};
	if (carrito.hasOwnProperty(producto.id)) {
		producto.cantidad = carrito[producto.id].cantidad + 1;
	}

	carrito[producto.id] = { ...producto };
	llevarACarrito();
};

const llevarACarrito = () => {
	items.innerHTML = "";
	Object.values(carrito).forEach((producto) => {
		templateCarrito.querySelector("th").textContent = producto.id;
		templateCarrito.querySelectorAll("td")[0].textContent = producto.nombre;
		templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
		templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
		templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
		templateCarrito.querySelector("span").textContent =
			producto.cantidad * producto.precio;

		const clone = templateCarrito.cloneNode(true);
		fragment.appendChild(clone);
	});
	items.appendChild(fragment);

	pintarFooter();

	localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
	footer.innerHTML = "";
	if (Object.keys(carrito).length === 0) {
		footer.innerHTML = `<th scope="row" colspan="5">¡Añade los productos que te gustan!</th>`;

		return; //Detecta si el carrito está vacío e imprime el th y para el restoo del código
	}

	const nCantidad = Object.values(carrito).reduce(
		(acc, { cantidad }) => acc + cantidad,
		0
	);
	const nPrecio = Object.values(carrito).reduce( 
		(acc, { cantidad, precio }) => acc + cantidad * precio,
		0
	);

	templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
	templateFooter.querySelector("span").textContent = nPrecio;

	const clone = templateFooter.cloneNode(true);
	fragment.appendChild(clone);
	footer.appendChild(fragment);

//Eliminar todos los items del carrito
	const btnVaciar = document.getElementById("vaciar-carrito");
	btnVaciar.addEventListener("click", () => {
		carrito = {};
		llevarACarrito();
	});
};
//Botones de añadir o disminuir más de un producto
const btnAccion = (e) => {
	if (e.target.classList.contains("btn-info")) {
		const producto = carrito[e.target.dataset.id];
		producto.cantidad++;
		carrito[e.target.dataset.id] = { ...producto };
		llevarACarrito();
	}

	if (e.target.classList.contains("btn-danger")) {
		const producto = carrito[e.target.dataset.id];
		producto.cantidad--;
		if (producto.cantidad === 0) {
			delete carrito[e.target.dataset.id];
		}
		llevarACarrito();
	}

	e.stopPropagation();
};

