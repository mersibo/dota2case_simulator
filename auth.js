import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification
  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
  import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
  import { auth, db } from "./firebase-init.js";
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function getAuthErrorMessage(error) {
    switch(error.code) {
      case 'auth/email-already-in-use':
        return 'Этот email уже зарегистрирован';
      case 'auth/invalid-email':
        return 'Неверный формат email';
      case 'auth/weak-password':
        return 'Пароль должен содержать минимум 6 символов';
      case 'auth/user-not-found':
        return 'Пользователь не найден';
      case 'auth/wrong-password':
        return 'Неверный пароль';
      case 'auth/operation-not-allowed':
        return 'Регистрация временно недоступна';
      default:
        return 'Произошла ошибка. Пожалуйста, попробуйте позже';
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    
    document.getElementById("switchToRegister").addEventListener("click", function(e) {
      e.preventDefault();
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      document.getElementById("authTitle").textContent = "Регистрация";
    });
  
    document.getElementById("switchToLogin").addEventListener("click", function(e) {
      e.preventDefault();
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      document.getElementById("authTitle").textContent = "Вход";
    });
  
    registerForm.addEventListener("submit", async function(e) {
      e.preventDefault();
  
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      if (!username || username.length < 3) {
        alert("Имя пользователя должно содержать минимум 3 символа");
        return;
      }
  
      if (!isValidEmail(email)) {
        alert("Введите корректный email");
        return;
      }
  
      if (password.length < 6) {
        alert("Пароль должен содержать минимум 6 символов");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        await sendEmailVerification(userCredential.user);
        
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
          email: email,
          balance: 3000,
          createdAt: new Date(),
          emailVerified: false
        });
  
        localStorage.setItem("currentUser", JSON.stringify({
          uid: userCredential.user.uid,
          username: username,
          balance: 3000,
          emailVerified: false
        }));
  
        alert(`Регистрация успешна! На ${email} отправлено письмо для подтверждения.`);
        window.location.href = "cases.html";
      } catch (error) {
        console.error("Ошибка регистрации:", error);
        alert(getAuthErrorMessage(error));
      }
    });
  
    loginForm.addEventListener("submit", async function(e) {
      e.preventDefault();
  
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
  
      if (!isValidEmail(email)) {
        alert("Введите корректный email");
        return;
      }
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        
        if (!userDoc.exists()) {
          throw new Error("Данные пользователя не найдены");
        }

        const userData = userDoc.data();
        await setDoc(doc(db, "leaderboard", userCredential.user.uid), {
            username: userData.username,
            uid: userCredential.user.uid,
            timestamp: new Date()
        }, { merge: true });

        localStorage.setItem("currentUser", JSON.stringify({
          uid: userCredential.user.uid,
          username: userDoc.data().username,
          balance: userDoc.data().balance,
          emailVerified: userCredential.user.emailVerified
        }));

        if (!userCredential.user.emailVerified) {
          alert(`Добро пожаловать, ${userDoc.data().username}! Пожалуйста, подтвердите ваш email.`);
        } else {
          alert(`Добро пожаловать, ${userDoc.data().username}!`);
        }
        
        window.location.href = "cases.html";
      } catch (error) {
        console.error("Ошибка входа:", error);
        alert(getAuthErrorMessage(error));
      }
    });
  });