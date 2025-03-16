
let currentSlideText = 0;

const imageSlides = document.querySelectorAll('.carousel-item-text');
const textSlides = document.querySelectorAll('.text-slide');
const totalSlidesText = imageSlides.length;

document.getElementById('next-text').addEventListener('click', () => {
    currentSlideText = (currentSlideText + 1) % totalSlidesText;
    updateCarouselText();
});

document.getElementById('prev-text').addEventListener('click', () => {
    currentSlideText = (currentSlideText - 1 + totalSlidesText) % totalSlidesText;
    updateCarouselText();
});

function updateCarouselText() {
    const offset = currentSlideText * -100;


    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;


    textSlides.forEach((text, index) => {
        text.classList.toggle('active', index === currentSlideText);
    });
}

updateCarouselText();
