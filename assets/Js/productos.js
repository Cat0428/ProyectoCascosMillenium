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



// // Obtener referencia al botón de pagar
// const botonPagar = document.getElementById("pagar");

// // Evento para redirigir a la página de resumen
// botonPagar.addEventListener("click", () => {
//     if (carrito.length === 0) {
//         alert("Tu carrito está vacío. Agrega productos antes de continuar.");
//         return;
//     }
//     // Redirige al usuario a la página de resumen
//     window.location.href = "http://127.0.0.1:5500/paypal.html";
// });


// Obtener el parámetro 'marca' de la URL


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