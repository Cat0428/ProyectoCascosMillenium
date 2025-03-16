// Inicializar el canvas de Fabric.js
const canvas = new fabric.Canvas('canvas');

// Cargar la imagen base de casco
let cascoImage = new fabric.Image.fromURL('/assets/img/casco-simple.jpg', function(img) {
    img.scaleToWidth(300);
    img.scaleToHeight(300);
    canvas.add(img); // Añadir la imagen al lienzo
});

// Función para actualizar la imagen según el diseño seleccionado
function updateImage() {
    const selectedDesign = document.getElementById('diseño').value;
    const selectedColor = document.getElementById('color').value;
    const selectedSize = document.getElementById('tamaño').value;
    const selectedMaterial = document.getElementById('material').value;
    const selectedVisor = document.getElementById('visera').value;

    // Limpiar el canvas
    canvas.clear();

    let newImage = '/assets/img/casco-simple.jpg'; // Imagen por defecto

    // Seleccionar el diseño según la opción elegida
    switch (selectedDesign) {
        case 'deportivo':
            newImage = '/assets/img/casco-deportivo.jpg';
            break;
        case 'retro':
            newImage = '/assets/img/casco-retro.jpg';
            break;
        default:
            newImage = '/assets/img/casco-simple.jpg';
            break;
    }

    // Cargar la nueva imagen de acuerdo con el diseño
    fabric.Image.fromURL(newImage, function(img) {
        img.scaleToWidth(300);
        img.scaleToHeight(300);
        canvas.add(img);
    });

    // Aplicar color si el usuario lo seleccionó
    canvas.getObjects().forEach(obj => {
        if (obj instanceof fabric.Image) {
            obj.filters.push(new fabric.Image.filters.Tint({color: selectedColor, opacity: 0.5}));
            obj.applyFilters();
            canvas.renderAll();
        }
    });
}

// Eventos para actualizar la imagen cuando el usuario selecciona una opción
document.getElementById('diseño').addEventListener('change', updateImage);
document.getElementById('color').addEventListener('input', updateImage);
document.getElementById('tamaño').addEventListener('change', updateImage);
document.getElementById('material').addEventListener('change', updateImage);
document.getElementById('visera').addEventListener('change', updateImage);

// Evento para aplicar cambios
document.getElementById('applyChanges').addEventListener('click', () => {
    updateImage();  // Aplicar los cambios dinámicamente
    alert('Los cambios han sido aplicados.');
});

// Evento para guardar la configuración
document.getElementById('saveConfiguration').addEventListener('click', () => {
    const selectedDesign = document.getElementById('diseño').value;
    const selectedColor = document.getElementById('color').value;
    const selectedSize = document.getElementById('tamaño').value;
    const selectedMaterial = document.getElementById('material').value;
    const selectedVisor = document.getElementById('visera').value;

    const configuration = {
        diseño: selectedDesign,
        color: selectedColor,
        tamaño: selectedSize,
        material: selectedMaterial,
        visera: selectedVisor
    };

    // Convertir la configuración en un archivo JSON
    const jsonString = JSON.stringify(configuration);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'configuracion_casco.json';
    link.click();

    alert('Tu configuración ha sido guardada en un archivo JSON.');
});
