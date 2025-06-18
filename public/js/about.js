document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.team-carousel-track');
    const slides = Array.from(carouselTrack.children);
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.carousel-dots');

    let slideWidth = slides[0].offsetWidth; // Initial slide width
    let currentIndex = 0;

    // Создание точек (dots) без дублирования
    function createDots() {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    createDots();
    let dots = Array.from(dotsContainer.children);

    const updateSlideWidth = () => {
        if (slides.length > 0) {
            slideWidth = carouselTrack.offsetWidth; // ширина трека = ширина контейнера
            slides.forEach(slide => {
                slide.style.width = `${slideWidth}px`;
            });
            moveToSlide(currentIndex); // Recalculate position on resize
        }
    };

    const moveToSlide = (index) => {
        carouselTrack.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
        updateDots();
    };

    const updateDots = () => {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    };

    // Handle resize to adjust slide width dynamically
    window.addEventListener('resize', () => {
        updateSlideWidth();
        // currentIndex не должен выходить за пределы
        if (currentIndex >= slides.length) {
            currentIndex = slides.length - 1;
            moveToSlide(currentIndex);
        }
    });

    prevButton.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1; // Loop to end
        }
        moveToSlide(newIndex);
    });

    nextButton.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0; // Loop to start
        }
        moveToSlide(newIndex);
    });

    // Initial setup
    updateSlideWidth();
    moveToSlide(0);
}); 