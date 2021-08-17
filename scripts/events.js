//Añadir items al carrito presionando el botón en las cards
$("#cards").click((e) => {
	añadirCarrito(e);
});
// Botón de Aum/Dis cantidad de un producto en el carrito
$("#items").click((e) => {
	btnAccion(e);
});

// Función de Aum/Dis cantidad de un producto en el carrito
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

//Se guarda la información del carrito en el local storage
document.addEventListener("DOMContentLoaded", () => {
	fetchData();
	if (localStorage.getItem("carrito")) {
		carrito = JSON.parse(localStorage.getItem("carrito"));
		llevarACarrito();
	}
});

//Mostrar/esconder carrito con el botón en la navbar
$("#carritoButton").click(() => {
	$(".lista").toggle("fast");
});

$("#back").click((e) => {
	añadirCarrito(e);
});
$(".dropdown-item").click((e) => {
	const fetchData = async () => {
		try {
			const res = await fetch("productos.json");
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	fetchData().then((datos) => {
		const totos = datos.filter((item) => item.tipo == $(e.target).attr("id"));
		$("#cards").empty();
		for (const toto of totos) {
			$("#cards").append(`
			<div class="col-12 col-sm-6 col-md-4 col-xl-3 pl-0 pr-0 mb-5">
            <div class="card">
                <img src=${toto.thumbnailUrl} alt="" class="card-img-top">
                <div class="card-body">
                    <h5>${toto.nombre}</h5>
                    <div class="precioTag">
                        $<p>${toto.precio}</p>
                    </div>
                    <button class="btn btn-dark btn-add">Añadir a la lista</button>
                </div>
            </div>
        </div>
			`);
		}
	});
});

$("#all").click((e) => {
	const fetchData = async () => {
		try {
			const res = await fetch("productos.json");
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	fetchData().then((datos) => {
		$("#cards").empty();
		for (const dato of datos) {
			$("#cards").append(`
			<div class="col-12 col-sm-6 col-md-4 col-xl-3 pl-0 pr-0 mb-5">
            <div class="card">
                <img src=${dato.thumbnailUrl} alt="" class="card-img-top">
                <div class="card-body">
                    <h5>${dato.nombre}</h5>
                    <div class="precioTag">
                        $<p>${dato.precio}</p>
                    </div>
                    <button class="btn btn-dark btn-add">Añadir a la lista</button>
                </div>
            </div>
        </div>
			`);
		}
	});
});
