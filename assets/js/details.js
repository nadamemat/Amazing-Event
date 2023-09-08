// console.log("El script de details.js se está ejecutando.");
// console.log(data.events)




// const eventDetailsContainer = document.getElementById('event-details');



// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const eventId = urlParams.get("eventId");

//   const event = data.events.find((event) => event._id === eventId);
//   console.log(event)





//   if (event) {
      
//       const mainElement = document.querySelector("main");
//       mainElement.innerHTML = `
//           <h1>${event.name}</h1>
//           <img src="${event.image}" alt="${event.name}">
//           <p>Date: ${event.date}</p>
//           <p>Description: ${event.description}</p>
          
//       `;
//   } else {
     
//       console.error("Evento no encontrado");
//   }
// });



function pintarCardsEnDetails(evento){
    let container = document.getElementById("exodia");
    let div = document.createElement("div");
    div.className = "card";
    div.style.maxWidth = "70%";
    div.style.minHeight = "20rem";
    div.style.padding = "0.5rem";
    div.innerHTML = `
    <img src="${evento.image}" class="card-img-top" alt="Event Image">
    <div class="card-body">
    <h5 class="card-title text-center">${evento.name}</h5>
    <p class="card-text">Description: ${evento.description}</p>
    <p class="card-text">Date: ${evento.date}</p>
    <p class="card-text">Category: ${evento.category}</p>
    <p class="card-text">Place: ${evento.place}</p>
    <p class="card-text">Capacity: ${evento.capacity}</p>
    <p class="card-text">Assistance: ${evento.assistance}</p>
    <p class="card-text">Price: ${evento.price}</p>
    </div>
    `
    container.appendChild(div);
}

if (document.title == "Details Amazing Events") {
    const queryString = location.search
    const params = new URLSearchParams(queryString);
    const id = params.get('_id');
    let arrayFiltrado = data.events.filter((evento) => evento._id == id)
    pintarCardsEnDetails(arrayFiltrado[0]);
}