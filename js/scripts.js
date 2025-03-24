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