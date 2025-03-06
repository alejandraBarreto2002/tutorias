document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("a[href='#contacto']").addEventListener("click", function (event) {
        event.preventDefault(); // Evita el comportamiento predeterminado

        // Oculta el contenido principal
        document.querySelector(".container-fluid").style.display = "none";

        // Muestra la sección de contacto
        document.getElementById("contacto").style.display = "block";
    });
});
