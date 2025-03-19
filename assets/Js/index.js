

const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.item-productos-section');
const itemWidth = sliderItems[0].offsetWidth; // Ancho de un elemento
let currentIndex = 0;

// Clonamos los elementos al principio y al final para el efecto de bucle
sliderTrack.innerHTML += sliderTrack.innerHTML; // Duplicamos los elementos
const totalItems = sliderTrack.children.length; // Nuevo número total de elementos

// Ajustar el ancho total de la pista para soportar los elementos duplicados
sliderTrack.style.width = `${totalItems * itemWidth}px`;

// Configurar el slider infinito
function moveSlider() {
    currentIndex++;
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    sliderTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

    // Cuando llegamos al final, reiniciamos sin transición
    if (currentIndex >= totalItems / 2) {
        setTimeout(() => {
            sliderTrack.style.transition = 'none';
            currentIndex = 0;
            sliderTrack.style.transform = `translateX(0px)`;
        }, 500); // Coincide con la duración de la transición
    }
}

// Inicia el movimiento automático
setInterval(moveSlider, 3000);

// Obtener los elementos del DOM
const colorInput = document.getElementById('color');
const tamañoSelect = document.getElementById('tamaño');
const diseñoSelect = document.getElementById('diseño');
const materialSelect = document.getElementById('material');
const viseraSelect = document.getElementById('visera');
const estiloSelect = document.getElementById('estilo');
const cascoPreview = document.getElementById('casco-preview');

// Función para actualizar la imagen de vista previa del casco
function actualizarVistaPrevia() {
    // Obtener el valor del estilo seleccionado
    const estilo = estiloSelect.value;
    // Actualizar la imagen del casco según el estilo
    cascoPreview.src = `/assets/img/casco-${estilo}.jpg`; // Asegúrate de que las imágenes estén nombradas correctamente
}

// Función para actualizar el color del casco
function actualizarColor() {
    const color = colorInput.value;
    cascoPreview.style.backgroundColor = color;
}

// Función para aplicar los cambios en tiempo real
function aplicarCambios() {
    // Actualizar los cambios cada vez que el usuario interactúe con los controles
    actualizarVistaPrevia();
    actualizarColor();
}

// Escuchar cambios en las selecciones y entradas
colorInput.addEventListener('input', aplicarCambios);
tamañoSelect.addEventListener('change', aplicarCambios);
diseñoSelect.addEventListener('change', aplicarCambios);
materialSelect.addEventListener('change', aplicarCambios);
viseraSelect.addEventListener('change', aplicarCambios);
estiloSelect.addEventListener('change', aplicarCambios);

// Inicializar la vista previa con las selecciones predeterminadas
document.addEventListener('DOMContentLoaded', () => {
    aplicarCambios();
});

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
