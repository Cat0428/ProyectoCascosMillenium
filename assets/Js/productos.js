const botonesComprar = document.querySelectorAll('.btn-comprar');
const modal = document.getElementById('modal-carrito');
const modalImg = document.getElementById('modal-img');
const modalNombre = document.getElementById('modal-nombre');
const modalPrecio = document.getElementById('modal-precio');
const totalCarrito = document.getElementById('total-carrito');
const cantidadTotal = document.getElementById('cantidad-total');
const closeBtn = document.querySelector('.close-btn');
const continuarBtn = document.getElementById('continuar-comprando');
const finalizarBtn = document.getElementById('finalizar-compra');
const cartCountSpan = document.getElementById('cart-count');
const cartSummary = document.getElementById('cart-summary');
const cartIcon = document.getElementById('cart-icon');

let carrito = []; // Arreglo donde guardamos los productos

// 🔥 FUNCION ACTUALIZAR CARRITO
function actualizarCarrito() {
    let totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCountSpan.textContent = totalItems;

    if (carrito.length === 0) {
        cartSummary.innerHTML = `<p>Tu carrito está vacío</p>`;
    } else {
        cartSummary.innerHTML = carrito.map(item => `
            <div style="border-bottom:1px solid #ccc; margin-bottom:10px; display: flex; gap:10px; align-items:center;">
                <img src="${item.imagen}" alt="${item.nombre}" style="width:50px; height:50px; object-fit:cover; border-radius:5px;">
                <div>
                    <strong>${item.nombre}</strong><br>
                    Cant: ${item.cantidad}<br>
                    Subtotal: $${(item.precio * item.cantidad).toLocaleString()}
                </div>
            </div>
        `).join('') +
        `
        <div style="margin-top:10px;">
            <strong>Total: $${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toLocaleString()}</strong>
        </div>
        <div style="margin-top:10px; text-align:center;">
            <button id="btn-ir-carrito" style="padding:8px 12px; background-color:black; color:white; border:none; border-radius:5px; cursor:pointer;">Finalizar Compra</button>
        </div>
        `;
    }

    // 🛒 Ahora también le agregamos un evento al nuevo botón dinámico
    const botonIrCarrito = document.getElementById('btn-ir-carrito');
    if (botonIrCarrito) {
        botonIrCarrito.addEventListener('click', () => {
            window.location.href = '/Pages/carrito.html';
        });
    }
}


// 🔥 EVENTO AL DAR CLICK EN "AGREGAR AL CARRITO"
botonesComprar.forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.closest('.producto');
        const nombre = producto.querySelector('h3').textContent;
        const precioTexto = producto.querySelector('.info p')?.textContent || "$0";
        const precio = parseInt(precioTexto.replace(/\D/g, '')) || 0;
        const imgSrc = producto.querySelector('img').src;

        // Revisamos si el producto ya existe
        const existe = carrito.find(item => item.nombre === nombre);
        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                imagen: imgSrc,
                cantidad: 1
            });
        }

        // Abrimos el modal con info
        modalImg.src = imgSrc;
        modalNombre.textContent = nombre;
        modalPrecio.textContent = `Precio: $${precio.toLocaleString()}`;

        // Actualizar modal cantidad y total
        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

        totalCarrito.textContent = total.toLocaleString();
        cantidadTotal.textContent = cantidad;

        // 🔥 ACTUALIZAMOS CARRITO
        actualizarCarrito();

        // Mostramos el modal
        modal.classList.remove('hidden');
    });
});

// 🔥 BOTONES DEL MODAL
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

continuarBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

finalizarBtn.addEventListener('click', () => {
    window.location.href = '/Pages/carrito.html';
});

// 🔥 HOVER SOBRE EL ICONO DEL CARRITO
cartIcon.addEventListener('mouseenter', () => {
    cartSummary.classList.add('show');
});

cartIcon.addEventListener('mouseleave', () => {
    cartSummary.classList.remove('show');
});



// filtro logos flotantes

document.addEventListener("DOMContentLoaded", function () {
const params = new URLSearchParams(window.location.search);
const marcaSeleccionada = params.get("marca");

    if (marcaSeleccionada) {
        const productos = document.querySelectorAll(".producto");

        productos.forEach(producto => {
            const marcaProducto = producto.getAttribute("data-marca");

            if (marcaProducto !== marcaSeleccionada) {
                producto.style.display = "none"; // Oculta los que no coincidan
            }
        });

        console.log("Productos filtrados por marca:", marcaSeleccionada);
    }
});

//----------- INICIO FILTRO

// Seleccionar elementos del DOM
const priceMinInput = document.getElementById("price-min");
const priceMaxInput = document.getElementById("price-max");
const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");
const buscarBtn = document.getElementById("buscar-btn");

const minPrice = 80000;
const maxPrice = 1990000;

// Inicializar valores
priceMinInput.value = minPrice;
priceMaxInput.value = maxPrice;
priceRange.min = minPrice;
priceRange.max = maxPrice;
priceRange.value = minPrice;
priceValue.textContent = `$ ${minPrice.toLocaleString()} - $ ${maxPrice.toLocaleString()}`;

// Actualizar valores en el slider
priceRange.addEventListener("input", () => {
    priceMinInput.value = priceRange.value;
    priceValue.textContent = `$ ${priceRange.value.toLocaleString()} - $ ${maxPrice.toLocaleString()}`;
});

// Actualizar valores en los inputs
priceMinInput.addEventListener("input", () => {
    if (priceMinInput.value < minPrice) priceMinInput.value = minPrice;
    if (priceMinInput.value > maxPrice) priceMinInput.value = maxPrice;
    priceRange.value = priceMinInput.value;
    priceValue.textContent = `$ ${priceMinInput.value.toLocaleString()} - $ ${maxPrice.toLocaleString()}`;
});

priceMaxInput.addEventListener("input", () => {
    if (priceMaxInput.value > maxPrice) priceMaxInput.value = maxPrice;
    if (priceMaxInput.value < minPrice) priceMaxInput.value = minPrice;
    priceValue.textContent = `$ ${priceMinInput.value.toLocaleString()} - $ ${priceMaxInput.value.toLocaleString()}`;
});

// Evento de búsqueda
buscarBtn.addEventListener("click", () => {
    const minSelected = parseInt(priceMinInput.value, 10);
    const maxSelected = parseInt(priceMaxInput.value, 10);
    console.log(`Filtrar productos entre: $${minSelected} - $${maxSelected}`);
    // Aquí puedes agregar la lógica para filtrar productos
});

//------------------ FIN FILTRO

//-------------- LUPA HEADER funcionalidad buscar

document.getElementById("icono-busqueda").addEventListener("click", function () {
    let busqueda = prompt("¿Qué producto buscas?");
    if (busqueda) {
        alert(`Buscando: ${busqueda}`);
    }
});

document.getElementById("icono-usuario").addEventListener("click", function () {
    alert("Aquí iría el menú de usuario o el inicio de sesión.");
});


let cartCount = 0;

function addToCart(){
    cartCount++
    document.querySelector('.cart-count').textContent = cartCount;
}
 function toggleCart(){
    alert('Aqui puedes mostrar el contenido del carrito');
 }  



  
