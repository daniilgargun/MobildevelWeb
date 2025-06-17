document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            // Здесь можно добавить логику для реальной отправки данных на сервер,
            // например, с использованием Fetch API.
            // В данном случае, мы просто имитируем успешную отправку.

            formStatus.textContent = 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
            formStatus.style.color = 'var(--neon-blue)';
            contactForm.reset(); // Очищаем поля формы

            // Можно также добавить скрытие сообщения через несколько секунд
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }
}); 