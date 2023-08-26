
function filterPastEvents(events) {
    const currentDate = new Date(data.currentDate);
  
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < currentDate;
    });
  }
  
   function displayPastEvents(events) {
    const eventContainer = document.getElementById("event-container");
  
    events.forEach(event => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("col-12", "col-md-6", "col-lg-4");
  
      eventCard.innerHTML = `
        <div class="card">
          <img src="${event.image}" class="card-img-top" alt="Event Image">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.date}</p>
            <p class="card-text">${event.description}</p>
          </div>
        </div>
      `;
  
      eventContainer.appendChild(eventCard);
    });
  }
  

  document.addEventListener("DOMContentLoaded", () => {
    const pastEvents = filterPastEvents(data.events);
    displayPastEvents(pastEvents);
  });