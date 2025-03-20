document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".btn-comprar"); // Botones de compra
    const counter = document.getElementById("soldCount"); // Contador en "Quiénes Somos"

    // Obtener el número de cascos vendidos desde localStorage (o 0 si es la primera vez)
    let cascosVendidos = localStorage.getItem("cascosVendidos") || 0;
    counter.innerText = cascosVendidos; // Mostrar el número al cargar la página

    // Evento de compra
    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            cascosVendidos++; // Aumenta la cantidad
            localStorage.setItem("cascosVendidos", cascosVendidos); // Guarda en localStorage
            counter.innerText = cascosVendidos; // Actualiza el contador en la interfaz
        });
    });
});
