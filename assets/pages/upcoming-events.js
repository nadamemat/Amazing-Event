function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

function filterAndSortUpcomingEvents(events) {
  const currentDate = new Date(data.currentDate);

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate > currentDate;
  });

  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return upcomingEvents;
}

function displayUpcomingEvents(events) {
  const eventContainer = document.getElementById("event-container");
  eventContainer.innerHTML = ""; // Limpiar el contenedor antes de mostrar los eventos

  events.forEach(event => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("col-12", "col-md-6", "col-lg-4");

    eventCard.innerHTML = `
      <div class="card">
        <img src="${event.image}" class="card-img-top" alt="Event Image">
        <div class="card-body">
          <h5 class="card-title text-center">${event.name}</h5>
          <p class="card-text">${event.date}</p>
          <p class="card-text-description">${truncateText(event.description, 30)}</p>
          <div class="d-flex justify-content-between align-items-center">
            <p class="card-text">Price: $ ${event.price}</p>
            <a href="../../details.html?eventId=${event._id}" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>
    `;

    eventContainer.appendChild(eventCard);
  });
}

function displayNoEventsImage() {
  const eventContainer = document.getElementById("event-container");
  eventContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar la imagen

  
  const noEventsImage = document.createElement("img");
  noEventsImage.src = "../../assets/images/postponed.png";
  noEventsImage.alt = "No se encontraron eventos";
  eventContainer.appendChild(noEventsImage);
}

function searchAndFilterEvents(searchTerm) {
  const upcomingEvents = filterAndSortUpcomingEvents(data.events);
  const filteredEvents = upcomingEvents.filter(event => {
    const description = event.description.toLowerCase();
    const name = event.name.toLowerCase();
    const category = event.category.toLowerCase();

    return description.includes(searchTerm) || name.includes(searchTerm) || category.includes(searchTerm);
  });

  return filteredEvents;
}

function handleSearchFormSubmit(e) {
  e.preventDefault();
  const searchInput = document.querySelector("input[type='search']");
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredEvents = searchAndFilterEvents(searchTerm);
  const eventContainer = document.getElementById("event-container");
  eventContainer.innerHTML = "";

  if (filteredEvents.length === 0) {
    displayNoEventsImage();
  } else {
    displayUpcomingEvents(filteredEvents);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const upcomingEvents = filterAndSortUpcomingEvents(data.events);
  displayUpcomingEvents(upcomingEvents);

  const searchForm = document.querySelector("form[role='search']");
  searchForm.addEventListener("submit", handleSearchFormSubmit);
});