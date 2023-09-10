
// const eventContainer = document.getElementById("event-container");
// const events = data.events;

// const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
// events.forEach((event) => {
    
//   const card = document.createElement("div");
//   card.classList.add("col-md-4", "col-lg-4", "event-card", "white-background");

//   const image = document.createElement("img");
//   image.src = event.image;
//   image.alt = event.name;
//   card.appendChild(image);

//   const title = document.createElement("h2");
//   title.textContent = event.name;
//   card.appendChild(title);

//   const date = document.createElement("p");
//   date.textContent = `Date: ${event.date}`;
//   card.appendChild(date);

//   const description = document.createElement("p");
//   description.textContent = event.description;
//   card.appendChild(description);

//   eventContainer.appendChild(card);
// });

// script.js

// Fetch data from the API
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        const table = document.querySelector('.table-stats');
        
        // Populate data for "Events with highest % of attendance"
        const highestAttendanceRow = table.rows[1];
        highestAttendanceRow.cells[0].textContent = data.highestAttendanceEventName;
        highestAttendanceRow.cells[1].textContent = `${data.highestAttendance}%`;
        // Add logic to populate the third cell with appropriate data
        
        // Populate data for "Events with lowest % of attendance"
        const lowestAttendanceRow = table.rows[2];
        lowestAttendanceRow.cells[0].textContent = data.lowestAttendanceEventName;
        lowestAttendanceRow.cells[1].textContent = `${data.lowestAttendance}%`;
        // Add logic to populate the third cell with appropriate data
        
        // Populate data for "Events with larger capacity"
        const largestCapacityRow = table.rows[3];
        largestCapacityRow.cells[0].textContent = data.largestCapacityEventName;
        // Add logic to populate the second and third cells with appropriate data
        
        // Populate data for "Upcoming events statistics by category"
        // You can iterate through the data.categories array to populate this section
        
        // Populate data for "Past events statistics by category"
        // You can iterate through the data.pastCategories array to populate this section
    })
    .catch(error => console.error('Error fetching data:', error));