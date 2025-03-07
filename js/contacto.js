document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos todas las secciones y el contenido principal
    let mainContent = document.querySelector(".container-fluid");
    let contactSection = document.getElementById("contacto");

    // Función para ocultar todas las secciones y mostrar solo la seleccionada
    function showSection(targetId) {
        document.querySelectorAll(".seccion").forEach(section => {
            section.style.display = "none"; // Oculta todas las secciones
        });

        let targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = "block"; // Muestra solo la sección seleccionada
        }

        if (targetId === "contacto") {
            contactSection.style.display = "block"; 
        } else {
            contactSection.style.display = "none";
        }
    }

    // Evento para cuando se hace clic en "Contacto"
    document.querySelector("a[href='#contacto']").addEventListener("click", function (event) {
        event.preventDefault();
        showSection("contacto");
    });

    // Agregar eventos a todos los enlaces del menú
    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1); 
            showSection(targetId);
        });
    });

    // 🔹 Restaurar todo correctamente al recargar la página
    window.addEventListener("popstate", function () {
        let currentSection = location.hash.substring(1) || "inicio"; // Obtener la sección actual
        showSection(currentSection);
    });
});
