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
    cascoPreview.src = `assets/img/casco-${estilo}.jpg`; // Asegúrate de que las imágenes estén nombradas correctamente
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

