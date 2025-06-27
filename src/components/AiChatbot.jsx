import React, { useState } from 'react';
import './AiChatbot.css';
import { URL } from '../constants';

const AiChatbot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const updatedMessages = [...messages, { sender: 'user', text: question }];
    setMessages(updatedMessages);
    setQuestion('');
    setIsTyping(true);

    try {
      const payload = {
        contents: [{ parts: [{ text: question }] }],
      };

      let response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      response = await response.json();
      const botReply = response.candidates[0].content.parts[0].text;

      setMessages([...updatedMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages([...updatedMessages, { sender: 'bot', text: 'Error fetching response.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      askQuestion();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {!isOpen && (
        <div className="chatbot-icon" onClick={() => setIsOpen(true)} title="Chat">
          💬
        </div>
      )}

      {isOpen && (
        <div className="chatbot-container open">
          <div className="chatbot-header" onClick={() => setIsOpen(false)}>
            ✖ Close
          </div>

          <div className="chatbot-body">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble bot-bubble">
                  <em>Typing...</em>
                </div>
              )}
            </div>

            <div className="chatbot-input-container">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything!"
              />
              <button onClick={askQuestion}>Ask</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChatbot;
