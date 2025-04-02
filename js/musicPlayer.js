document.addEventListener("DOMContentLoaded", function () {
    const musicData = [
        { title: "Walang Biruan Christmas Edition", image: "assets/img/music-tanga.png", audio: "assets/audio/music-tanga.mp3" },
        { title: "Walang Biruan Christmas Edition", image: "assets/img/music-walangbiruan-christmasedition.png", audio: "assets/audio/music-walangbiruanchristmasrush.mp3" },
        { title: "Walang Biruan", image: "assets/img/music-walangbiruan.png", audio: "assets/audio/music-walangbiruan.mp3" },
        { title: "You Did It", image: "assets/img/music-youdidit.png", audio: "assets/audio/music-youdidit.mp3" },
        { title: "5678", image: "assets/img/music-5678.png", audio: "assets/audio/music-5678.mp3" },
        { title: "Turn Up", image: "assets/img/music-turnup.png", audio: "assets/audio/music-turnup.mp3" },
        { title: "A Perfect Christmas", image: "assets/img/music-aperfectchristmas.png", audio: "assets/audio/music-aperfectchristmas.mp3" },
        { title: "Dalawa", image: "assets/img/music-dalawa.png", audio: "assets/audio/music-dalawa.mp3" },
        { title: "Blah Blah", image: "assets/img/music-blahblah.png", audio: "assets/audio/music-blahlah.mp3" },
        { title: "Kaya", image: "assets/img/music-kaya.png", audio: "assets/audio/music-kaya.mp3" }        
    ];

    const musicContainer = document.getElementById("musicContainer");

    musicData.forEach((track, index) => {
        const playerHTML = `
            <div class="col-lg-3 music-player-container">
                <a class="portfolio-item" href="#!">
                    <div class="caption">
                        <div class="caption-content"></div>
                    </div>
                    <img class="img-fluid" src="${track.image}" alt="Music Cover" />
                </a>

                <!-- Music Player Controls -->
                <div class="music-player">
                    <button class="playButton" data-index="${index}">▶</button>
                    <input type="range" class="seekBar" value="0" step="1">
                    <span class="currentTime">0:00</span> / <span class="duration">0:00</span>
                    <br>
                    <input type="range" class="volumeControl" min="0" max="1" step="0.1" value="1">
                    <br>
                </div>
                <audio class="audioTrack" src="${track.audio}"></audio>
            </div>
        `;
        musicContainer.innerHTML += playerHTML;
    });

    // Select all elements
    const playButtons = document.querySelectorAll(".playButton");
    const seekBars = document.querySelectorAll(".seekBar");
    const volumeControls = document.querySelectorAll(".volumeControl");
    const audioTracks = document.querySelectorAll(".audioTrack");
    const currentTimeDisplays = document.querySelectorAll(".currentTime");
    const durationDisplays = document.querySelectorAll(".duration");
    const downloadButtons = document.querySelectorAll(".downloadButton");

    // Function to format time
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }

    // Play/Pause toggle
    playButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const audio = audioTracks[index];

            // Stop all other audio players before playing the selected one
            audioTracks.forEach((track, trackIndex) => {
                if (trackIndex !== index) {
                    track.pause();
                    track.currentTime = 0; // Reset progress
                    playButtons[trackIndex].textContent = "▶"; // Reset play button
                }
            });

            // Toggle play/pause for the clicked track
            if (audio.paused) {
                audio.play();
                button.textContent = "⏸";
            } else {
                audio.pause();
                button.textContent = "▶";
            }
        });

        // Update seek bar and duration when metadata loads
        audioTracks[index].addEventListener("loadedmetadata", () => {
            durationDisplays[index].textContent = formatTime(audioTracks[index].duration);
            seekBars[index].max = Math.floor(audioTracks[index].duration);
        });

        // Update seek bar while playing
        audioTracks[index].addEventListener("timeupdate", () => {
            seekBars[index].value = Math.floor(audioTracks[index].currentTime);
            currentTimeDisplays[index].textContent = formatTime(audioTracks[index].currentTime);
        });

        // Seek to new position
        seekBars[index].addEventListener("input", () => {
            audioTracks[index].currentTime = seekBars[index].value;
        });

        // Volume control
        volumeControls[index].addEventListener("input", () => {
            audioTracks[index].volume = volumeControls[index].value;
        });

        // Download button functionality
        // downloadButtons[index].addEventListener("click", function () {
        //     const audioURL = this.getAttribute("data-audio");
        //     const a = document.createElement("a");
        //     a.href = audioURL;
        //     a.download = audioURL.split("/").pop();
        //     document.body.appendChild(a);
        //     a.click();
        //     document.body.removeChild(a);
        // });
    });
});
