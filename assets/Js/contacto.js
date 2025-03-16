// Inicia el movimiento automático
setInterval(moveSlider, 3000);

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar todas las imágenes del collage
    const images = document.querySelectorAll(".collage-image");

    // Añadir evento de carga para cada imagen
    images.forEach((img) => {
        img.addEventListener("load", () => {
            // Cuando se cargue, añadir la clase 'loaded' para activar la animación
            img.classList.add("loaded");
        });

        // Si la imagen ya está en caché (caso de recarga rápida)
        if (img.complete) {
            img.classList.add("loaded");
        }
    });
});
