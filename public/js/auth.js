document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('auth-button');
    const loginModalOverlay = document.querySelector('.login-modal-overlay');
    const closeModalButton = document.querySelector('.close-modal-button');
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const registerForm = document.querySelector('.register-form');
    const regUsernameInput = document.getElementById('reg-username');
    const regEmailInput = document.getElementById('reg-email');
    const regPasswordInput = document.getElementById('reg-password');
    const regConfirmPasswordInput = document.getElementById('reg-confirm-password');
    const regUsernameError = document.getElementById('reg-username-error');
    const regEmailError = document.getElementById('reg-email-error');
    const regPasswordError = document.getElementById('reg-password-error');
    const regConfirmPasswordError = document.getElementById('reg-confirm-password-error');
    const passwordStrength = document.getElementById('password-strength');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Элементы для окна подтверждения выхода
    const logoutModalOverlay = document.querySelector('.logout-modal-overlay');
    const confirmLogoutButton = document.querySelector('.confirm-logout-button');
    const cancelLogoutButton = document.querySelector('.cancel-logout-button');

    // Функция для очистки всех сообщений об ошибках
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(el => el.textContent = '');
        const inputs = document.querySelectorAll('.input-group input');
        inputs.forEach(input => input.classList.remove('error'));
    }

    // Функция для отображения сообщения об ошибке
    function showError(element, message) {
        element.textContent = message;
        // Находим родительский input-group и добавляем класс error к инпуту
        const inputElement = element.previousElementSibling;
        if (inputElement && inputElement.tagName === 'INPUT') {
            inputElement.classList.add('error');
        } else {
            // Если предыдущий элемент не инпут, ищем инпут внутри password-input-wrapper
            const parentWrapper = element.closest('.password-input-wrapper');
            if (parentWrapper) {
                const inputInWrapper = parentWrapper.querySelector('input');
                if (inputInWrapper) {
                    inputInWrapper.classList.add('error');
                }
            }
        }
    }

    // Переключение видимости пароля
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            button.textContent = (type === 'password') ? '👁️' : '🔒';
        });
    });

    // Проверка сложности пароля
    function checkPasswordStrength(password) {
        let strength = 0;
        const messages = [];

        if (password.length >= 8) {
            strength++;
        } else {
            messages.push('Не менее 8 символов');
        }
        if (password.match(/[a-z]/)) strength++;
        else messages.push('строчные буквы');
        if (password.match(/[A-Z]/)) strength++;
        else messages.push('заглавные буквы');
        if (password.match(/[0-9]/)) strength++;
        else messages.push('цифры');
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        else messages.push('спецсимволы');

        let strengthText = '';
        let strengthClass = '';

        if (password.length === 0) {
            strengthText = '';
            strengthClass = '';
        } else if (strength < 3) {
            strengthText = `Слабый: ${messages.join(', ')}`;
            strengthClass = 'weak';
        } else if (strength === 3) {
            strengthText = `Средний`;
            strengthClass = 'medium';
        } else {
            strengthText = `Сильный`;
            strengthClass = 'strong';
        }

        passwordStrength.textContent = strengthText;
        passwordStrength.className = 'password-strength ' + strengthClass;
        return strengthText; // Возвращаем текст для валидации
    }

    // Локальное хранение пользователя
    function saveUserToLocalStorage(username) {
        localStorage.setItem('loggedInUser', username);
        updateAuthButton(username);
    }

    function removeUserFromLocalStorage() {
        localStorage.removeItem('loggedInUser');
        updateAuthButton(null);
    }

    function getLoggedInUser() {
        return localStorage.getItem('loggedInUser');
    }

    // Обновление кнопки входа/выхода
    function updateAuthButton(username) {
        if (username) {
            loginButton.textContent = username;
            loginButton.setAttribute('data-logged-in', 'true');
            loginButton.removeEventListener('click', openLoginModal);
            loginButton.addEventListener('click', openLogoutModal);
        } else {
            loginButton.textContent = 'Войти';
            loginButton.setAttribute('data-logged-in', 'false');
            loginButton.removeEventListener('click', openLogoutModal);
            loginButton.addEventListener('click', openLoginModal);
        }
    }

    // Инициализация состояния кнопки при загрузке страницы
    const currentUser = getLoggedInUser();
    if (currentUser) {
        updateAuthButton(currentUser);
    } else {
        updateAuthButton(null); // Убедимся, что кнопка отображается как "Войти"
    }

    function openLoginModal() {
        loginModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Запретить прокрутку страницы
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        clearErrors();
        loginForm.reset();
        registerForm.reset();
        passwordStrength.textContent = '';
        passwordStrength.className = 'password-strength';
    }

    function closeLoginModal() {
        loginModalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Разрешить прокрутку страницы
        clearErrors();
        loginForm.reset();
        registerForm.reset();
        passwordStrength.textContent = '';
        passwordStrength.className = 'password-strength';
    }

    function openLogoutModal() {
        logoutModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Запретить прокрутку страницы
    }

    function closeLogoutModal() {
        logoutModalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Разрешить прокрутку страницы
    }

    // Обработчик ввода пароля для проверки сложности
    if (regPasswordInput) {
        regPasswordInput.addEventListener('input', (e) => {
            checkPasswordStrength(e.target.value);
            regPasswordError.textContent = ''; // Очистка ошибки при наборе
        });
    }

    // Валидация формы входа
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            let isValid = true;
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === '') {
                showError(usernameError, 'Имя пользователя не может быть пустым');
                isValid = false;
            }

            if (password === '') {
                showError(passwordError, 'Пароль не может быть пустым');
                isValid = false;
            }

            // Имитация проверки пользователя (для примера)
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
            if (isValid) {
                if (registeredUsers[username] && registeredUsers[username].password === password) {
                    saveUserToLocalStorage(username);
                    alert(`Добро пожаловать, ${username}!`);
                    closeLoginModal();
                } else {
                    showError(usernameError, 'Неверное имя пользователя или пароль');
                    showError(passwordError, 'Неверное имя пользователя или пароль');
                    isValid = false;
                }
            }
        });
    }

    // Валидация формы регистрации
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            let isValid = true;
            const regUsername = regUsernameInput.value.trim();
            const regEmail = regEmailInput.value.trim();
            const regPassword = regPasswordInput.value;
            const regConfirmPassword = regConfirmPasswordInput.value;

            if (regUsername === '') {
                showError(regUsernameError, 'Имя пользователя не может быть пустым');
                isValid = false;
            } else {
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
                if (registeredUsers[regUsername]) {
                    showError(regUsernameError, 'Это имя пользователя уже занято');
                    isValid = false;
                }
            }

            if (regEmail === '') {
                showError(regEmailError, 'Email не может быть пустым');
                isValid = false;
            } else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(regEmail)) {
                showError(regEmailError, 'Введите корректный Email');
                isValid = false;
            }

            if (regPassword === '') {
                showError(regPasswordError, 'Пароль не может быть пустым');
                isValid = false;
            } else {
                const strengthText = checkPasswordStrength(regPassword);
                if (strengthText.includes('Слабый')) {
                    showError(regPasswordError, 'Пароль слишком слабый');
                    isValid = false;
                }
            }

            if (regConfirmPassword === '') {
                showError(regConfirmPasswordError, 'Подтвердите пароль');
                isValid = false;
            } else if (regPassword !== regConfirmPassword) {
                showError(regConfirmPasswordError, 'Пароли не совпадают');
                isValid = false;
            }

            if (isValid) {
                // Сохранение пользователя в локальное хранилище
                let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
                registeredUsers[regUsername] = {
                    email: regEmail,
                    password: regPassword
                };
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

                saveUserToLocalStorage(regUsername);
                alert('Регистрация прошла успешно!');
                closeLoginModal();
            }
        });
    }

    // Открытие модального окна входа
    if (loginButton && loginButton.getAttribute('data-logged-in') === 'false') {
        loginButton.addEventListener('click', openLoginModal);
    }

    // Закрытие модального окна входа по кнопке или клику на оверлей
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeLoginModal);
    }
    if (loginModalOverlay) {
        loginModalOverlay.addEventListener('click', (e) => {
            if (e.target === loginModalOverlay) {
                closeLoginModal();
            }
        });
    }

    // Переключение форм
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            clearErrors();
            passwordStrength.textContent = '';
            passwordStrength.className = 'password-strength';
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            clearErrors();
            passwordStrength.textContent = '';
            passwordStrength.className = 'password-strength';
        });
    }

    // Логика для окна подтверждения выхода
    if (confirmLogoutButton) {
        confirmLogoutButton.addEventListener('click', () => {
            removeUserFromLocalStorage();
            alert('Вы вышли из аккаунта.');
            closeLogoutModal();
        });
    }

    if (cancelLogoutButton) {
        cancelLogoutButton.addEventListener('click', () => {
            closeLogoutModal();
        });
    }

    if (logoutModalOverlay) {
        logoutModalOverlay.addEventListener('click', (e) => {
            if (e.target === logoutModalOverlay) {
                closeLogoutModal();
            }
        });
    }
}); 