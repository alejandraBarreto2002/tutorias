document.getElementById("agregar-testimonio").addEventListener("click", function () {
    let nuevoComentario = prompt("Escribe tu testimonio:");
    if (nuevoComentario) {
        let div = document.createElement("div");
        div.classList.add("testimonio");
        div.innerHTML = `<p>"${nuevoComentario}"</p><span>- Anónimo</span>`;
        document.getElementById("testimonios-container").appendChild(div);
    }
});
