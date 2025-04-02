const events = [
    { date: "April 05", title: "TANGA MV release", location: "-" },
    { date: "March 28", title: "TANGA release", location: "-" },
    { date: "March 17", title: "Walkie Talkie", location: "SM City Davao" },
    { date: "March 15", title: "Fusion MNL 2025", location: "CCP Open Grounds" },
    { date: "Feb 26", title: "PINID National Arts Month", location: "Metropolitan Theater, Manila City" },
    { date: "Feb 24", title: "Wish107.5 Roadshow", location: "Arellano University" },
    { date: "Feb 23", title: "Panagbenga Grand Float Parade", location: "Baguio City" },
    { date: "Feb 19", title: "Sayaw Pinoy!", location: "Quezon Convention Center, Lucena City" },
    { date: "Feb 15 - 16", title: "BEECON 2025", location: "SMX Convention Center Bacolod" },
    { date: "Feb 13", title: "27th Paranaque Cityhood Anniversary", location: "Paranaque City" },
    { date: "Feb 7 - 9", title: "Udaipur World Music Festival 2025", location: "Udaipur, India" },
    { date: "Jan 28", title: "Puregold Lunar Year 2025", location: "-" },
    { date: "Jan 26", title: "Backyard Live", location: "Quezon City" },
    { date: "Jan 25", title: "Dance Supremacy Kings & Queens", location: "The Theater, Solaire" },
    { date: "Jan 24", title: "DTSN 2025", location: "Iloilo Convention Center" },
    { date: "Jan 10", title: "Honor X9C 5G Grand Launch", location: "-" },
    { date: "Jan 8", title: "BRGY TFC", location: "-" },
    { date: "Jan 1", title: "Kapuso Countdown to 2025", location: "SM Mall of Asia (Open Grounds)" }
];

let currentP = 1;
const rowsPerPageEvents = 6;

function generateTable() {
    const table = document.createElement("table");
    table.classList.add("event-table");
    
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    document.getElementById("events-container").appendChild(table);
}

generateTable();
const tableBody = document.querySelector(".event-table tbody");

tableBody.innerHTML = ""; // Clear existing rows before rendering

displayPage(currentP);

document.getElementById("prevPageEvents").addEventListener("click", () => changePage(-1));
document.getElementById("nextPageEvents").addEventListener("click", () => changePage(1));

displayPage(currentP);

function displayPage(page) {
    tableBody.innerHTML = "";
    const start = (page - 1) * rowsPerPageEvents;
    const end = page * rowsPerPageEvents;
    
    events.slice(start, end).forEach(event => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${event.date}</td>
            <td>${event.title}</td>
            <td>${event.location}</td>
        `;
        tableBody.appendChild(row);
    });
    
    document.getElementById("pageNumberEvents").textContent = page;
    document.getElementById("totalPagesEvents").textContent = Math.ceil(events.length / rowsPerPageEvents);
}

function changePage(direction) {
    const newPage = currentP + direction;
    if (newPage >= 1 && newPage <= Math.ceil(events.length / rowsPerPageEvents)) {
        currentP = newPage;
        displayPage(currentP);
    }
}
