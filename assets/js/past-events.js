

const sortedEvents = data.events.sort((a, b) => new Date(a.date) - new Date(b.date));
const currentDate = new Date(data.currentDate);
const eventPast = data.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < currentDate;
    });
const eventUpcoming = data.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate > currentDate;
    });
  

if(document.title=="Amazing Events"){
    display(sortedEvents)
    
}else if(document.title=="Past - Amazing Events"){
    display(eventPast)

}else{
    display(eventUpcoming)
}

/*Trunco texto para que no rompa la card*/
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "";
    }
    return text;
}

function display(events) {
    const eventContainer = document.getElementById("event-container");

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("col-12", "col-md-6", "col-lg-4");

        eventCard.innerHTML = `
            <div class="card">
                <img src="${event.image}" class="card-img-top" alt="Event Image">
                <div class="card-body">
                    <h5 class="card-title text-center">${event.name}</h5>
                    <p class="card-text">Date: ${event.date}</p>
                    <p class="card-text-description">${truncateText(event.description, 30)}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="card-text">Price: $ ${event.price}</p>
                        <a href="../pages/details.html?_id=${event._id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
        `;

        eventContainer.appendChild(eventCard);
    });
}








// function filterAndDisplayEvents(searchTerm) {
//   const pastEvents = filterPastEvents(data.events);

//   if (!searchTerm) {

//     displayPastEvents(pastEvents);
//   } else {
 
//     const filteredEvents = pastEvents.filter(event => {
//       const description = event.description.toLowerCase();
//       const name = event.name.toLowerCase();
//       const category = event.category.toLowerCase();

//       return description.includes(searchTerm) || name.includes(searchTerm) || category.includes(searchTerm);
//     });

//     if (filteredEvents.length === 0) {
//       const eventContainer = document.getElementById("event-container");
//       eventContainer.innerHTML = ""; 

  
//       const noEventsImage = document.createElement("img");
//       noEventsImage.src = "../../assets/images/postponed.png";
//       noEventsImage.alt = "No se encontraron eventos";
//       eventContainer.appendChild(noEventsImage);
//     } else {
//       displayPastEvents(filteredEvents);
//     }
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   filterAndDisplayEvents(""); 

//   const searchForm = document.querySelector("form[role='search']");
//   searchForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const searchInput = document.querySelector("input[type='search']");
//     const searchTerm = searchInput.value.toLowerCase().trim();

//     filterAndDisplayEvents(searchTerm);
//   });
// });