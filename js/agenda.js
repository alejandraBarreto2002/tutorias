
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var eventList = document.getElementById('event-list'); // Lista de reservas

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        events: JSON.parse(localStorage.getItem('reservations')) || [],

        // Evento al hacer clic en un día vacío
        dateClick: function (info) {
            let name = prompt("Ingrese su nombre para la tutoría:");
            if (name) {
                let tutor = prompt("Ingrese el nombre del tutor:");
                if (tutor) {
                    let time = prompt("Ingrese la hora (Ejemplo: 10:00 AM):");
                    if (time) {
                        let newEvent = {
                            id: Date.now().toString(), // Generar un ID único
                            title: `${name} - ${tutor} (${time})`,
                            start: info.dateStr
                        };
                        calendar.addEvent(newEvent);
                        agregarEventoALista(newEvent);
                        saveReservation(newEvent);
                    }
                }
            }
        },

        // Evento al hacer clic en una reserva para eliminarla
        eventClick: function (info) {
            if (confirm("¿Quieres cancelar esta tutoría?")) {
                info.event.remove();
                eliminarEventoDeLista(info.event.id);
                removeReservation(info.event);
            }
        }
    });

    calendar.render();
    cargarReservasGuardadas();

    // 🔹 Agregar eventos a la lista de reservas (lado derecho)
    function agregarEventoALista(event) {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${event.title} - ${event.start}`;
        li.setAttribute("data-id", event.id);

        // Agregar botón de eliminar
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        deleteBtn.onclick = function () {
            if (confirm("¿Seguro que deseas eliminar esta reserva?")) {
                eliminarEventoDeLista(event.id);
                removeReservation(event);
                let eventToRemove = calendar.getEventById(event.id);
                if (eventToRemove) {
                    eventToRemove.remove();
                }
            }
        };

        li.appendChild(deleteBtn);
        eventList.appendChild(li);
    }

    // 🔹 Eliminar eventos de la lista de reservas
    function eliminarEventoDeLista(eventId) {
        let items = eventList.querySelectorAll("li");
        items.forEach((item) => {
            if (item.getAttribute("data-id") === eventId) {
                item.remove();
            }
        });
    }

    // 🔹 Guardar en localStorage
    function saveReservation(event) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(event);
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }

    // 🔹 Eliminar reserva de localStorage
    function removeReservation(event) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations = reservations.filter(e => e.id !== event.id);
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }

    // 🔹 Cargar reservas guardadas en la lista de la derecha
    function cargarReservasGuardadas() {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.forEach(event => {
            agregarEventoALista(event);
        });
    }
});

