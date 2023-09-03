console.log("El script de details.js se está ejecutando.");

const eventDetailsContainer = document.getElementById('event-details');



document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventId");

  const event = data.events.find((event) => event._id === eventId);
  console.log(event)





  if (event) {
      
      const mainElement = document.querySelector("main");
      mainElement.innerHTML = `
          <h1>${event.name}</h1>
          <img src="${event.image}" alt="${event.name}">
          <p>Date: ${event.date}</p>
          <p>Description: ${event.description}</p>
          
      `;
  } else {
     
      console.error("Evento no encontrado");
  }
});



