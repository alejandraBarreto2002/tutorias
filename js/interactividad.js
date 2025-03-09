// Esperar a que el documento cargue
document.addEventListener("DOMContentLoaded", function() {
    // Función para manejar la reserva de tutoría
    const btnReservar = document.querySelector("#servicios button");
    btnReservar.addEventListener("click", function() {
        alert("Gracias por tu interés. Próximamente habilitaremos la reserva en línea.");
    });

    // Función para resaltar artículos del blog al pasar el mouse
    const blogItems = document.querySelectorAll("#blog .col-md-6");
    blogItems.forEach(item => {
        item.addEventListener("mouseover", function() {
            this.style.backgroundColor = "#d4edda"; // Color verde claro
        });
        item.addEventListener("mouseout", function() {
            this.style.backgroundColor = "white";
        });
    });
});