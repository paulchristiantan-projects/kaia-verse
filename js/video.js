let currentVideoPage = 1;
const rowsPerPageVideos = 1; // Adjust how many videos you want per page

const videoList = [
    {
        src: "https://www.youtube.com/embed/SqARYU7Xf0A?list=RDSqARYU7Xf0A",
        title: "Puregold Nasa Atin Ang Panalo- Kaya Mo ft. KAIA"
    },
    {
        src: "https://www.youtube.com/embed/jY5--PXuAx0",
        title: "KAIA 'TANGA' Official Music Video"
    },
    {
        src: "https://www.youtube.com/embed/i7b-r5yszw0?list=RDi7b-r5yszw0",
        title: "KAIA 'Walang Biruan' Official Music Video"
    }
];

function displayVideoPage(page) {
    const container = document.getElementById("video-container");
    container.innerHTML = "";

    const start = (page - 1) * rowsPerPageVideos;
    const end = page * rowsPerPageVideos;
    const videosToShow = videoList.slice(start, end);

    videosToShow.forEach(video => {
        const iframe = document.createElement("iframe");
        iframe.width = "1236";
        iframe.height = "695";
        iframe.src = video.src;
        iframe.title = video.title;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;

        container.appendChild(iframe);
    });

    document.getElementById("pageNumberVideos").textContent = page;
    document.getElementById("totalPagesVideos").textContent = Math.ceil(videoList.length / rowsPerPageVideos);
}

function changeVideoPage(direction) {
    const totalPages = Math.ceil(videoList.length / rowsPerPageVideos);
    const newPage = currentVideoPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentVideoPage = newPage;
        displayVideoPage(currentVideoPage);
    }
}

document.getElementById("prevPageVideos").addEventListener("click", () => changeVideoPage(-1));
document.getElementById("nextPageVideos").addEventListener("click", () => changeVideoPage(1));

// Initial load
displayVideoPage(currentVideoPage);
