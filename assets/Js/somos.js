// Efectos de aparición con ScrollReveal
ScrollReveal().reveal('.section-text', { delay: 300, distance: '50px', origin: 'bottom' });

// Contadores animados
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    let target = +counter.getAttribute('data-target');
    let count = 0;
    let interval = setInterval(() => {
        count += 5;
        counter.innerText = count;
        if (count >= target) clearInterval(interval);
    }, 50);
});

// Evitar que los botones queden "seleccionados" después de hacer clic
document.querySelectorAll('.menu-header-section a').forEach(button => {
    button.addEventListener('click', function() {
        setTimeout(() => {
            this.blur(); // Quita el estado de foco después del clic
        }, 200);
    });
});


// Botón para mostrar más información
document.getElementById("toggle-info").addEventListener("click", function() {
    let info = document.getElementById("extra-info");
    info.style.display = (info.style.display === "none") ? "block" : "none";
});
