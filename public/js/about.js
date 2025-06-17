document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.team-carousel-track');
    const slides = Array.from(carouselTrack.children);
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.carousel-dots');

    let slideWidth = slides[0].offsetWidth; // Initial slide width
    let currentIndex = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const updateSlideWidth = () => {
        if (slides.length > 0) {
            slideWidth = slides[0].offsetWidth;
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
        // Adjust current index if it goes out of bounds on resize
        const visibleSlides = Math.round(carouselTrack.offsetWidth / slideWidth);
        if (currentIndex >= slides.length - visibleSlides + 1) {
            currentIndex = Math.max(0, slides.length - visibleSlides);
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
        const visibleSlides = Math.round(carouselTrack.offsetWidth / slideWidth);
        let newIndex = currentIndex + 1;
        if (newIndex > slides.length - visibleSlides) {
            newIndex = 0; // Loop to start
        }
        moveToSlide(newIndex);
    });

    // Initial setup
    updateSlideWidth();
    moveToSlide(0);
}); 