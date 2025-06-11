document.addEventListener("DOMContentLoaded", function () {
    const musicData = [
        { title: "Walkie Talkie", 
            releaseDate: "Release Date: 2025", 
            image: "assets/img/music-walkietalkie.png", 
            audio: "assets/audio/music-walkietalkie.mp3",
                        lyrics: [
                { time: 1, text: "Hm, hm Hello? I have been thinking a lot about you lately And I was wondering if you were as well? Do you copy over?" },
                { time: 12, text: "♬ ♬ ♬" },
                { time: 24, text: "Don't know if I should, I'd stop if I could Don't know how I live anymore without thinking 'bout you, boy, yeah" },


                { time: 36, text: "Now, just look at the time, 11:59 If you got a minute, I'm about to give you all the signs"},
                { time: 42, text: "Should we just talk all night? You know that it's alright Why don't you make your move just vibe with me?" },
                { time: 47, text: "Don't keep me waiting I know I'm there, I'm always in your mind" },
                { time: 53, text: "Oh, baby, now I'm gonna break it to you, oh You got me feeling for you, boy" },


                { time: 60, text: "Come now, get on my frequency Tune in so we can walkie-talkie"},
                { time: 66, text: "Do you hear me over? Baby, come here closer I just wanna hear you better" },
                { time: 72, text: "D-O Y-O-U copy? Check that walkie-talkie, baby" },
                { time: 78, text: "D-O Y-O-U copy? Check that walkie-talkie, baby" },

                { time: 84, text: "♬ ♬ ♬" },


                { time: 90, text: "Can't figure out what to do, what's in the manual? Don't know how to function, is this the button?"},
                { time: 94, text: "Or something for me to click with you? Yeah, reply without delay" },
                { time: 98, text: "'Lam mo naman, I like your name on my notification every day Not a clue, I can't decode it, dama kong ikaw ay lumalapit" },
                { time: 105, text: "Ano bang mga 'di sinasabi? Iniisip palagi-lagi You won't stop, sweet like a soda pop, yeah" },
                { time: 111, text: "I know you're not like any other" },

                { time: 113, text: "Don't keep waiting I know I'm there, I'm always in your mind"},
                { time: 118, text: "Oh, baby, now I'm gonna break it to you, oh You got me feeling for you, boy, yeah" },
                { time: 131, text: "Got me feeling for you Feeling for you" },


                { time: 138, text: "Come now, get on my frequency Tune in so we can walkie-talkie"},
                { time: 144, text: "Do you hear me over? Baby, come here closer I just wanna hear you better" },
                { time: 150, text: "Tell me now, so we can see Tune up, come on, let's walkie-talkie" },
                { time: 156, text: "My heart's getting closer, baby, come on over I wanna be with you forever" },

                { time: 162, text: "D-O Y-O-U copy? Check that walkie-talkie, baby" },
                { time: 168, text: "D-O Y-O-U copy?Check that, check that Check that, check that" },

            ]
        },
        {
            title: "Tanga", 
            releaseDate: "Release Date: 2025", 
            image: "assets/img/music-tanga.png", 
            audio: "assets/audio/music-tanga.mp3",
            lyrics: [
                { time: 0, text: "..." },
                { time: 8, text: "Matagal ko nang napapansin, minsan ay nagpipigil" },
                { time: 13, text: "Kasi nga ayokong na masasaktan kita" },
                { time: 17, text: "Maraming nagsasabi na isa kang malaking problema" },
                { time: 22, text: "Pero 'di naman ako naalis kahit na" },

                { time: 25, text: "Sabi nga ni mama, Wag kang magtitiwala"},
                { time: 29, text: "Sa mga lalaking gaya mong masyadong magaling sa drama" },
                { time: 33, text: "Lupit sa pabango, tunay na baho mo" },
                { time: 38, text: "Sa loob 'di mo matago, alam kong 'di makuntento" },


                { time: 42, text: "Huwag kang magagalit, kung ayoko nang kumapit"},
                { time: 46, text: "Sinusubukan ko lahat ng makakaya ko" },
                { time: 50, text: "Huwag sanang magalit kung nalulungkot palagi" },
                { time: 54, text: "Ayaw ka ng lahat pero andito pa rin ako" },


                { time: 59, text: "Na-na-na-na-na-na, na-na-na-na-na"},
                { time: 63, text: "Na-na-na-na-na-na, na-na-na-na-na" },

                { time: 67, text: "Di naman ako nagtitiwala na (Nagtitiwala na)"},
                { time: 71, text: "Kasi nga laro mo'y kabisado na (Kabisado na)" },
                { time: 76, text: "Sino bang niloko ko, alam kong hindi 'to totoo" },
                { time: 79, text: "Ngayon lang galit-galitan 'to, pero inlove pa rin naman sa'yo" },


                { time: 84, text: "Sabi nga ni mama, Wag kang tanga-tanga (Tanga)"},
                { time: 88, text: "Huwag magpapaloko sa gaya mong magaling sa salita (Magaling sa salita)" },
                { time: 92, text: "Pero nakuha mo, marupok na puso ko" },
                { time: 96, text: "Di makapaniwala, nahulog sa isang tulad mo" },

                { time: 100, text: "Huwag kang magagalit, kung ayoko nang kumapit"},
                { time: 104, text: "Sinusubukan ko lahat ng makakaya ko (Okay)" },
                { time: 109, text: "Huwag sanang magalit kung nalulungkot palagi" },
                { time: 113, text: "Ayaw ka ng lahat pero andito pa rin ako" },

                { time: 117, text: "Na-na-na-na-na-na, na-na-na-na-na"},
                { time: 122, text: "Na-na-na-na-na-na, na-na-na-na-na" },
                { time: 126, text: "Na-na-na-na-na-na, na-na-na-na-na" },
                { time: 130, text: "Na-na-na-na-na-na, na-na-na-na-na" },

                { time: 133, text: "Nandito pa rin ako"},
                { time: 140, text: "Nandito pa rin ako" },

            ]
        },
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
    // const volumeControl = document.getElementById("volumeControl");
    const currentTimeDisplay = document.querySelector(".currentTime");
    const durationDisplay = document.querySelector(".duration");
    const lyricsDisplay = document.getElementById("lyrics-display");

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

        // Update lyrics for the new song
        lyricsDisplay.textContent = track.lyrics ? track.lyrics[0].text : "No lyrics available";

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
    // volumeControl.addEventListener("input", function () {
    //     mainAudioTrack.volume = volumeControl.value;
    // });

    // Format time helper function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${sec}`;
    }

    // Set initial song on page load (the first song will be shown)
    updateMusicInfo();
    resetPlayerState();

    function updateLyrics() {
        const currentTime = mainAudioTrack.currentTime;
    
        // Get the title of the currently active slide
        const activeSlide = document.querySelector(".swiper-slide-active");
        const activeTitle = activeSlide.querySelector("img").alt;  // Assuming alt text is the song title
    
        console.log("Active Title:", activeTitle); // Debugging line to check if active title is correct
    
        // Find the track based on the active title
        const track = musicData.find(t => t.title === activeTitle);
        if (!track) {
            console.log("Track not found!");
            return;
        }
    
        if (track.lyrics && track.lyrics.length > 0) {
            let lyricsHTML = "";
            
            track.lyrics.forEach((lyric, index) => {
                // Determine the next lyric's time (or end of song if it's the last lyric)
                const nextLyricTime = track.lyrics[index + 1] ? track.lyrics[index + 1].time : mainAudioTrack.duration;
    
                // Highlight the lyric if currentTime is between the lyric's time and the next lyric's time
                const activeClass = (currentTime >= lyric.time && currentTime < nextLyricTime) ? "active" : "";
                
                lyricsHTML += `<span class="lyric-line ${activeClass}" data-time="${lyric.time}">${lyric.text}</span><br>`;
            });
    
            lyricsDisplay.innerHTML = lyricsHTML;
    
            // Find the active lyric and ensure it's at the top of the container
            const activeLyric = document.querySelector('.lyric-line.active');
            if (activeLyric) {
                const container = document.querySelector("#lyrics-display");
    
                // Ensure the active lyric is at the top of the container (scrolling logic)
                const containerHeight = container.clientHeight;
                const activeLyricOffsetTop = activeLyric.offsetTop;
                const activeLyricHeight = activeLyric.clientHeight;
    
                // Check if the active lyric is within view, and scroll it into view if not
                if (activeLyricOffsetTop < container.scrollTop) {
                    container.scrollTop = activeLyricOffsetTop;  // Scroll up
                } else if (activeLyricOffsetTop + activeLyricHeight > containerHeight + container.scrollTop) {
                    container.scrollTop = activeLyricOffsetTop - containerHeight + activeLyricHeight; // Scroll down
                }
    
                // Optional: Smooth scrolling behavior
                container.style.scrollBehavior = 'smooth';
            }
        }
    }

    // Update lyrics while the song is playing
    mainAudioTrack.addEventListener("timeupdate", updateLyrics);

});
