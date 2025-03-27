//------------------------INICIO SLIDER PORTADA----------------
let index = 0;
const imagesContainer = document.querySelector(".Seccion-imagenes");
const slides = document.querySelectorAll(".Seccion-imagenes img");
const totalSlides = slides.length;

// Ajusta el ancho dinámicamente según el número de imágenes
imagesContainer.style.width = `${totalSlides * 100}vw`;

function moveSlide(step) {
    index += step;

    if (index < 0) {
        index = totalSlides - 1; // Ir al final si va hacia atrás desde la primera
    } else if (index >= totalSlides) {
        index = 0; // Volver al inicio si va más allá del último
    }

    imagesContainer.style.transform = `translateX(${-index * 100}vw)`;
}

// Reiniciar el temporizador cuando el usuario navega manualmente
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => moveSlide(1), 5000);
}

// Eventos para los botones
document.querySelector(".Next").addEventListener("click", () => {
    moveSlide(1);
    resetAutoSlide();
});

document.querySelector(".previa").addEventListener("click", () => {
    moveSlide(-1);
    resetAutoSlide();
});

// Cambio automático cada 5 segundos
let autoSlide = setInterval(() => moveSlide(1), 5000);

//-------------------------- FIN SLIDER PORTADA ---------------------------

//----------------------- INICIO SLIDER CASCOS--------------------------
const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.item-productos-section');
const itemWidth = sliderItems[0].offsetWidth + 10; // Ancho del elemento con el margen
let currentIndex = 0;

// Clonamos los elementos para hacer el efecto infinito
sliderTrack.innerHTML += sliderTrack.innerHTML;
const totalItems = sliderTrack.children.length;

// Ajustamos el ancho del contenedor
sliderTrack.style.width = `${totalItems * itemWidth}px`;

// Mueve el slider de forma automática
function moveSlider() {
    currentIndex++;
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    sliderTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

    // Reinicio del slider al llegar al final
    if (currentIndex >= totalItems / 2) {
        setTimeout(() => {
            sliderTrack.style.transition = 'none';
            currentIndex = 0;
            sliderTrack.style.transform = `translateX(0px)`;
        }, 500);
    }
}


//----------------------- FIN SLIDER CASCOS--------------------------


//-------------------------- FILTRADO DE LOGOS--------------------
document.addEventListener("DOMContentLoaded", function () {
    const contenedorLogos = document.querySelector(".Seccion-logos");

    if (contenedorLogos) {
        contenedorLogos.addEventListener("click", function (event) {
            const logo = event.target.closest(".logo-brand");
            if (logo) {
                const marcaSeleccionada = logo.getAttribute("data-marca");
                console.log("Marca seleccionada:", marcaSeleccionada);
                filtrarCascosPorMarca(marcaSeleccionada);
            }
        });
    }

    function filtrarCascosPorMarca(marca) {
        console.log("Filtrando cascos de la marca:", marca);

        const productos = document.querySelectorAll(".producto");
        console.log("Productos encontrados:", productos.length);

        productos.forEach(producto => {
            const marcaProducto = producto.getAttribute("data-marca");
            console.log(`Producto: ${producto.id}, Marca: ${marcaProducto}`);

            if (marcaProducto === marca) {
                producto.style.display = "block";  // Mostrar
                console.log(`✅ Mostrando ${producto.id}`);
            } else {
                producto.style.display = "none";  // Ocultar
                console.log(`❌ Ocultando ${producto.id}`);
            }
        });
    }
});


document.querySelectorAll(".logo-brand").forEach(logo => {
    logo.addEventListener("click", function () {
        const marca = this.getAttribute("data-marca");
        console.log("Redirigiendo a productos.html con marca:", marca);
        window.location.href = `/Pages/productos.html?marca=${encodeURIComponent(marca)}`;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const marca = params.get("marca");

    if (marca) {
        console.log("Filtrando productos de la marca:", marca);
        filtrarCascosPorMarca(marca);
    }
});

function filtrarCascosPorMarca(marca) {
    const productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        const marcaProducto = producto.getAttribute("data-marca");

        if (marcaProducto === marca) {
            producto.style.display = "block";  // Mostrar solo los de la marca
        } else {
            producto.style.display = "none";  // Ocultar los demás
        }
    });
}

//------------------ FIN FILTRADO DE LOGOS---------------------