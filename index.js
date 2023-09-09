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
                            <a href="./assets/pages/details.html?_id=${event._id}" class="btn btn-primary">Details</a>
                        </div>
                    </div>
                </div>
            `;

            eventContainer.appendChild(eventCard);
        });
    }

    fetchDataFromAPI();
});




//a este le andan los checkbox y el reset pero no el search
// document.addEventListener("DOMContentLoaded", function () {
//     let sortedEvents;

//     async function fetchDataFromAPI() {
//         try {
//             const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();

//             sortedEvents = data.events.sort((a, b) => new Date(a.date) - new Date(b.date));

//             const currentDate = new Date(data.currentDate);
//             const eventPast = data.events.filter(event => {
//                 const eventDate = new Date(event.date);
//                 return eventDate < currentDate;
//             });
//             const eventUpcoming = data.events.filter(event => {
//                 const eventDate = new Date(event.date);
//                 return eventDate > currentDate;
//             });

//             if (document.title == "Amazing Events") {
//                 display(sortedEvents);
//             } else if (document.title == "Past - Amazing Events") {
//                 display(eventPast);
//             } else {
//                 display(eventUpcoming);
//             }

//             addEventListeners();
//         } catch (error) {
//             console.error('Error fetching data from API:', error);
//         }
//     }

//     function addEventListeners() {
//         const checkboxes = document.querySelectorAll("input[type=checkbox]");
//         checkboxes.forEach(checkbox => {
//             checkbox.addEventListener("change", updateFilters);
//         });

//         document.getElementById("searchInput").addEventListener("input", updateFilters);

//         document.getElementById("resetFilters").addEventListener("click", resetFilters);
//     }

//     function updateFilters() {
//         const selectedCategories = getSelectedCategories();
//         const searchValue = document.getElementById("searchInput").value.toLowerCase();

//         const filteredEvents = sortedEvents.filter(event => {
//             const eventCategory = event.category.toLowerCase();
//             const eventName = event.name.toLowerCase();
//             const eventDescription = event.description.toLowerCase();

//             return selectedCategories.includes(eventCategory) &&
//                 (eventName.includes(searchValue) || eventDescription.includes(searchValue));
//         });

//         clearEventContainer();
//         display(filteredEvents);
//     }

//     function resetFilters() {
//         const checkboxes = document.querySelectorAll("input[type=checkbox]");
//         checkboxes.forEach(checkbox => {
//             checkbox.checked = false;
//         });

//         document.getElementById("searchInput").value = "";

//         clearEventContainer();
//         display(sortedEvents);
//     }

//     function getSelectedCategories() {
//         const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
//         return Array.from(checkboxes).map(checkbox => checkbox.id.replace("Checkbox", ""));
//     }

//     function clearEventContainer() {
//         const eventContainer = document.getElementById("event-container");
//         eventContainer.innerHTML = "";
//     }

//     function truncateText(text, maxLength) {
//         if (text.length > maxLength) {
//             return text.slice(0, maxLength) + "";
//         }
//         return text;
//     }

//     function display(events) {
//         const eventContainer = document.getElementById("event-container");

//         events.forEach(event => {
//             const eventCard = document.createElement("div");
//             eventCard.classList.add("col-12", "col-md-6", "col-lg-4");

//             eventCard.innerHTML = `
//                 <div class="card">
//                     <img src="${event.image}" class="card-img-top" alt="Event Image">
//                     <div class="card-body">
//                         <h5 class="card-title text-center">${event.name}</h5>
//                         <p class="card-text">Date: ${event.date}</p>
//                         <p class="card-text-description">${truncateText(event.description, 30)}</p>
//                         <div class="d-flex justify-content-between align-items-center">
//                             <p class="card-text">Price: $ ${event.price}</p>
//                             <a href="./assets/pages/details.html?_id=${event._id}" class="btn btn-primary">Details</a>
//                         </div>
//                     </div>
//                 </div>
//             `;

//             eventContainer.appendChild(eventCard);
//         });
//     }

//     fetchDataFromAPI();
// });




//A ESTE LE ANDA EL SEARCHBAR Y EL RESET PERO NO LOS BOTONES

// let sortedEvents; // Declarar sortedEvents en un alcance global

// async function fetchDataFromAPI() {
//     try {
//         const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         sortedEvents = data.events.sort((a, b) => new Date(a.date) - new Date(b.date)); // Asignar sortedEvents

//         const currentDate = new Date(data.currentDate);
//         const eventPast = data.events.filter(event => {
//             const eventDate = new Date(event.date);
//             return eventDate < currentDate;
//         });
//         const eventUpcoming = data.events.filter(event => {
//             const eventDate = new Date(event.date);
//             return eventDate > currentDate;
//         });

//         if (document.title == "Amazing Events") {
//             display(sortedEvents);
//         } else if (document.title == "Past - Amazing Events") {
//             display(eventPast);
//         } else {
//             display(eventUpcoming);
//         }

//         // Llama a las funciones de manejo de eventos después de obtener los datos
//         addEventListeners();
//     } catch (error) {
//         console.error('Error fetching data from API:', error);
//     }
// }

// // Función para agregar event listeners después de obtener los datos
// function addEventListeners() {
//     document.getElementById("resetFilters").addEventListener("click", () => {
//         // Desmarca todos los checkboxes
//         document.getElementById("raceCheckbox").checked = false;
//         document.getElementById("foodCheckbox").checked = false;
//         document.getElementById("museumCheckbox").checked = false;
//         document.getElementById("concertCheckbox").checked = false;
//         document.getElementById("partyCheckbox").checked = false;
//         document.getElementById("booksCheckbox").checked = false;
//         document.getElementById("cinemaCheckbox").checked = false;
//         // Limpia el contenido actual y muestra todos los eventos
//         clearEventContainer();
//         display(sortedEvents);
//     });

//     // Agregar event listener para el searchBar después de obtener los datos
//     document.getElementById("searchInput").addEventListener("input", () => {
//         const searchValue = document.getElementById("searchInput").value.toLowerCase();
//         const filteredEvents = sortedEvents.filter(event => {
//             // Filtra eventos por nombre o descripción que coincidan con la búsqueda
//             return event.name.toLowerCase().includes(searchValue) || event.description.toLowerCase().includes(searchValue);
//         });
//         // Limpia el contenido actual y muestra los eventos filtrados
//         clearEventContainer();
//         display(filteredEvents);
//     });

//     // Agregar event listeners para los checkboxes después de obtener los datos
//     document.getElementById("raceCheckbox").addEventListener("change", updateFilters);
//     document.getElementById("foodCheckbox").addEventListener("change", updateFilters);
//     document.getElementById("museumCheckbox").addEventListener("change", updateFilters);
//     document.getElementById("concertCheckbox").addEventListener("change", updateFilters);
//     document.getElementById("partyCheckbox").addEventListener("change", updateFilters);
//     document.getElementById("booksCheckbox").addEventListener("change", updateFilters);
//     document.getElementById("cinemaCheckbox").addEventListener("change", updateFilters);
// }

// function updateFilters() {
//     const selectedCategories = getSelectedCategories();
//     const filteredEvents = sortedEvents.filter(event => {
//         // Filtra eventos por categoría
//         return selectedCategories.includes(event.category);
//     });
//     // Limpia el contenido actual y muestra los eventos filtrados
//     clearEventContainer();
//     display(filteredEvents);
// }

// function getSelectedCategories() {
//     const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
//     const selectedCategories = Array.from(checkboxes).map(checkbox => checkbox.id.replace("Checkbox", ""));
//     return selectedCategories;
// }

// function clearEventContainer() {
//     const eventContainer = document.getElementById("event-container");
//     eventContainer.innerHTML = "";
// }

// /*Trunco texto para que no rompa la card*/
// function truncateText(text, maxLength) {
//     if (text.length > maxLength) {
//         return text.slice(0, maxLength) + "";
//     }
//     return text;
// }

// function display(events) {
//     const eventContainer = document.getElementById("event-container");

//     events.forEach(event => {
//         const eventCard = document.createElement("div");
//         eventCard.classList.add("col-12", "col-md-6", "col-lg-4");

//         eventCard.innerHTML = `
//             <div class="card">
//                 <img src="${event.image}" class="card-img-top" alt="Event Image">
//                 <div class="card-body">
//                     <h5 class="card-title text-center">${event.name}</h5>
//                     <p class="card-text">Date: ${event.date}</p>
//                     <p class="card-text-description">${truncateText(event.description, 30)}</p>
//                     <div class="d-flex justify-content-between align-items-center">
//                         <p class="card-text">Price: $ ${event.price}</p>
//                         <a href="./assets/pages/details.html?_id=${event._id}" class="btn btn-primary">Details</a>
//                     </div>
//                 </div>
//             </div>
//         `;

//         eventContainer.appendChild(eventCard);
//     });
// }

// // Llama a la función para obtener los datos de la API
// fetchDataFromAPI();




