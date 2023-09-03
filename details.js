// Obtén el ID del evento de los parámetros de la URL
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const eventId = params.eventId;

// Encuentra el evento correspondiente en los datos
const event = data.events.find((event) => event._id === eventId);

// Función para mostrar los detalles del evento
function displayEventDetails(event) {
  const eventDetailsContainer = document.getElementById("event-details");

  // Verifica si el evento existe
  if (!event) {
    eventDetailsContainer.innerHTML = "<p>Evento no encontrado.</p>";
    return;
  }

  // Crea el contenido HTML para mostrar los detalles del evento
  const eventDetailsHTML = `
    <div class="card">
        <img src="${event.image}" class="card-img-top" alt="Event Image">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">Fecha: ${event.date}</p>
            <p class="card-text">Descripción: ${event.description}</p>
            <p class="card-text">Categoría: ${event.category}</p>
            <p class="card-text">Lugar: ${event.place}</p>
            <p class="card-text">Capacidad: ${event.capacity}</p>
            <p class="card-text">Precio: $${event.price}</p>
        </div>
    </div>
  `;

  // Agrega el contenido al contenedor
  eventDetailsContainer.innerHTML = eventDetailsHTML;
}

// Llama a la función para mostrar los detalles del evento
displayEventDetails(event);