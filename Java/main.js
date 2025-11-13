// ==== LOGIN SIMULADO ====
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const clave = document.getElementById("clave").value;
        const mensajeError = document.getElementById("mensajeError");

        if (usuario === "admin" && clave === "1234") {
            localStorage.setItem("usuarioActivo", usuario);
            window.location.href = "menu.html"; // Redirige al menú tras login
        } else {
            mensajeError.textContent = "Usuario o contraseña incorrectos.";
        }
    });
}

// ==== CONTROL DE SESIÓN EN EL NAVBAR ====
document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    const loginLink = document.getElementById("login-link");

    if (loginLink) {
        if (usuarioActivo) {
            // Si el usuario está logueado
            loginLink.textContent = "Cerrar sesión";
            loginLink.href = "#";
            loginLink.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("usuarioActivo");
                window.location.href = "index.html";
            });
        } else {
            // Si no hay usuario logueado
            loginLink.textContent = "Login";
            loginLink.href = "login.html";
        }
    }
});
