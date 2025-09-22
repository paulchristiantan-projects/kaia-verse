import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm KAIAverse AI. Ask me anything about KAIA! 🎵",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatBotResponse = (text) => {
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

    return withLinks.replace(/^- (.*)$/gm, "<li>$1</li>").replace(/<li>/g, "<ul><li>").replace(/<\/li>(?!<li>)/g, "</li></ul>");
  };

  const getAIResponse = async (message) => {
    try {
      const infoRes = await fetch("/assets/text/info-data.txt");
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
7. Other than the links posted in the text file, do not show any other links.
8. Do not show the details of the KAIA members unless stated otherwise.
9. Make sure proper spacing of the text is maintained.
10. When asked about their videos, you may send their YouTube links accordingly. You can send one only and pick randomly.
11. Ensure there are spaces between each sentence and number to improve readability.
12. When asked about articles or news, pick and show only one at random.
If the question is unrelated to KAIA, say:
"Sorry, I can only answer questions about KAIA and the KAIA Verse."

Knowledge base:
${infoText}
      `;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
          "HTTP-Referer": "https://kaia-verse.vercel.app/",
          "X-Title": "KAIA Chat Assistant"
        },
        body: JSON.stringify({
          model: "google/gemma-2-9b-it:free",
          messages: [
            { role: "system", content: promptInstructions },
            { role: "user", content: message }
          ],
          temperature: 0.3,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);
      
      // Check if response has the expected structure
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const content = data.choices[0].message.content;
        console.log('Message content:', content);
        const trimmedContent = content?.trim();
        
        // Check if content is empty or just whitespace
        if (!trimmedContent || trimmedContent.length === 0) {
          return "I'm having trouble generating a response. Could you try rephrasing your question?";
        }
        
        return trimmedContent;
      }
      
      // If no choices, check for error
      if (data.error) {
        console.error('API Error:', data.error);
        return `API Error: ${data.error.message || 'Unknown error'}`;
      }
      
      return "Unexpected response format from AI.";
    } catch (err) {
      console.error(err);
      return "❌ Error getting response. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const messageText = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getAIResponse(messageText);
      const formattedResponse = formatBotResponse(response);
      
      const botResponse = {
        id: messages.length + 2,
        text: formattedResponse,
        sender: 'bot',
        timestamp: new Date(),
        isHTML: true
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = {
        id: messages.length + 2,
        text: "❌ Error getting response. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
    
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        className="chat-toggle-btn"
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--kaia-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '1rem 1.5rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 20px rgba(214, 51, 132, 0.3)',
          fontSize: '0.9rem'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#b8296b';
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = '0 8px 25px rgba(214, 51, 132, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'var(--kaia-primary)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 5px 20px rgba(214, 51, 132, 0.3)';
        }}
      >
        💬 Chat with KAIAverse
      </button>

      <div
        className={`chat-container ${isOpen ? 'active' : ''}`}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.3s ease'
        }}
      >
        <div
          className="chat-header"
          style={{
            background: 'var(--kaia-primary)',
            color: 'white',
            padding: '1rem',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>Ask KAIAverse AI</span>
          <button
            onClick={toggleChat}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0',
              lineHeight: '1'
            }}
          >
            ×
          </button>
        </div>

        <div
          className="chat-messages"
          style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {message.isHTML ? (
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '0.75rem 1rem',
                    borderRadius: '15px',
                    background: message.sender === 'user' ? 'var(--kaia-primary)' : '#f1f1f1',
                    color: message.sender === 'user' ? 'white' : '#333',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    wordWrap: 'break-word',
                    textAlign: 'justify'
                  }}
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
              ) : (
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '0.75rem 1rem',
                    borderRadius: '15px',
                    background: message.sender === 'user' ? 'var(--kaia-primary)' : '#f1f1f1',
                    color: message.sender === 'user' ? 'white' : '#333',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    wordWrap: 'break-word',
                    textAlign: 'justify'
                  }}
                >
                  {message.text}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '15px',
                  background: '#f1f1f1',
                  color: '#666',
                  fontSize: '0.9rem'
                }}
              >
                <span className="typing-indicator">
                  KAIAverse AI is typing
                  <span style={{ animation: 'blink 1.4s infinite' }}>...</span>
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div
          className="chat-input-container"
          style={{
            padding: '1rem',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '0.5rem'
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask something about KAIA..."
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '25px',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            style={{
              background: 'var(--kaia-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              opacity: (!inputValue.trim() || isTyping) ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            Send
          </button>
        </div>
      </div>


    </>
  );
};

export default ChatBot;