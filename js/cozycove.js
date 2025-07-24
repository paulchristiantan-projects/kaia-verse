// ✅ Cozy Cove Performance Video Data
const cozyCoveVideos = [
  {
    title: "Walang Biruan (Live at The Cozy Cove) - KAIA",
    src: "https://www.youtube.com/embed/EepNXI_GzC8?list=RDEepNXI_GzC8"
  },
  {
    title: "YOU DID IT (Live at The Cozy Cove) - KAIA",
    src: "https://www.youtube.com/embed/VpvCC4gXOno?list=RDVpvCC4gXOno"
  }
  // Add more as needed
];

// ✅ Pagination Variables
const videosPerPageCozy = 2;
let currentCozyCovePage = 1;

// ✅ Render Function
function renderCozyCoveVideos() {
  const container = document.getElementById('cozyCoveContainer');
  container.innerHTML = '';

  const start = (currentCozyCovePage - 1) * videosPerPageCozy;
  const end = start + videosPerPageCozy;
  const videosToShow = cozyCoveVideos.slice(start, end);

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

  document.getElementById('pageNumberCozy').textContent = currentCozyCovePage;
  document.getElementById('totalPagesCozy').textContent = Math.ceil(cozyCoveVideos.length / videosPerPageCozy);
}

// ✅ Navigation
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('prevPageCozy').addEventListener('click', () => {
    if (currentCozyCovePage > 1) {
      currentCozyCovePage--;
      renderCozyCoveVideos();
    }
  });

  document.getElementById('nextPageCozy').addEventListener('click', () => {
    const totalPages = Math.ceil(cozyCoveVideos.length / videosPerPageCozy);
    if (currentCozyCovePage < totalPages) {
      currentCozyCovePage++;
      renderCozyCoveVideos();
    }
  });

  renderCozyCoveVideos();
});
