document.addEventListener("DOMContentLoaded", function () {
    // Mostrar solo la sección de inicio al cargar la página
    mostrarSeccion("inicio");

    // Agregar eventos a los botones del menú
    document.querySelectorAll(".nav-link").forEach(function (enlace) {
        enlace.addEventListener("click", function (event) {
            event.preventDefault();
            const idSeccion = this.getAttribute("href").substring(1); // Obtiene el ID de la sección
            mostrarSeccion(idSeccion);
        });
    });

    function mostrarSeccion(id) {
        // Ocultar todas las secciones
        document.querySelectorAll(".container-fluid > div").forEach(function (seccion) {
            seccion.style.display = "none";
        });

        // Mostrar la sección seleccionada
        const seccionMostrada = document.getElementById(id);
        if (seccionMostrada) {
            seccionMostrada.style.display = "block";
        }
    }
});
