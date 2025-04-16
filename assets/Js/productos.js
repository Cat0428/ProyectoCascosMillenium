  //modal carrito, funcionalidad del boton comprar

  const botonesComprar = document.querySelectorAll('.btn-comprar');
  const modal = document.getElementById('modal-carrito');
  const modalImg = document.getElementById('modal-img');
  const modalNombre = document.getElementById('modal-nombre');
  const modalPrecio = document.getElementById('modal-precio');
  const totalCarrito = document.getElementById('total-carrito');
  const cantidadTotal = document.getElementById('cantidad-total');
  const closeBtn = document.querySelector('.close-btn')
  
  let total = 0;
  let cantidad = 0;

  botonesComprar.forEach(boton => {
    boton.addEventListener('click', () =>{
        const producto = boton.closest('.producto');
        const nombre = producto.querySelector('h3').textContent;
        const precioTexto = producto.querySelector('.precio')?.textContent || "$0";
        const precio = parseInt(precioTexto.replace(/\D/g, '')) || 0;
        const imgSrc = producto.querySelector('img').src;

    // Actualizar modal
    modalImg.src = imgSrc;
    modalNombre.textContent = nombre;
    modalPrecio.textContent = `Precio: $${precio.toLocaleString()}`;

    // Actualizar totales
    total += precio;
    cantidad++;
    totalCarrito.textContent = total.toLocaleString();
    cantidadTotal.textContent = cantidad;

    modal.classList.remove('hidden');       


    })
  })

  // Cerrar modal
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

document.getElementById('cart-count').textContent = cantidad;



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



  
