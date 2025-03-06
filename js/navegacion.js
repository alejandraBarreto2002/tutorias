document.addEventListener("DOMContentLoaded", function () {
    let mainContent = document.querySelector(".container-fluid");
    let sections = document.querySelectorAll(".seccion");

    // Función para mostrar la sección correcta
    function showSection(targetId) {
        sections.forEach(section => {
            section.style.display = "none"; // Oculta todas las secciones
        });

        let targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = "block"; // Muestra la sección seleccionada
        }

        // Ocultar el contenido principal solo si vamos a "contacto"
        if (targetId === "contacto") {
            mainContent.style.display = "none";
        } else {
            mainContent.style.display = "block";
        }
    }

    // Eventos para cada enlace del menú
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1); // Obtener ID sin #
            showSection(targetId);

            // Actualizar la URL sin recargar la página
            history.pushState(null, "", `#${targetId}`);
        });
    });

    // Manejo de recarga de página
    let initialSection = location.hash.substring(1) || "inicio";
    showSection(initialSection);

    // Manejar cambios en la URL cuando el usuario usa el botón "atrás" del navegador
    window.addEventListener("popstate", function () {
        let sectionFromHash = location.hash.substring(1) || "inicio";
        showSection(sectionFromHash);
    });
});
