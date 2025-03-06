document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var eventList = document.getElementById('event-list');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        events: [], // Aquí se cargarán las reservas

        // Evento al hacer clic en un día vacío
        dateClick: function(info) {
            let eventName = prompt("Introduce el nombre de la tutoría:");
            if (eventName) {
                let newEvent = {
                    title: eventName,
                    start: info.dateStr
                };
                calendar.addEvent(newEvent);
                agregarEventoALista(newEvent);
            }
        },

        // Evento al hacer clic en un evento para eliminarlo
        eventClick: function(info) {
            if (confirm("¿Quieres cancelar esta tutoría?")) {
                info.event.remove();
                eliminarEventoDeLista(info.event);
            }
        }
    });

    calendar.render();

    // Función para agregar eventos a la lista de la agenda
    function agregarEventoALista(event) {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${event.title} - ${event.start.toISOString().split('T')[0]}`;
        li.setAttribute("data-id", event.id);
        eventList.appendChild(li);
    }

    // Función para eliminar eventos de la lista
    function eliminarEventoDeLista(event) {
        let items = eventList.querySelectorAll("li");
        items.forEach((item) => {
            if (item.getAttribute("data-id") === event.id) {
                item.remove();
            }
        });
    }
});
