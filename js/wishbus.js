// ✅ Wish Bus Performance Video Data
const wishBusVideos = [
    {
        title: "KAIA's 'TANGA' | Wish 107.5 Bus",
        src: "https://www.youtube.com/embed/dTJp6YDlFYA?list=RDdTJp6YDlFYA"
    },
    {
        title: "KAIA's 'Walang Biruan' | Wish 107.5 Bus",
        src: "https://www.youtube.com/embed/iqySVDyhTVs?list=RDiqySVDyhTVs"
    },
    {
        title: "KAIA's 'Dalawa' | Wish 107.5 Bus",
        src: "https://www.youtube.com/embed/7YKOBpQ-qT4?list=RD7YKOBpQ-qT4"
    },
    {
        title: "KAIA's '5678' | Wish 107.5 Bus",
        src: "https://www.youtube.com/embed/yhpRk9k01-U?list=RDyhpRk9k01-U"
    }

    // Add more videos as needed
];

// ✅ Pagination Variables
const videosPerPage = 2;
let currentWishBusPage = 1;

// ✅ Render Function
function renderWishBusVideos() {
  const container = document.getElementById('wishBusContainer');
  container.innerHTML = '';

  const start = (currentWishBusPage - 1) * videosPerPage;
  const end = start + videosPerPage;
  const videosToShow = wishBusVideos.slice(start, end);

  videosToShow.forEach(video => {
    const col = document.createElement('div');
    col.className = 'col-md-6'; // 2 videos per row

    col.innerHTML = `
      <div class="video-card">
        <div class="ratio ratio-16x9">
          <iframe src="${video.src}" title="${video.title}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div class="video-caption mt-2 text-center">
          <small>${video.title}</small>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  document.getElementById('pageNumberWishBus').textContent = currentWishBusPage;
  document.getElementById('totalPagesWishBus').textContent = Math.ceil(wishBusVideos.length / videosPerPage);
}

// ✅ Navigation
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('prevPageWishBus').addEventListener('click', () => {
    if (currentWishBusPage > 1) {
      currentWishBusPage--;
      renderWishBusVideos();
    }
  });

  document.getElementById('nextPageWishBus').addEventListener('click', () => {
    const totalPages = Math.ceil(wishBusVideos.length / videosPerPage);
    if (currentWishBusPage < totalPages) {
      currentWishBusPage++;
      renderWishBusVideos();
    }
  });

  renderWishBusVideos();
});
