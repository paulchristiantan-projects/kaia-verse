document.addEventListener("DOMContentLoaded", function () {
    const musicData = [
        { title: "Tanga", releaseDate: "Release Date: 2025", image: "assets/img/music-tanga.png", audio: "assets/audio/music-tanga.mp3" },
        { title: "Walang Biruan Christmas Edition", releaseDate: "Release Date: 2024", image: "assets/img/music-walangbiruan-christmasedition.png", audio: "assets/audio/music-walangbiruanchristmasrush.mp3" },
        { title: "Walang Biruan", releaseDate: "Release Date: 2024", image: "assets/img/music-walangbiruan.png", audio: "assets/audio/music-walangbiruan.mp3" },
        { title: "You Did It", releaseDate: "Release Date: 2024", image: "assets/img/music-youdidit.png", audio: "assets/audio/music-youdidit.mp3" },
        { title: "5678", releaseDate: "Release Date: 2023", image: "assets/img/music-5678.png", audio: "assets/audio/music-5678.mp3" },
        { title: "Turn Up", releaseDate: "Release Date: 2023", image: "assets/img/music-turnup.png", audio: "assets/audio/music-turnup.mp3" },
        { title: "A Perfect Christmas", releaseDate: "Release Date: 2022", image: "assets/img/music-aperfectchristmas.png", audio: "assets/audio/music-aperfectchristmas.mp3" },
        { title: "Dalawa", releaseDate: "Release Date: 2022", image: "assets/img/music-dalawa.png", audio: "assets/audio/music-dalawa.mp3" },
        { title: "Blah Blah", releaseDate: "Release Date: 2022", image: "assets/img/music-blahblah.png", audio: "assets/audio/music-blahlah.mp3" },
        { title: "Kaya", releaseDate: "Release Date: 2021", image: "assets/img/music-kaya.png", audio: "assets/audio/music-kaya.mp3" }
    ];

    const swiperWrapper = document.querySelector(".swiper-wrapper");
    const mainAudioTrack = document.getElementById("mainAudioTrack");
    const mainPlayButton = document.getElementById("mainPlayButton");
    const seekBar = document.getElementById("seekBar");
    const volumeControl = document.getElementById("volumeControl");
    const currentTimeDisplay = document.querySelector(".currentTime");
    const durationDisplay = document.querySelector(".duration");

    if (!swiperWrapper || !mainAudioTrack || !mainPlayButton) {
        console.error("Required elements not found!");
        return;
    }

    // Populate slides dynamically
    swiperWrapper.innerHTML = musicData.map((track, index) => `
        <div class="swiper-slide" data-index="${index}">
            <img src="${track.image}" class="music-cover" alt="${track.title}">
        </div>
    `).join("");

    // Initialize Swiper
    var swiper = new Swiper(".music-carousel", {
        slidesPerView: 5,
        spaceBetween: -20,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 }
        },
        on: {
            slideChangeTransitionEnd: function () {
                updateMusicInfo();
                resetPlayerState();
            }
        }
    });

    // Function to update the music info and load the new track
    function updateMusicInfo() {
        const activeSlide = document.querySelector(".swiper-slide-active");
        const index = activeSlide.dataset.index;
        const track = musicData[index];

        // Update song title
        document.getElementById("music-title").textContent = track.title;
        document.getElementById("music-release-date").textContent = track.releaseDate;

        // Load new audio file
        mainAudioTrack.src = track.audio;

        // Reset the seek bar
        seekBar.value = 0;

        // Update the duration when the audio is loaded
        mainAudioTrack.addEventListener('loadedmetadata', function() {
            durationDisplay.textContent = formatTime(mainAudioTrack.duration);
        });
    }

    // Function to reset player state (pause and reset seek bar)
    function resetPlayerState() {
        mainAudioTrack.pause();
        mainPlayButton.textContent = "▶"; // Set the play button to "▶" (play)
        seekBar.value = 0; // Reset the seek bar to 0
    }

    // Play/Pause button functionality
    mainPlayButton.addEventListener("click", function () {
        if (mainAudioTrack.paused) {
            mainAudioTrack.play();
            mainPlayButton.textContent = "⏸"; // Change to pause button
        } else {
            mainAudioTrack.pause();
            mainPlayButton.textContent = "▶"; // Change to play button
        }
    });

    // Update seek bar and other player info
    mainAudioTrack.addEventListener("timeupdate", function () {
        if (mainAudioTrack.duration) {
            seekBar.value = (mainAudioTrack.currentTime / mainAudioTrack.duration) * 100;
            currentTimeDisplay.textContent = formatTime(mainAudioTrack.currentTime);
        }
    });

    // Seek bar functionality
    seekBar.addEventListener("input", function () {
        mainAudioTrack.currentTime = (seekBar.value / 100) * mainAudioTrack.duration;
    });

    // Volume control
    volumeControl.addEventListener("input", function () {
        mainAudioTrack.volume = volumeControl.value;
    });

    // Format time helper function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${sec}`;
    }

    // Set initial song on page load (the first song will be shown)
    updateMusicInfo();
    resetPlayerState();
});
