document.addEventListener("DOMContentLoaded", function () {
    function animateCounter(id, target) {
        let counter = document.getElementById(id);
        let count = 0;
        let speed = Math.floor(target / 100);
        
        let interval = setInterval(() => {
            count += speed;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            counter.innerText = count;
        }, 20);
    }

    animateCounter("soldCount", 150);
    animateCounter("clientsCount", 300);
});
