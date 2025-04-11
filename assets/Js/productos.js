//variables

const botonesCoomprar = document.querySelectorAll('.btn-comprar');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
let total = 0;

//Funcion para agregar al carrito

botonesCoomprar.forEach((boton) =>{
    boton.addEventListener('click', () => {
        const nombreProducto = boton.parentElement.querySelector('h3').textContent;
        const precioProducto = parseInt(boton.getAttribute('data-precio'));

        //crear un elemento de lista para el carrito

        const itemCarrito = document.createElement('li');
        itemCarrito.textContent = `${nombreProducto} - $${precioProducto}`;
        listaCarrito.appendChild(itemCarrito);

        //actualizar el total
        total += precioProducto;
        totalCarrito.textContent = total.toLocaleString();

    });

    document.addEventListener('DOMContentLoaded', function(){
        //obtener el ID del producto desde la url
        const hash = window.location.hash;
        if (hash){
            const elemento = document.querySelector(hash);
            //desplazar suavemente hacia el elmento 
    
            if(elemento){
                elemento.scrollIntoView({behavior: 'smooth', block: 'center'});
    
                //resaltar temporalmente el producto
                elemento.classList.add('resaltado');
                setTimeout(() => {
                    elemento.classList.remove('resaltado');
                }, 4000);//duracion del efecto en milisegundos
    
           
            }
        }
    });
});



const params = new URLSearchParams(window.location.search);
const marcaSeleccionada = params.get("marca");

console.log("Marca seleccionada en productos.html:", marcaSeleccionada);


document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const marcaSeleccionada = params.get("marca");

    console.log("Marca seleccionada en productos.html:", marcaSeleccionada);

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

const minPrice = 390000;
const maxPrice = 510000;

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

//-------------- LUPA HEADER

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