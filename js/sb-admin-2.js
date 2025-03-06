src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.5/main.min.js"
(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict
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

