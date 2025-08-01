let currentYear = 2025;
let currentP = 1;
const rowsPerPageEvents = 6;

const eventsByYear = {
    2024: [
        { date: "October 29", title: "Wish Bus (Walang Biruan)", location: "Venice Grand Canal Mall" },
        { date: "December 29", title: "KPOP Convention 12", location: "SPACE, One Ayala" }
    ],
    2025: [
        { date: "October 10", title: "Fusion 10 (The Philippine Music Festival) ", location: "UPLB Freedom Park" },
        { date: "Aug 02", title: "Ult Vibe Live ", location: "BGC Amphitheater, Taguig City" },
        { date: "July 05", title: "Puregold: OPM CON 2025 ", location: "Philippine Arena" },
        { date: "June 28", title: "PPOPCON: Fete de la Musique", location: "Farmers Mall, Cubao" },
        { date: "June 28", title: "Airasia: Fun Run", location: "Parqal, Paranaque City" },
        { date: "June 21", title: "Kitchie Nadal's New Ground Manila", location: "Smart Araneta Coliseum" },
        { date: "June 20", title: "Animusika 2025", location: "DLSU Manila" },
        { date: "June 14", title: "TOYCON 2025", location: "SMX Convention Center Manila" },
        { date: "June 12", title: "Puregold MV", location: "-" },
        { date: "June 07", title: "Realme Mobile Legends Cup Grand Finals ", location: "SM North EDSA" },
        { date: "June 06", title: "Walkie Talkie song release", location: "Online Music" },
        { date: "May 27", title: "KAOGMA Festival ", location: "Pili, Camarines Sur" },
        { date: "May 26", title: "Monster RX 93.1: The Concert Series ", location: "Pasig City" },
        { date: "May 22 & May 24", title: "Huawei Watch Fit 4 Series Launch ", location: "BGC High Street Activity Center, Taguig City" },
        { date: "May 22", title: "Binibining Pilipinas Press Presentation ", location: "Live" },
        { date: "May 19", title: "Grand Balangay Festival ", location: "Butuan Sports Complex" },
        { date: "May 18", title: "San Jose Partido Town Fiesta 2025", location: "San Jose, Camarines Sur" },
        { date: "May 17", title: "KFC Crave and Music Live ", location: "Live" },
        { date: "May 14", title: "Magic 89.9 ", location: "Live" },
        { date: "May 04", title: "All Out Sunday ", location: "GMA" },
        { date: "April 30", title: "Love Boracay", location: "Boracay Station 2" },
        { date: "April 26", title: "KAIA's Anniversary Celebration", location: "Quezon City" },
        { date: "April 12", title: "Vinfast PH KAIA's Meet and Greet", location: "World Trade Center" },
        { date: "April 08", title: "KAIA 3rd Anniversary", location: "-" },
        { date: "April 08", title: "TANGA MV release", location: "-" },
        { date: "April 07", title: "Wish107.5", location: "Eton, Centris" },
        { date: "April 05", title: "PJMA Madworld 2025", location: "FILOIL ECOOIL CENTRE" },
        { date: "March 28", title: "TANGA music release", location: "-" },
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
    ],
    2026: [
        { date: "-", title: "-", location: "-" }
    ]
};

function generateTable() {
    const table = document.createElement("table");
    table.classList.add("event-table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    document.getElementById("events-container").appendChild(table);
}

generateTable();
const tableBody = document.querySelector(".event-table tbody");

function displayPage(page) {
    const events = eventsByYear[currentYear] || [];

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
    const events = eventsByYear[currentYear] || [];
    const newPage = currentP + direction;
    const totalPages = Math.ceil(events.length / rowsPerPageEvents);
    if (newPage >= 1 && newPage <= totalPages) {
        currentP = newPage;
        displayPage(currentP);
    }
}

function setYear(year) {
    currentYear = year;
    currentP = 1;
    displayPage(currentP);

    // Highlight selected year
    document.querySelectorAll("#year-selector button").forEach(btn => {
        btn.classList.remove("active-year");
        if (parseInt(btn.textContent) === year) {
            btn.classList.add("active-year");
        }
    });
}

document.getElementById("prevPageEvents").addEventListener("click", () => changePage(-1));
document.getElementById("nextPageEvents").addEventListener("click", () => changePage(1));

setYear(currentYear); // Initial load
