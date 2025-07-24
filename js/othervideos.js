// ✅ Other KAIA Video Data
const otherKaiaVideos = [
    {
        title: "KAIA – 'Walang Biruan' | Backyard Live Performance",
        src: "https://www.youtube.com/embed/BWTRSFt1Q9Y?list=RDBWTRSFt1Q9Y"
    },
    {
        title: "KAIA – 'Walang Biruan' | 2024 ROUND FESTIVAL",
        src: "https://www.youtube.com/embed/LCzAZcqjB24?list=RDLCzAZcqjB24"
    },
    {
        title: "KAIA – 'KAYA' | 2024 ROUND FESTIVAL",
        src: "https://www.youtube.com/embed/5RmBL_XBSEo?list=RD5RmBL_XBSEo"
    },
    {
        title: "KAIA – 'Walang Biruan' | All-Out Sundays",
        src: "https://www.youtube.com/embed/eCj85yJGptE?list=RDeCj85yJGptE"
    },
    {
        title: "KAIA 'Tanga' | All-Out Sundays",
        src: "https://www.youtube.com/embed/X_rJ6ww3Usw?list=RDX_rJ6ww3Usw"
    },
    {
        title: "KAIA | Concert Series | RX931",
        src: "https://www.youtube.com/embed/jUIy6b02PQM"
    },
    {
        title: "KAIA plays The Whisper Challenge",
        src: "https://www.youtube.com/embed/6tv0FueOgPQ"
    },
    {
        title: "Family Feud: P-POP Battle with KAIA and 1621 BC (Feb 5, 2024)",
        src: "https://www.youtube.com/embed/ouxyqIRMSmU"
    }
];

// ✅ Pagination Variables
const videosPerPageOther = 3;
let currentOtherPage = 1;

// ✅ Render Function
function renderOtherVideos() {
  const container = document.getElementById('otherVideosContainer');
  container.innerHTML = '';

  const start = (currentOtherPage - 1) * videosPerPageOther;
  const end = start + videosPerPageOther;
  const videosToShow = otherKaiaVideos.slice(start, end);

  videosToShow.forEach(video => {
    const col = document.createElement('div');
    col.className = 'col-md-4'; // 3 videos per row

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

  document.getElementById('pageNumberOther').textContent = currentOtherPage;
  document.getElementById('totalPagesOther').textContent = Math.ceil(otherKaiaVideos.length / videosPerPageOther);
}

// ✅ Navigation
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('prevPageOther').addEventListener('click', () => {
    if (currentOtherPage > 1) {
      currentOtherPage--;
      renderOtherVideos();
    }
  });

  document.getElementById('nextPageOther').addEventListener('click', () => {
    const totalPages = Math.ceil(otherKaiaVideos.length / videosPerPageOther);
    if (currentOtherPage < totalPages) {
      currentOtherPage++;
      renderOtherVideos();
    }
  });

  renderOtherVideos();
});
