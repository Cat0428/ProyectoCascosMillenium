document.addEventListener("DOMContentLoaded", () => {
    // Recuperar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const botonesAgregar = document.querySelectorAll(".btn-comprar");
    const carritoPopup = document.getElementById("carrito-popup");
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElement = document.getElementById("total");
    const cerrarCarrito = document.getElementById("cerrar-carrito");

    // Función para renderizar el carrito
    const renderizarCarrito = () => {
        listaCarrito.innerHTML = ""; // Limpiar lista
        let total = 0;

        if (carrito.length > 0) {
            carrito.forEach((producto, index) => {
                const li = document.createElement("li");
                li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()}`;

                // Botón para eliminar producto
                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "X";
                btnEliminar.classList.add("eliminar-item");
                btnEliminar.addEventListener("click", () => {
                    carrito.splice(index, 1); // Eliminar producto del carrito
                    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage
                    renderizarCarrito(); // Renderizar nuevamente
                });

                li.appendChild(btnEliminar);
                listaCarrito.appendChild(li);
                total += producto.precio;
            });

            totalElement.textContent = total.toLocaleString();
        } else {
            listaCarrito.innerHTML = "<li>Tu carrito está vacío.</li>";
            totalElement.textContent = "0";
        }
    };

    // Agregar al carrito
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombre = boton.parentElement.querySelector("h3").textContent;
            const precio = parseInt(boton.getAttribute("data-precio"), 10);

            // Agregar producto al carrito
            carrito.push({ nombre, precio });

            // Guardar carrito en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Mostrar carrito emergente y renderizar
            carritoPopup.classList.remove("oculto");
            renderizarCarrito();
        });
    });

    // Botón de pagar
    cerrarCarrito.addEventListener("click", () => {
        if (carrito.length > 0) {
            window.location.href = "paypal.html"; // Redirigir a la página de pago
        } else {
            alert("Tu carrito está vacío.");
        }
    });

    // Renderizar carrito al cargar la página
    renderizarCarrito();
});
