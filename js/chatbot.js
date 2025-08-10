// === Element Selectors ===
const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatCloseBtn = document.getElementById("chatCloseBtn");
const chatContainer = document.getElementById("chatContainer");
const searchInput = document.getElementById("searchInput");
const chatMessages = document.getElementById("chatMessages");

// === Conversation Context ===
let conversationHistory = [];
let knowledgeBase = "";

// === Preload Knowledge Base ===
fetch("assets/text/info-data.txt")
  .then(res => res.text())
  .then(text => {
    knowledgeBase = text;
  })
  .catch(err => console.error("Error loading KB:", err));

// === UI Handlers ===
chatToggleBtn.addEventListener("click", () => {
  chatContainer.style.display = "flex";
});
chatCloseBtn.addEventListener("click", () => {
  chatContainer.style.display = "none";
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    askKAIA();
  }
});

// === Utility Functions ===
function appendChatBubble(message, type = "user", isHTML = false) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${type}`;
  bubble.style.textAlign = "justify";
  if (isHTML) {
    bubble.innerHTML = message;
  } else {
    bubble.textContent = message;
  }
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoading() {
  const loading = document.createElement("div");
  loading.className = "chat-bubble bot";
  loading.id = "loadingIndicator";
  loading.textContent = "⏳ KAIA is thinking...";
  chatMessages.appendChild(loading);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoading() {
  const loading = document.getElementById("loadingIndicator");
  if (loading) loading.remove();
}

// === Filter links to allow ONLY the approved whitelist links ===
function filterLinksToKBOnly(text) {
  const allowedLinks = [
    "https://kaia-verse.vercel.app/",

    "https://facebook.com/charlotteangelahermoso",
    "https://x.com/angelahermoso__",
    "https://instagram.com/charlottehermoso_",
    "https://tiktok.com/@angelahermoso_",

    "https://www.facebook.com/charice.hermoso",
    "https://x.com/ChariceHermoso",
    "https://www.instagram.com/charicehermoso/",
    "https://www.tiktok.com/@chariceehermoso",

    "https://x.com/KAIA_Members",
    "https://www.instagram.com/xvndrvgon/",
    "https://www.tiktok.com/@xandragon",

    "https://www.facebook.com/sophiamercado17",
    "https://x.com/sophiaamercado",
    "https://www.instagram.com/sophiaamercado_/",
    "https://www.tiktok.com/@sophiaamercado_",

    "https://www.facebook.com/chaefps",
    "https://x.com/charlottescrtr",
    "https://www.instagram.com/charlottescrtr/",
    "https://www.tiktok.com/@charlottescrtr",

    "https://www.youtube.com/watch?v=SqARYU7Xf0A",
    "https://www.youtube.com/watch?v=jY5--PXuAx0",
    "https://www.youtube.com/watch?v=i7b-r5yszw0",
    "https://www.youtube.com/watch?v=Z1Lfxww39h8",
    "https://www.youtube.com/watch?v=7_PGKzNVD4I",
    "https://www.youtube.com/watch?v=kGwgyKovR-w",

    "https://www.abs-cbn.com/entertainment/showbiz/music/2025/7/3/kaia-on-the-p-pop-spotlight-one-music-ph-1044",
    "https://businessmirror.com.ph/2025/04/24/rising-p-pop-girl-group-kaia-celebrates-3rd-anniversary/",
    "https://rollingstonephilippines.com/music/p-pop-kaia-indian-music-audiences-vedanta-udaipur-world-music-festival/",
    "https://pulpmagazine.com/article/long_story/78",
    "https://www.philstar.com/entertainment/2024/11/10/2398883/p-pop-girl-group-kaia-shares-music-advice-sb19",
    "https://billboardphilippines.com/music/features/walang-biruan-kaia-on-evolving-as-songwriters-working-with-kindred-and-releasing-more-music-soon-interview-2024/",
    "https://www.philstar.com/entertainment/2024/09/07/2383326/how-p-pop-girl-groupkaia-fuses-fashion-and-music",
    "https://www.gmanetwork.com/entertainment/showbiznews/ppop-girl-group-kaia-collabs-with-designer-chynna-mamawal-for-special-merch/115474/#google_vignette",
    "https://entertainment.inquirer.net/583796/kaia-finds-strength-in-their-fans-and-each-other-to-keep-going",
    "https://entertainment.inquirer.net/563481/kaias-goal-as-a-p-pop-girl-group-combine-filipino-stories-with-their-own",
    "https://www.gmanetwork.com/entertainment/showbiznews/p-pop-group-kaia-to-stage-first-major-concert/107949/",
    "https://www.parcinq.com/post/angela-as-kaia-s-leader-takes-things-day-by-day-and-with-heart",
    "https://www.metroscenemag.com/2022/04/filipino-girl-group-kaia-finally-drops.html",
    "https://www.rappler.com/entertainment/music/sb19-sister-group-kaia-song-kaya/",
    "https://entertainment.inquirer.net/622726/zack-tabudlo-on-why-he-loved-working-with-kaia-theyre-family",

    "https://www.instagram.com/paulchristiantan/"
  ];

  return text.replace(/https?:\/\/[^\s<]+/g, (link) => {
    const allowed = allowedLinks.some(base => link.startsWith(base));
    return allowed ? link : "[link removed not KAIA related]";
  });
}

function formatBotResponse(text) {
  const icons = {
    "facebook.com": '<i class="fab fa-facebook"></i>',
    "instagram.com": '<i class="fab fa-instagram"></i>',
    "twitter.com": '<i class="fab fa-twitter"></i>',
    "x.com": '<i class="fab fa-twitter"></i>',
    "youtube.com": '<i class="fab fa-youtube"></i>',
    "tiktok.com": '<i class="fab fa-tiktok"></i>',
    "linkedin.com": '<i class="fab fa-linkedin"></i>',
    "github.com": '<i class="fab fa-github"></i>'
  };
  const fallbackIcon = '<i class="fas fa-globe"></i>';

  // Step 1: Turn plain URLs into clickable links with icons
  const urlPattern = /(?<!href=")(https?:\/\/[^\s<]+)/g;
  let formatted = text.replace(urlPattern, (url) => {
    const host = Object.keys(icons).find(key => url.includes(key));
    const icon = host ? icons[host] : fallbackIcon;
    return `<a href="${url}" target="_blank" class="chat-link">${icon} ${url}</a>`;
  });

  // Step 2: Clean up existing <a> tags (remove raw URL text, keep username/path)
  formatted = formatted.replace(
    /<a\s+href="([^"]+)"[^>]*>(?:<i[^>]+><\/i>\s*)?(https?:\/\/)?([^\/<]+)\/?([^<]*)<\/a>/gi,
    (match, href, _, domain, path) => {
      const host = Object.keys(icons).find(key => href.includes(key));
      const icon = host ? icons[host] : fallbackIcon;
      let displayText = path || domain;
      return `<a href="${href}" target="_blank" class="chat-link">${icon} ${displayText}</a>`;
    }
  );

  // Step 3: Keep bullet points intact
  return formatted.replace(/^- (.*)$/gm, "<li>$1</li>");
}

// === Typewriter Effect for Streaming (Preserves HTML) ===
function typeWriterEffect(container, htmlContent, speed = 15) {
  let i = 0;
  const interval = setInterval(() => {
    container.innerHTML = htmlContent.slice(0, i);
    i++;
    if (i > htmlContent.length) clearInterval(interval);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, speed);
}

// === Ask KAIA Chat Function ===
async function askKAIA() {
  const message = searchInput.value.trim();
  if (!message) return;

  appendChatBubble(message, "user");
  conversationHistory.push({ role: "user", content: message });
  searchInput.value = "";

  showLoading();

  try {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const promptInstructions = `
    You are a helpful assistant for the KAIA Verse website.
    Today's date is ${today}.
    You must follow these rules when responding:
    
    1. ONLY answer questions using the knowledge base provided below.
    2. If the question is a greeting or casual chat (e.g., "hello", "how are you?", "good day"), respond casually and do NOT refer to the knowledge base.
    3. If asked for information in list form (e.g., songs, facts), use bullet points.
    4. If a question can be answered briefly, keep replies to 2–3 sentences. Only explain fully if the user asks for "details" or "explanation".
    5. Justify your responses (use text-align: justify in HTML output).
    6. If social media links are relevant, format them using icons and clickable links, remove parentheses or not needed symbols just the link itself only, do not repeat the link.
    7. Other than the links posted in the text file, do not show any other links.
    8. Do not show the details of the KAIA members unless stated otherwise.
    9. Make sure proper spacing of the text is maintained.
    10. When asked about their videos, you may send their YouTube links accordingly. You can send one only and pick randomly.
    11. Ensure there are spaces between each sentence and number to improve readability.
    12. When asked about articles or news, pick and show only one at random.
    13. Other than the links posted in the text file, do not show any other links.
    14. Strictly do not show links that are not in knowledge base file.
    If the question is unrelated to KAIA, say:
    "Sorry, I can only answer questions about KAIA and the KAIA Verse."
    
    Knowledge base:
    ${knowledgeBase}
    `;

    const trimmedHistory = conversationHistory.slice(-6);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://kaia-verse.vercel.app/",
        "X-Title": "KAIA Chat Assistant"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: promptInstructions },
          ...trimmedHistory
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, no response.";

    // === Apply KB-only link filtering here ===
    reply = filterLinksToKBOnly(reply);

    conversationHistory.push({ role: "assistant", content: reply });

    removeLoading();

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bot";
    chatMessages.appendChild(bubble);
    typeWriterEffect(bubble, formatBotResponse(reply), 5);

  } catch (err) {
    console.error(err);
    removeLoading();
    appendChatBubble("❌ Error getting response. Please try again.", "bot");
  }
}
