import React, { useState, useEffect } from 'react';
import { getAssetPath } from '../utils/assetHelper';

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 3;

  useEffect(() => {
    // Real KAIA news articles
    const articles = [
      {
        id: 1,
        title: "KAIA on the P-pop Spotlight | One Music PH",
        date: "July 03, 2025",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news5.jpg'),
        source: "ABS CBN News",
        url: "https://www.abs-cbn.com/entertainment/showbiz/music/2025/7/3/kaia-on-the-p-pop-spotlight-one-music-ph-1044",
        excerpt: "KAIA takes the spotlight on One Music PH, showcasing their journey and latest music to P-pop fans.",
        content: "KAIA graces One Music PH's spotlight feature, sharing insights about their musical evolution and connecting with their growing fanbase through their authentic P-pop sound."
      },
      {
        id: 2,
        title: "Rising P-pop girl group KAIA celebrates 3rd anniversary",
        date: "April 24, 2025",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news4.jpg'),
        source: "Business Mirror",
        url: "https://businessmirror.com.ph/2025/04/24/rising-p-pop-girl-group-kaia-celebrates-3rd-anniversary/",
        excerpt: "KAIA marks their third anniversary as a group, reflecting on their journey and achievements in the P-pop industry.",
        content: "The rising P-pop girl group KAIA celebrates their third anniversary, marking three years of growth, music, and connecting with their dedicated ZAIA fanbase."
      },
      {
        id: 3,
        title: "How Indian Music Audiences Came to Love P-Pop Group KAIA",
        date: "February 11, 2025",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news3.jpg'),
        source: "Rolling Stone Philippines",
        url: "https://rollingstonephilippines.com/music/p-pop-kaia-indian-music-audiences-vedanta-udaipur-world-music-festival/",
        excerpt: "KAIA's international appeal reaches India, capturing hearts at the Vedanta Udaipur World Music Festival.",
        content: "Rolling Stone Philippines explores how KAIA's music transcended borders, winning over Indian audiences at the prestigious Vedanta Udaipur World Music Festival."
      },
      {
        id: 4,
        title: "KAIA Talks New Single 'Walang Biruan'",
        date: "January 30, 2025",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news6.jpg'),
        source: "PULP Magazine",
        url: "https://pulpmagazine.com/article/long_story/78",
        excerpt: "KAIA opens up about their latest single 'Walang Biruan' and the creative process behind the track.",
        content: "In an exclusive interview with PULP Magazine, KAIA discusses the inspiration and meaning behind their heartfelt single 'Walang Biruan'."
      },
      {
        id: 5,
        title: "P-pop girl group KAIA shares music advice from SB19",
        date: "November 10, 2024",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news12.jpg'),
        source: "PhilStar",
        url: "https://www.philstar.com/entertainment/2024/11/10/2398883/p-pop-girl-group-kaia-shares-music-advice-sb19",
        excerpt: "KAIA reveals valuable music industry advice they received from their senior group SB19.",
        content: "The PhilStar features KAIA sharing the wisdom and guidance they've received from SB19, highlighting the supportive nature of the P-pop community."
      },
      {
        id: 6,
        title: "Walang Biruan: KAIA On Evolving As Songwriters, Working With Kindred, And Releasing More Music Soon",
        date: "October 23, 2024",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news11.jpg'),
        source: "Billboard Philippines",
        url: "https://billboardphilippines.com/music/features/walang-biruan-kaia-on-evolving-as-songwriters-working-with-kindred-and-releasing-more-music-soon-interview-2024/",
        excerpt: "Billboard Philippines interviews KAIA about their songwriting evolution and collaboration with Kindred.",
        content: "Billboard Philippines sits down with KAIA to discuss their growth as songwriters, their collaboration with Kindred, and upcoming music releases."
      },
      {
        id: 7,
        title: "How P-pop girl group KAIA fuses fashion and music",
        date: "September 07, 2024",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news8.jpg'),
        source: "PhilStar",
        url: "https://www.philstar.com/entertainment/2024/09/07/2383326/how-p-pop-girl-groupkaia-fuses-fashion-and-music",
        excerpt: "KAIA showcases how they seamlessly blend fashion and music in their artistic expression.",
        content: "PhilStar explores KAIA's unique approach to combining fashion and music, creating a distinctive visual and auditory experience for their fans."
      },
      {
        id: 8,
        title: "Ppop girl group KAIA collabs with designer Chynna Mamawal for special merch",
        date: "August 29, 2024",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news13.jpg'),
        source: "GMA News",
        url: "https://www.gmanetwork.com/entertainment/showbiznews/ppop-girl-group-kaia-collabs-with-designer-chynna-mamawal-for-special-merch/115474/",
        excerpt: "KAIA partners with designer Chynna Mamawal for an exclusive merchandise collaboration.",
        content: "GMA News reports on KAIA's exciting collaboration with renowned designer Chynna Mamawal, creating special merchandise for their fans."
      },
      {
        id: 9,
        title: "KAIA finds strength in their fans and each other to keep going",
        date: "July 19, 2024",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news1.jpg'),
        source: "Inquirer.net",
        url: "https://entertainment.inquirer.net/583796/kaia-finds-strength-in-their-fans-and-each-other-to-keep-going",
        excerpt: "KAIA reflects on finding strength through their bond with fans and each other during challenging times.",
        content: "Inquirer.net features KAIA's heartfelt discussion about drawing strength from their ZAIA fanbase and their sisterhood as a group."
      },
      {
        id: 10,
        title: "KAIA's goal as a P-pop girl group: Combine Filipino stories with their own",
        date: "June 26, 2024",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news2.jpg'),
        source: "Inquirer.net",
        url: "https://entertainment.inquirer.net/563481/kaias-goal-as-a-p-pop-girl-group-combine-filipino-stories-with-their-own",
        excerpt: "KAIA shares their mission to blend Filipino narratives with their personal stories through music.",
        content: "Inquirer.net explores KAIA's artistic vision of weaving Filipino culture and stories into their music while maintaining their authentic voice."
      },
      {
        id: 11,
        title: "P-Pop group KAIA to stage first major concert",
        date: "December 14, 2023",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news7.jpg'),
        source: "GMA News",
        url: "https://www.gmanetwork.com/entertainment/showbiznews/p-pop-group-kaia-to-stage-first-major-concert/107949/",
        excerpt: "KAIA announces their first major concert, marking a significant milestone in their career.",
        content: "GMA News covers KAIA's announcement of their first major concert, representing a major step forward in their musical journey."
      },
      {
        id: 12,
        title: "Angela as KAIA's Leader Takes Things Day by Day and With Heart",
        date: "June 28, 2023",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news9.jpg'),
        source: "PARCINQ",
        url: "https://www.parcinq.com/post/angela-as-kaia-s-leader-takes-things-day-by-day-and-with-heart",
        excerpt: "KAIA's leader Angela shares her leadership philosophy and approach to guiding the group.",
        content: "PARCINQ features an intimate look at Angela's leadership style, highlighting her day-by-day approach and heartfelt dedication to KAIA."
      },
      {
        id: 13,
        title: "Filipino girl group KAIA finally drops debut single 'BLAH BLAH'",
        date: "April 8, 2022",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news14.jpg'),
        source: "Metro Scene Magazine",
        url: "https://www.metroscenemag.com/2022/04/filipino-girl-group-kaia-finally-drops.html",
        excerpt: "KAIA makes their official debut with the release of their first single 'BLAH BLAH'.",
        content: "Metro Scene Magazine covers KAIA's highly anticipated debut with their first official single 'BLAH BLAH', marking the beginning of their professional music career."
      },
      {
        id: 14,
        title: "'KAYA,' the pre-debut single of SB19's sister group, KAIA",
        date: "December 10, 2021",
        image: getAssetPath('%PUBLIC_URL%/assets/img/news/news10.jpg'),
        source: "Rappler",
        url: "https://www.rappler.com/entertainment/music/sb19-sister-group-kaia-song-kaya/",
        excerpt: "KAIA releases their pre-debut single 'KAYA', introducing themselves as SB19's sister group.",
        content: "Rappler features KAIA's pre-debut single 'KAYA', marking their first introduction to the music scene as the sister group of P-pop pioneers SB19."
      }
    ];
    
    setNewsArticles(articles);
    setLoading(false);
  }, []);

  const totalPages = Math.ceil(newsArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = newsArticles.slice(startIndex, startIndex + articlesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <section className="content-section" id="news">
        <div className="container px-4 px-lg-5">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-section" id="news">
      <div className="container px-4 px-lg-5">
        <div className="content-section-heading text-center mb-4">
          <h2 className="fade-in">News</h2>
        </div>

        <div className="row gy-4">
          {currentArticles.map((article, index) => (
            <div key={article.id} className="col-md-6 col-lg-4">
              <div 
                className={`card h-100 ${index % 2 === 0 ? 'fade-in' : 'slide-in-left'}`}
                style={{
                  border: 'none',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(214, 51, 132, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                }}
              >
                <img 
                  src={article.image} 
                  className="card-img-top" 
                  alt={article.title}
                  style={{
                    height: '200px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg');
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 
                    className="card-title" 
                    style={{ 
                      color: 'var(--kaia-primary)', 
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    }}
                  >
                    {article.title}
                  </h5>
                  <p 
                    className="card-text text-muted small mb-2"
                    style={{ fontSize: '0.9rem' }}
                  >
                    {article.date}
                  </p>
                  <p 
                    className="card-text flex-grow-1"
                    style={{ 
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      color: '#666'
                    }}
                  >
                    {article.excerpt}
                  </p>
                  <button 
                    className="btn mt-auto"
                    style={{
                      background: 'var(--kaia-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '0.5rem 1.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#b8296b';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'var(--kaia-primary)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                    onClick={() => {
                      // Open article in modal
                      const modal = document.createElement('div');
                      modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 9999;
                        padding: 2rem;
                      `;
                      
                      const content = document.createElement('div');
                      content.style.cssText = `
                        background: white;
                        border-radius: 15px;
                        padding: 2rem;
                        max-width: 600px;
                        max-height: 80vh;
                        overflow-y: auto;
                        position: relative;
                      `;
                      
                      content.innerHTML = `
                        <button style="
                          position: absolute;
                          top: 1rem;
                          right: 1rem;
                          background: none;
                          border: none;
                          font-size: 1.5rem;
                          cursor: pointer;
                          color: #999;
                        " onclick="document.body.removeChild(this.closest('.modal-overlay'))">&times;</button>
                        <h3 style="color: var(--kaia-primary); margin-bottom: 1rem;">${article.title}</h3>
                        <p style="color: #666; margin-bottom: 0.5rem;">${article.date} • ${article.source}</p>
                        <img src="${article.image}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;" onerror="this.src='${getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg')}'" />
                        <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;">${article.content}</p>
                        <a href="${article.url}" target="_blank" style="color: var(--kaia-primary); text-decoration: none; font-weight: bold;">Read Full Article →</a>
                      `;
                      
                      modal.className = 'modal-overlay';
                      modal.appendChild(content);
                      document.body.appendChild(modal);
                      
                      modal.onclick = (e) => {
                        if (e.target === modal) {
                          document.body.removeChild(modal);
                        }
                      };
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-news text-center mt-4">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{
              background: currentPage === 1 ? '#ccc' : 'var(--kaia-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '0.5rem 1rem',
              margin: '0 0.5rem',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            &laquo; Prev
          </button>
          
          <span style={{ 
            margin: '0 1rem', 
            fontWeight: 'bold',
            color: 'var(--kaia-primary)'
          }}>
            {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              background: currentPage === totalPages ? '#ccc' : 'var(--kaia-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '0.5rem 1rem',
              margin: '0 0.5rem',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;