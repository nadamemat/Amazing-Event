
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
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
                        <a href="./pages/details.html?eventId=${event._id}" class="btn btn-primary">Details</a>

                         
                      </div>
                   </div>
            </div>
        `;

        eventContainer.appendChild(eventCard);
    });
}
function redirectToEventDetails(eventId) {
    window.location.href = `details.html?eventId=${eventId}`;
}

const sortedEvents = data.events.sort((a, b) => new Date(a.date) - new Date(b.date));
display(sortedEvents);