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
}); 