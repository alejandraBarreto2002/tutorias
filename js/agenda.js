document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos del DOM
    var calendarEl = document.getElementById('calendar');
    var eventList = document.getElementById('event-list'); // Lista de reservas

    // Inicializar el calendario
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Vista inicial (mes)
        selectable: true, // Permite seleccionar días
        editable: true, // Permite editar eventos
        events: JSON.parse(localStorage.getItem('reservations')) || [], // Cargar eventos guardados desde localStorage

        // Evento al hacer clic en un día vacío
        dateClick: function (info) {
            // Pedir al usuario los detalles para la nueva tutoría
            let name = prompt("Ingrese su nombre para la tutoría:");
            if (name) {
                let tutor = prompt("Ingrese el nombre del tutor:");
                if (tutor) {
                    let time = prompt("Ingrese la hora (Ejemplo: 10:00 AM):");
                    if (time) {
                        // Crear el nuevo evento
                        let newEvent = {
                            id: Date.now().toString(), // Generar un ID único
                            title: `${name} - ${tutor} (${time})`, // Título con los detalles de la tutoría
                            start: info.dateStr // Fecha de inicio
                        };

                        // Agregar evento al calendario
                        calendar.addEvent(newEvent);
                        // Agregar evento a la lista de reservas (derecha)
                        agregarEventoALista(newEvent);
                        // Guardar el evento en el almacenamiento local
                        saveReservation(newEvent);
                    }
                }
            }
        },

        // Evento al hacer clic en una reserva para eliminarla
        eventClick: function (info) {
            if (confirm("¿Quieres cancelar esta tutoría?")) {
                // Eliminar evento del calendario
                info.event.remove();
                // Eliminar evento de la lista de reservas
                eliminarEventoDeLista(info.event.id);
                // Eliminar evento de localStorage
                removeReservation(info.event);
            }
        }
    });

    // Renderizar el calendario
    calendar.render();

    // Cargar las reservas guardadas al iniciar la página
    cargarReservasGuardadas();

    // 🔹 Función para agregar un evento a la lista de reservas (lado derecho)
    function agregarEventoALista(event) {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${event.title} - ${event.start}`;
        li.setAttribute("data-id", event.id);

        // Crear un botón de eliminar para la reserva
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        deleteBtn.onclick = function () {
            if (confirm("¿Seguro que deseas eliminar esta reserva?")) {
                // Eliminar de la lista
                eliminarEventoDeLista(event.id);
                // Eliminar de localStorage
                removeReservation(event);
                // Eliminar del calendario
                let eventToRemove = calendar.getEventById(event.id);
                if (eventToRemove) {
                    eventToRemove.remove();
                }
            }
        };

        // Agregar el botón de eliminar al elemento de lista
        li.appendChild(deleteBtn);
        // Agregar el elemento de lista al contenedor de la lista de eventos
        eventList.appendChild(li);
    }

    // 🔹 Función para eliminar un evento de la lista de reservas
    function eliminarEventoDeLista(eventId) {
        let items = eventList.querySelectorAll("li");
        items.forEach((item) => {
            if (item.getAttribute("data-id") === eventId) {
                item.remove(); // Eliminar el item de la lista
            }
        });
    }

    // 🔹 Función para guardar un evento en localStorage
    function saveReservation(event) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || []; // Obtener reservas guardadas
        reservations.push(event); // Agregar el nuevo evento
        localStorage.setItem('reservations', JSON.stringify(reservations)); // Guardar de nuevo en localStorage
    }

    // 🔹 Función para eliminar una reserva de localStorage
    function removeReservation(event) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || []; // Obtener reservas guardadas
        reservations = reservations.filter(e => e.id !== event.id); // Filtrar el evento a eliminar
        localStorage.setItem('reservations', JSON.stringify(reservations)); // Guardar los cambios
    }

    // 🔹 Función para cargar las reservas guardadas en la lista (derecha)
    function cargarReservasGuardadas() {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || []; // Obtener reservas guardadas
        reservations.forEach(event => {
            agregarEventoALista(event); // Agregar cada evento a la lista de reservas
        });
    }
});
