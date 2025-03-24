/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
// MUSIC PLAYER
document.querySelectorAll('.music-player-container').forEach((container, index, allPlayers) => {
    const audio = document.querySelectorAll('.audioTrack')[index];
    const playButton = container.querySelector('.playButton');
    const seekBar = container.querySelector('.seekBar');
    const currentTimeDisplay = container.querySelector('.currentTime');
    const durationDisplay = container.querySelector('.duration');

    // Display duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    playButton.addEventListener('click', () => {
        // Pause all other audio elements
        allPlayers.forEach((otherContainer, otherIndex) => {
            if (otherIndex !== index) {
                const otherAudio = document.querySelectorAll('.audioTrack')[otherIndex];
                otherAudio.pause();
                otherContainer.querySelector('.playButton').textContent = "▶";
            }
        });

        // Toggle play/pause for the current player
        if (audio.paused) {
            audio.play();
            playButton.textContent = "⏸";
        } else {
            audio.pause();
            playButton.textContent = "▶";
        }
    });

    audio.addEventListener('timeupdate', () => {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
    });

    function formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        return min + ":" + (sec < 10 ? "0" : "") + sec;
    }
});


// MODAL

function openModal(id, event) {
    if (event) event.preventDefault(); // Prevents the page from scrolling up
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// Close modal when clicking outside the content test
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal(this.id);
        }
    });
});


//Gallery 

const images = [
    "assets/img/gallery/angela.jpg", "assets/img/gallery/charice.jpg", "assets/img/gallery/alexa.jpg", 
    "assets/img/gallery/sophia.jpg", "assets/img/gallery/charlotte.jpg", "assets/img/gallery/kaia.jpg", 
    
    "assets/img/gallery/angela3.jpg", "assets/img/gallery/charice3.jpg", "assets/img/gallery/alexa3.jpg", 
    "assets/img/gallery/sophia3.jpg", "assets/img/gallery/charlotte3.jpg", "assets/img/gallery/kaia3.jpg", 

    "assets/img/gallery/angela4.jpg", "assets/img/gallery/charice4.jpg", "assets/img/gallery/alexa4.jpg", 
    "assets/img/gallery/sophia4.jpg", "assets/img/gallery/charlotte4.jpg", "assets/img/gallery/kaia4.jpg", 

    "assets/img/gallery/angela5.jpg", "assets/img/gallery/charice5.jpg", "assets/img/gallery/alexa5.jpg", 
    "assets/img/gallery/sophia5.jpg", "assets/img/gallery/charlotte5.jpg", "assets/img/gallery/kaia5.jpg", 

    "assets/img/gallery/angela6.jpg", "assets/img/gallery/charice6.jpg", "assets/img/gallery/alexa6.jpg", 
    "assets/img/gallery/sophia6.jpg", "assets/img/gallery/charlotte6.jpg", "assets/img/gallery/kaia6.jpg", 

    "assets/img/gallery/angela7.jpg", "assets/img/gallery/charice7.jpg", "assets/img/gallery/alexa7.jpg", 
    "assets/img/gallery/sophia7.jpg", "assets/img/gallery/charlotte7.jpg", "assets/img/gallery/kaia7.jpg", 

    "assets/img/gallery/angela2.jpg", "assets/img/gallery/charice2.jpg", "assets/img/gallery/alexa2.jpg", 
    "assets/img/gallery/sophia2.jpg", "assets/img/gallery/charlotte2.jpg", "assets/img/gallery/kaia2.jpg", 
];
const itemsPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(images.length / itemsPerPage);

function displayImages() {
    const galleryGrid = document.getElementById("galleryGrid");
    galleryGrid.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const imagesToShow = images.slice(start, end);

    imagesToShow.forEach(img => {
        const imgElement = document.createElement("img");
        imgElement.src = img;
        galleryGrid.appendChild(imgElement);
    });

    document.getElementById("pageNumber").textContent = currentPage;
    document.getElementById("totalPages").textContent = totalPages;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayImages();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayImages();
    }
});

displayImages();


let currentP = 1;  // Renamed currentPage to currentP
const rowsPerPageEvents = 6; // Set the number of events per page
const tableEvents = document.getElementById("eventTable");
const rowsEvents = tableEvents.getElementsByTagName("tr");
const totalRowsEvents = rowsEvents.length; // No need to subtract 1 now, as we don't need the header
const totalPagesEvents = Math.ceil(totalRowsEvents / rowsPerPageEvents); // Calculate the total number of pages

// Function to display the current page
function displayPageEvents(page) {
    const start = (page - 1) * rowsPerPageEvents;
    const end = page * rowsPerPageEvents;

    // Loop through rows and show/hide based on the page
    for (let i = 0; i < rowsEvents.length; i++) {
        if (i >= start && i < end) {
            rowsEvents[i].style.display = "";
        } else {
            rowsEvents[i].style.display = "none";
        }
    }

    // Update the page number and total pages in the pagination
    document.getElementById("pageNumberEvents").textContent = page;
    document.getElementById("totalPagesEvents").textContent = totalPagesEvents;
}

// Function to change the current page when prev/next is clicked
function changePageEvents(direction) {
    const newPage = currentP + direction;
    if (newPage >= 1 && newPage <= totalPagesEvents) {
        currentP = newPage;
        displayPageEvents(currentP);
    }
}

// Event listeners for prev and next buttons
document.getElementById("prevPageEvents").addEventListener("click", () => changePageEvents(-1));
document.getElementById("nextPageEvents").addEventListener("click", () => changePageEvents(1));

// Initialize the table with the first page
displayPageEvents(currentP);
