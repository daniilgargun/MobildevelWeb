// public/js/project-detail.js

document.addEventListener('DOMContentLoaded', () => {
    // Дополнительная логика для страниц проектов может быть добавлена здесь.
    // Например, для обработки переходов между проектами с анимацией или для динамической загрузки контента.

    console.log('Project detail page loaded.');

    // Пример: плавный скролл к якорям, если они будут добавлены
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 