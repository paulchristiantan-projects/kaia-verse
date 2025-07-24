// ✅ Must come first
const newsData = [
  {
    title: "KAIA on the P-pop Spotlight | One Music PH",
    url: "https://www.abs-cbn.com/entertainment/showbiz/music/2025/7/3/kaia-on-the-p-pop-spotlight-one-music-ph-1044",
    image: "assets/img/news/news5.jpg",
    date: "July 03, 2025",
    source: "ABS CBN News"
  },

  {
    title: "Rising P-pop girl group KAIA celebrates 3rd anniversary",
    url: "https://businessmirror.com.ph/2025/04/24/rising-p-pop-girl-group-kaia-celebrates-3rd-anniversary/",
    image: "assets/img/news/news4.jpg",
    date: "April 24, 2025",
    source: "Business Mirror"
  },

  {
    title: "How Indian Music Audiences Came to Love P-Pop Group KAIA",
    url: "https://rollingstonephilippines.com/music/p-pop-kaia-indian-music-audiences-vedanta-udaipur-world-music-festival/",
    image: "assets/img/news/news3.jpg",
    date: "February 11, 2025",
    source: "Rolling Stone Philippines"
  },

  {
    title: "KAIA Talks New Single ‘Walang Biruan’",
    url: "https://pulpmagazine.com/article/long_story/78",
    image: "assets/img/news/news6.jpg",
    date: "January 30, 2025",
    source: "PULP Magazine"
  },

  {
    title: "P-pop girl group KAIA shares music advice from SB19",
    url: "https://www.philstar.com/entertainment/2024/11/10/2398883/p-pop-girl-group-kaia-shares-music-advice-sb19",
    image: "assets/img/news/news12.jpg",
    date: "November 10, 2024",
    source: "PhilStar"
  },

  {
    title: "Walang Biruan: KAIA On Evolving As Songwriters, Working With Kindred, And Releasing More Music Soon",
    url: "https://billboardphilippines.com/music/features/walang-biruan-kaia-on-evolving-as-songwriters-working-with-kindred-and-releasing-more-music-soon-interview-2024/",
    image: "assets/img/news/news11.jpg",
    date: "October 23, 2024",
    source: "Billboard Philippines"
  },
  
  {
    title: "How P-pop girl group KAIA fuses fashion and music",
    url: "https://www.philstar.com/entertainment/2024/09/07/2383326/how-p-pop-girl-groupkaia-fuses-fashion-and-music",
    image: "assets/img/news/news8.jpg",
    date: "September 07, 2024",
    source: "PhilStar"
  },

  {
    title: "Ppop girl group KAIA collabs with designer Chynna Mamawal for special merch",
    url: "https://www.gmanetwork.com/entertainment/showbiznews/ppop-girl-group-kaia-collabs-with-designer-chynna-mamawal-for-special-merch/115474/#google_vignette",
    image: "assets/img/news/news13.jpg",
    date: "August 29, 2024",
    source: "GMA News"
  },

  {
    title: "KAIA finds strength in their fans and each other to keep going",
    url: "https://entertainment.inquirer.net/583796/kaia-finds-strength-in-their-fans-and-each-other-to-keep-going",
    image: "assets/img/news/news1.jpg",
    date: "July 19, 2024",
    source: "Inquirer.net"
  },
  {
    title: "KAIA’s goal as a P-pop girl group: Combine Filipino stories with their own",
    url: "https://entertainment.inquirer.net/563481/kaias-goal-as-a-p-pop-girl-group-combine-filipino-stories-with-their-own",
    image: "assets/img/news/news2.jpg",
    date: "June 26, 2024",
    source: "Inquirer.net"
  },

  {
    title: "P-Pop group KAIA to stage first major concert",
    url: "https://www.gmanetwork.com/entertainment/showbiznews/p-pop-group-kaia-to-stage-first-major-concert/107949/",
    image: "assets/img/news/news7.jpg",
    date: "December 14, 2023",
    source: "GMA News"
  },

  {
    title: "Angela as KAIA’s Leader Takes Things Day by Day and With Heart",
    url: "https://www.parcinq.com/post/angela-as-kaia-s-leader-takes-things-day-by-day-and-with-heart",
    image: "assets/img/news/news9.jpg",
    date: "June 28, 2023",
    source: "PARCINQ"
  },

  {
    title: "Filipino girl group KAIA finally drops debut single “BLAH BLAH”",
    url: "https://www.metroscenemag.com/2022/04/filipino-girl-group-kaia-finally-drops.html",
    image: "assets/img/news/news14.jpg",
    date: "April 8, 2022",
    source: "Metro Scene Magazine"
  },

  {
    title: "‘KAYA,’ the pre-debut single of SB19’s sister group, KAIA",
    url: "https://www.rappler.com/entertainment/music/sb19-sister-group-kaia-song-kaya/",
    image: "assets/img/news/news10.jpg",
    date: "December 10, 2021",
    source: "Rappler"
  },

  // Add more articles here...
];

// ✅ Then declare variables and functions that use it
const articlesPerNewsPage = 6;
let currentNewsPage = 1;

function renderNews() {
  const container = document.getElementById('newsContainer');
  container.innerHTML = '';

  const startIndex = (currentNewsPage - 1) * articlesPerNewsPage;
  const endIndex = startIndex + articlesPerNewsPage;
  const paginatedNews = newsData.slice(startIndex, endIndex);

  paginatedNews.forEach(article => {
    const card = document.createElement('div');
    card.className = 'col-md-4';

    card.innerHTML = `
      <div class="news-card">
        <a href="${article.url}" target="_blank">
          <img src="${article.image}" alt="${article.title}">
        </a>
        <div class="news-body">
          <a href="${article.url}" target="_blank">
            <h5>${article.title}</h5>
          </a>
          <small>${article.date} • ${article.source}</small>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  document.getElementById('pageNumberNews').textContent = currentNewsPage;
  document.getElementById('totalPagesNews').textContent = Math.ceil(newsData.length / articlesPerNewsPage);
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('prevPageNews').addEventListener('click', () => {
    if (currentNewsPage > 1) {
      currentNewsPage--;
      renderNews();
    }
  });

  document.getElementById('nextPageNews').addEventListener('click', () => {
    const totalPages = Math.ceil(newsData.length / articlesPerNewsPage);
    if (currentNewsPage < totalPages) {
      currentNewsPage++;
      renderNews();
    }
  });

  renderNews();
});
