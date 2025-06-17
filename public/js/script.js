// JavaScript для интерактивности (пока пустой)

document.addEventListener('DOMContentLoaded', () => {
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileMenuWrapper.classList.toggle('active');
    });

    // Анимация появления секций на странице "О нас"
    const aboutSections = document.querySelectorAll('.about-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 /* Порог видимости 10% */
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1'; /* Сделать видимым */
                entry.target.style.transform = 'translateY(0)'; /* Вернуть на место */
                entry.target.style.animationPlayState = 'running'; /* Запустить анимацию */
                observer.unobserve(entry.target); // Прекратить наблюдение после появления
            }
        });
    }, observerOptions);

    aboutSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Логика для карусели команды на странице "О нас"
    const teamCarouselTrack = document.querySelector('.team-carousel-track');
    const teamMemberSlides = document.querySelectorAll('.team-member-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const carouselDotsContainer = document.querySelector('.carousel-dots');

    if (teamCarouselTrack && teamMemberSlides.length > 0) {
        let currentIndex = 0;
        const slideWidth = teamMemberSlides[0].offsetWidth;

        // Создаем точки навигации
        teamMemberSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
            carouselDotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carousel-dots .dot');

        function moveToSlide(index) {
            if (index < 0) {
                index = teamMemberSlides.length - 1;
            } else if (index >= teamMemberSlides.length) {
                index = 0;
            }
            currentIndex = index;
            teamCarouselTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            updateDots();
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });

        // Обновление ширины слайда при изменении размера окна
        window.addEventListener('resize', () => {
            const newSlideWidth = teamMemberSlides[0].offsetWidth;
            teamCarouselTrack.style.transform = `translateX(${-currentIndex * newSlideWidth}px)`;
        });
    }
}); 