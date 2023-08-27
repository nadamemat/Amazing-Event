
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
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.date}</p>
                    <p class="card-text-description">${truncateText(event.description, 30)}</p>
                    <a href="#" class="btn btn-primary">More info</a>
                </div>
            </div>
        `;

        eventContainer.appendChild(eventCard);
    });
}

// Ordenar eventos por fecha antes de mostrarlos
const sortedEvents = data.events.sort((a, b) => new Date(a.date) - new Date(b.date));

// Llamada a la función pasando los eventos ordenados por fecha
display(sortedEvents);