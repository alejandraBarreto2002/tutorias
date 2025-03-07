document.addEventListener("DOMContentLoaded", function () {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let registerForm = document.getElementById("registro-form");
    let loginForm = document.getElementById("login-form");
    let userPanel = document.getElementById("user-panel");
    let registerBtn = document.getElementById("register-btn");
    let loginBtn = document.getElementById("login-btn");
    let logoutBtn = document.getElementById("logout-btn");
    let mostrarLoginBtn = document.getElementById("mostrar-login");
    let mostrarRegistroBtn = document.getElementById("mostrar-registro");

    function mostrarFormulario(id) {
        registerForm.style.display = "none";
        loginForm.style.display = "none";
        userPanel.style.display = "none";

        let seccionMostrar = document.getElementById(id);
        if (seccionMostrar) {
            seccionMostrar.style.display = "block";
        }
    }

    // Mostrar solo el formulario de registro al inicio
    mostrarFormulario("registro-form");

    // Cambiar a Iniciar Sesión
    if (mostrarLoginBtn) {
        mostrarLoginBtn.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarFormulario("login-form");
        });
    }

    // Cambiar a Registro
    if (mostrarRegistroBtn) {
        mostrarRegistroBtn.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarFormulario("registro-form");
        });
    }

    // Registro de Usuario
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

                    // Ocultar registro y mostrar login
                    mostrarFormulario("login-form");
                } else {
                    alert("Este correo ya está registrado.");
                }
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

    // Inicio de Sesión
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
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("usuarioActivo");

            // Restaurar los formularios de inicio de sesión y registro
            document.getElementById("login-form").style.display = "block";
            document.getElementById("registro-form").style.display = "none"; // Solo mostrar el login por defecto

            // Ocultar panel de usuario
            document.getElementById("user-panel").style.display = "none";
            document.getElementById("estudiante-section").style.display = "none";
            document.getElementById("tutor-section").style.display = "none";

            logoutBtn.style.display = "none";
        });
    }

    function mostrarPanelUsuario(usuario) {
        let userPanel = document.getElementById("user-panel");
        let logoutBtn = document.getElementById("logout-btn");
        let estudianteSection = document.getElementById("estudiante-section");
        let tutorSection = document.getElementById("tutor-section");
        let loginForm = document.getElementById("login-form");
        let registroForm = document.getElementById("registro-form");

        // Ocultar los formularios de login y registro
        loginForm.style.display = "none";
        registroForm.style.display = "none";

        // Mostrar el panel de usuario
        userPanel.style.display = "block";
        document.getElementById("user-email").textContent = usuario.email;
        document.getElementById("user-role").textContent = "Rol: " + usuario.role;

        if (usuario.role === "estudiante") {
            estudianteSection.style.display = "block";
            tutorSection.style.display = "none";
        } else if (usuario.role === "tutor") {
            tutorSection.style.display = "block";
            estudianteSection.style.display = "none";
            cargarClasesTutor();
        }

        logoutBtn.style.display = "block";
    }

    // 🔹 AGREGAR CLASES PARA TUTORES
    let agregarClaseBtn = document.getElementById("agregar-clase");
    let listaClasesTutor = document.getElementById("clases-tutor");

    if (agregarClaseBtn) {
        agregarClaseBtn.addEventListener("click", function () {
            let nombreClase = prompt("Ingrese el nombre de la nueva clase:");
            if (nombreClase) {
                let clasesGuardadas = JSON.parse(localStorage.getItem("clases")) || [];
                clasesGuardadas.push(nombreClase);
                localStorage.setItem("clases", JSON.stringify(clasesGuardadas));

                agregarClaseLista(nombreClase);
            }
        });
    }

    function agregarClaseLista(nombreClase) {
        let nuevaClaseElemento = document.createElement("li");
        nuevaClaseElemento.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        nuevaClaseElemento.innerHTML = `
            <strong>${nombreClase}</strong>
            <button class="btn btn-success btn-sm reservar-clase">Reservar</button>
        `;

        listaClasesTutor.appendChild(nuevaClaseElemento);
    }

    function cargarClasesTutor() {
        let clasesGuardadas = JSON.parse(localStorage.getItem("clases")) || [];
        clasesGuardadas.forEach(clase => {
            agregarClaseLista(clase);
        });
    }

    let usuarioActivo = sessionStorage.getItem("usuarioActivo");
    if (usuarioActivo) {
        mostrarPanelUsuario(JSON.parse(usuarioActivo));
    }
});
