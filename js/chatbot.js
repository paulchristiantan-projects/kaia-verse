// === Element Selectors ===
const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatCloseBtn = document.getElementById("chatCloseBtn");
const chatContainer = document.getElementById("chatContainer");
const searchInput = document.getElementById("searchInput");
const chatMessages = document.getElementById("chatMessages");

// === Conversation Context ===
let conversationHistory = [];

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

function formatBotResponse(text) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const icons = {
    "instagram.com": '<i class="fab fa-instagram"></i>',
    "twitter.com": '<i class="fab fa-twitter"></i>',
    "facebook.com": '<i class="fab fa-facebook"></i>',
    "youtube.com": '<i class="fab fa-youtube"></i>',
    "tiktok.com": '<i class="fab fa-tiktok"></i>',
  };

  const withLinks = text.replace(urlPattern, (url) => {
    const host = Object.keys(icons).find((key) => url.includes(key));
    const icon = host ? icons[host] : '<i class="fas fa-link"></i>';
    return `<a href="${url}" target="_blank" class="chat-link">${icon} ${url}</a>`;
  });

  // Format bullets (optional)
  return withLinks.replace(/^- (.*)$/gm, "<li>$1</li>").replace(/<li>/g, "<ul><li>").replace(/<\/li>(?!<li>)/g, "</li></ul>");
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
    const infoRes = await fetch("assets/text/info-data.txt");
    const infoText = await infoRes.text();

    const promptInstructions = `
You are a helpful assistant for the KAIA Verse website.
You must follow these rules when responding:

1. ONLY answer questions using the knowledge base provided below.
2. If the question is a greeting or casual chat (e.g., "hello", "how are you?", "good day"), respond casually and do NOT refer to the knowledge base.
3. If asked for information in list form (e.g., songs, facts), use bullet points.
4. If a question can be answered briefly, keep replies to 2–3 sentences. Only explain fully if the user asks for "details" or "explanation".
5. Justify your responses (use text-align: justify in HTML output).
6. If social media links are relevant, format them using icons and clickable links, remove parentheses or not needed symbols just the link itself only, do not repeat the link:
   - [Facebook] "https://facebook.com/..."
   - [Instagram] "https://instagram.com/..."
   - [X] "https://x.com/..."
   - [TikTok] "https://tiktok.com/..."
7. Other than the links posted in the text file, do not show any other links.
8. Do not show the details of the KAIA members unless stated otherwise.
9. Make sure proper spacing of the text is maintained.
10. When asked about their videos, you may send their YouTube links accordingly. You can send at least one and pick randomly

If the question is unrelated to KAIA, say:
"Sorry, I can only answer questions about KAIA and the KAIA Verse."

Knowledge base:
${infoText}
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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", // Replace this with browser-safe key
        "Content-Type": "application/json",
        // "HTTP-Referer": "http://127.0.0.1:5500/", // or your deployed domain 
        "HTTP-Referer": "https://kaia-verse.vercel.app/", // or your deployed domain
        "X-Title": "KAIA Chat Assistant"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: promptInstructions },
          ...conversationHistory
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, no response.";
    conversationHistory.push({ role: "assistant", content: reply });
    removeLoading();
    appendChatBubble(formatBotResponse(reply), "bot", true);

  } catch (err) {
    console.error(err);
    removeLoading();
    appendChatBubble("❌ Error getting response. Please try again.", "bot");
  }
}
