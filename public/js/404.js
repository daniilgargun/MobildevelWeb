document.addEventListener('DOMContentLoaded', () => {
    const phoneScreen = document.querySelector('.phone-screen');
    const glitchEffect = document.querySelector('.glitch-effect');
    const brokenText = document.querySelector('.broken-text');
    const error404Section = document.querySelector('.error-404-section');

    // Анимация текста на экране телефона
    const brokenMessages = [
        "ОШИБКА 404\nСТРАНИЦА НЕ НАЙДЕНА",
        "// ...\nError: 404\nPage not found",
        "FATAL ERROR\nACCESS DENIED",
        "NULL POINTER\nEXCEPTION",
        "REBOOT REQUIRED\n(BUT WON'T HELP)"
    ];
    let messageIndex = 0;

    function updateBrokenText() {
        brokenText.textContent = brokenMessages[messageIndex];
        messageIndex = (messageIndex + 1) % brokenMessages.length;
    }

    // Изначально показываем эффект "глюка" и текст ошибки
    if (glitchEffect && brokenText && error404Section) {
        glitchEffect.style.opacity = 0.6; // Делаем эффект видимым
        updateBrokenText(); // Показываем первый текст
        setInterval(updateBrokenText, 2000); // Обновляем текст каждые 2 секунды

        // Запускаем анимации CSS через небольшую задержку
        setTimeout(() => {
            error404Section.style.opacity = '1';
            error404Section.style.transform = 'translateY(0)';
        }, 100); // Небольшая задержка для плавного появления
    }

    // Убираем шапку и подвал на 404 странице
    const siteHeader = document.querySelector('.site-header');
    const siteFooter = document.querySelector('.site-footer');
    const mainContent = document.querySelector('.main-content');

    if (siteHeader) {
        siteHeader.style.display = 'none';
    }
    if (siteFooter) {
        siteFooter.style.display = 'none';
    }
    if (mainContent) {
        mainContent.style.flexGrow = '0';
        mainContent.style.padding = '0';
    }
}); 