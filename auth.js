document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const switchToRegister = document.getElementById("switchToRegister");
    const switchToLogin = document.getElementById("switchToLogin");
    const authTitle = document.getElementById("authTitle");


    switchToRegister.addEventListener("click", function (event) {
        event.preventDefault();
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        authTitle.innerText = "Регистрация";
    });

    switchToLogin.addEventListener("click", function (event) {
        event.preventDefault();
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        authTitle.innerText = "Вход";
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        

        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users") || "[]"); 

        if (!Array.isArray(users)) {
            console.warn("Данные в localStorage повреждены! Очистка...");
            users = [];
            localStorage.setItem("users", JSON.stringify(users));
        }

        if (users.some(user => user.email === email)) {
            alert("Такой e-mail уже зарегистрирован!");
            return;
        }

        users.push({ username, email, password, balance: 3000 });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Аккаунт создан! Теперь войдите.");
        registerForm.reset();
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        authTitle.innerText = "Вход";
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        let users = JSON.parse(localStorage.getItem("users") || "[]");

        if (!Array.isArray(users)) {
            console.warn("Ошибка: localStorage.users не массив! Очистка...");
            users = [];
            localStorage.setItem("users", JSON.stringify(users));
        }

        let user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            alert("Неверный e-mail или пароль!");
            return;
        }

        alert(`Добро пожаловать, ${user.username}! Ваш баланс: ${user.balance} монет.`);
        window.location.href = "cases.html"; 
    });
});

