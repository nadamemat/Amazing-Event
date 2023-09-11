document.addEventListener("DOMContentLoaded", function () {
    let sortedEvents;

    async function fetchDataFromAPI() {
        try {
            const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            sortedEvents = data.events.sort((a, b) => new Date(a.date) - new Date(b.date));

            const currentDate = new Date(data.currentDate);
            const eventPast = data.events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate < currentDate;
            });
            const eventUpcoming = data.events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate > currentDate;
            });

            if (document.title == "Amazing Events") {
                display(sortedEvents);
            } else if (document.title == "Past - Amazing Events") {
                display(eventPast);
            } else {
                display(eventUpcoming);
            }

            addEventListeners();
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    }

    function addEventListeners() {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", updateFilters);
        });

        document.getElementById("searchInput").addEventListener("input", updateFilters);

        document.getElementById("resetFilters").addEventListener("click", resetFilters);
    }

    function updateFilters() {
        const selectedCategories = getSelectedCategories();
        const searchValue = document.getElementById("searchInput").value.toLowerCase();

        const filteredEvents = sortedEvents.filter(event => {
            const eventCategory = event.category.toLowerCase();
            const eventName = event.name.toLowerCase();
            const eventDescription = event.description.toLowerCase();

            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(eventCategory);
            const textMatch = event.name.toLowerCase().includes(searchValue) || event.description.toLowerCase().includes(searchValue);

            return categoryMatch && textMatch;
        });

        clearEventContainer();
        display(filteredEvents);
    }

    function resetFilters() {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        document.getElementById("searchInput").value = "";

        clearEventContainer();
        display(sortedEvents);
    }

    function getSelectedCategories() {
        const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
        return Array.from(checkboxes).map(checkbox => checkbox.id.replace("Checkbox", ""));
    }

    function clearEventContainer() {
        const eventContainer = document.getElementById("event-container");
        eventContainer.innerHTML = "";
    }

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
                            <a href="./details.html?_id=${event._id}" class="btn btn-primary">Details</a>
                        </div>
                    </div>
                </div>
            `;

            eventContainer.appendChild(eventCard);
        });
    }

    fetchDataFromAPI();
});
