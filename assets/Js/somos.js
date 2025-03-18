// Variables globales
let soldCount = parseInt(localStorage.getItem("soldCount")) || 150;
let clientsCount = parseInt(localStorage.getItem("clientsCount")) || 300;

const soldCounter = document.getElementById("soldCount");
const clientsCounter = document.getElementById("clientsCount");
const buyButtons = document.querySelectorAll(".btn-comprar");

// Elementos del modal de satisfacción
const modalSatisfaccion = document.getElementById("modal-satisfaccion");
const btnSatisfecho = document.getElementById("btn-satisfecho");
const btnNoSatisfecho = document.getElementById("btn-no-satisfecho");

// Función para animar contadores
const animateCounter = (element, target) => {
    let start = parseInt(element.innerText) || 0;
    let increment = Math.ceil(target / 100);

    const update = () => {
        if (start < target) {
            start += increment;
            element.innerText = start;
            setTimeout(update, 30);
        } else {
            element.innerText = target;
        }
    };
    update();
};

// Mostrar valores guardados
soldCounter.innerText = soldCount;
clientsCounter.innerText = clientsCount;

// Evento de compra
buyButtons.forEach(button => {
    button.addEventListener("click", () => {
        soldCount++;

        // Guardar en localStorage
        localStorage.setItem("soldCount", soldCount);

        // Actualizar contador de ventas
        animateCounter(soldCounter, soldCount);

        // Mostrar el modal de satisfacción
        modalSatisfaccion.style.display = "flex";
    });
});

// Evento cuando el cliente está satisfecho
btnSatisfecho.addEventListener("click", () => {
    clientsCount++;

    // Guardar en localStorage
    localStorage.setItem("clientsCount", clientsCount);

    // Actualizar contador de clientes satisfechos
    animateCounter(clientsCounter, clientsCount);

    // Ocultar modal
    modalSatisfaccion.style.display = "none";
});

// Evento cuando el cliente no está satisfecho
btnNoSatisfecho.addEventListener("click", () => {
    alert("Lamentamos que no estés satisfecho. ¡Déjanos saber cómo podemos mejorar!");
    modalSatisfaccion.style.display = "none";
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener("click", (event) => {
    if (event.target === modalSatisfaccion) {
        modalSatisfaccion.style.display = "none";
    }
});
