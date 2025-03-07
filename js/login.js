document.addEventListener("DOMContentLoaded", function () {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Registro de Usuario
    let registerBtn = document.getElementById("register-btn");
    if (registerBtn) {
        registerBtn.addEventListener("click", function () {
            let email = document.getElementById("register-email").value;
            let password = document.getElementById("register-password").value;
            let role = document.getElementById("register-role").value;

            if (email && password) {
                let usuarioExistente = usuarios.find(u => u.email === email);
                if (!usuarioExistente) {
                    usuarios.push({ email, password, role });
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
                } else {
                    alert("Este correo ya está registrado.");
                }
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

    // Inicio de Sesión
    let loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            let email = document.getElementById("login-email").value;
            let password = document.getElementById("login-password").value;

            let usuario = usuarios.find(u => u.email === email && u.password === password);
            if (usuario) {
                sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
                mostrarPanelUsuario(usuario);
            } else {
                alert("Credenciales incorrectas.");
            }
        });
    }

    // Cerrar Sesión
    let logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("usuarioActivo");
            location.reload();
        });
    }

    // Mostrar Panel de Usuario
    function mostrarPanelUsuario(usuario) {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("registro-form").style.display = "none";
        document.getElementById("user-panel").style.display = "block";
        document.getElementById("user-email").textContent = usuario.email;
        document.getElementById("user-role").textContent = "Rol: " + usuario.role;

        if (usuario.role === "estudiante") {
            document.getElementById("estudiante-section").style.display = "block";
            document.getElementById("tutor-section").style.display = "none";
        } else {
            document.getElementById("estudiante-section").style.display = "none";
            document.getElementById("tutor-section").style.display = "block";
        }
    }

    // Mostrar Formulario de Login si No Hay Usuario Activo
    function mostrarLogin() {
        document.getElementById("login-form").style.display = "block";
        document.getElementById("registro-form").style.display = "block";
        document.getElementById("user-panel").style.display = "none";
    }

    // Verificar si hay un usuario activo al cargar la página
    let usuarioActivo = sessionStorage.getItem("usuarioActivo");
    if (usuarioActivo) {
        mostrarPanelUsuario(JSON.parse(usuarioActivo));
    }
});
