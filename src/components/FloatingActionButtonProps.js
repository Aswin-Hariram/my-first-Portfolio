import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Portfolio AI Bot. How can I assist you with your portfolio today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatSize, setChatSize] = useState({ width: 360, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const messagesContainerRef = useRef(null);
  const resizeStartRef = useRef({ x: 0, y: 0 });
  const resizeStartSizeRef = useRef({ width: 0, height: 0 });

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Ensure scrolling works when reopening the chat
    setTimeout(scrollToBottom, 100);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;
  
    const newMessages = [...messages, { text: inputText, isBot: false }];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);
  
    try {
      const response = await fetch("https://my-portfolio-ai-bot.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input: inputText })
      });
  
      const data = await response.json();
  
      // Add a slight delay to make the loading indicator visible (min 500ms)
      const responseTime = Date.now();
      const minDelay = 500; // milliseconds
      
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, isBot: true }
        ]);
        setIsLoading(false);
      }, Math.max(0, minDelay - (Date.now() - responseTime)));
      
    } catch (error) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, something went wrong. Please try again.", isBot: true }
        ]);
        setIsLoading(false);
      }, 500);
      console.error("Error fetching bot response:", error);
    }
  };

  // Handle resizing
  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
    resizeStartRef.current = { x: e.clientX, y: e.clientY };
    resizeStartSizeRef.current = { width: chatSize.width, height: chatSize.height };
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    document.body.style.userSelect = 'none';
  };

  const handleResizeMove = (e) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - resizeStartRef.current.x;
    const deltaY = e.clientY - resizeStartRef.current.y;
    let newWidth = resizeStartSizeRef.current.width;
    let newHeight = resizeStartSizeRef.current.height;
    
    // Update dimensions based on resize direction
    if (resizeDirection.includes('e')) {
      newWidth = resizeStartSizeRef.current.width + deltaX;
    } else if (resizeDirection.includes('w')) {
      newWidth = resizeStartSizeRef.current.width - deltaX;
    }
    
    if (resizeDirection.includes('s')) {
      newHeight = resizeStartSizeRef.current.height + deltaY;
    } else if (resizeDirection.includes('n')) {
      newHeight = resizeStartSizeRef.current.height - deltaY;
    }
    
    // Apply constraints
    newWidth = Math.max(300, Math.min(newWidth, 600));
    newHeight = Math.max(400, Math.min(newHeight, 800));
    
    setChatSize({ width: newWidth, height: newHeight });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeDirection(null);
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.body.style.userSelect = '';
  };

  // Calculate text size based on message length
  const getMessageTextSize = (text) => {
    if (text.length > 300) return 13; // Very long messages
    if (text.length > 150) return 14; // Medium length messages
    return 15; // Default size for normal messages
  };
  
  return (
    <div className="floating-chat-container">
      {isOpen ? (
        <div className="chat-window" style={{ 
          width: `${chatSize.width}px`, 
          height: `${chatSize.height}px` 
        }}>
          {/* Resize Handles */}
          <div className="resize-handle resize-handle-n" onMouseDown={(e) => handleResizeStart(e, 'n')}></div>
          <div className="resize-handle resize-handle-ne" onMouseDown={(e) => handleResizeStart(e, 'ne')}></div>
          <div className="resize-handle resize-handle-e" onMouseDown={(e) => handleResizeStart(e, 'e')}></div>
          <div className="resize-handle resize-handle-se" onMouseDown={(e) => handleResizeStart(e, 'se')}></div>
          <div className="resize-handle resize-handle-s" onMouseDown={(e) => handleResizeStart(e, 's')}></div>
          <div className="resize-handle resize-handle-sw" onMouseDown={(e) => handleResizeStart(e, 'sw')}></div>
          <div className="resize-handle resize-handle-w" onMouseDown={(e) => handleResizeStart(e, 'w')}></div>
          <div className="resize-handle resize-handle-nw" onMouseDown={(e) => handleResizeStart(e, 'nw')}></div>
          
          <div className="chat-header">
            <div className="chat-title">
              <FaRobot className="bot-icon" />
              <span>Chat Assistant</span>
            </div>
            <button className="close-button" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>
          <div 
            className="messages-container" 
            ref={messagesContainerRef}
          >
            <div className="messages-wrapper">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-container ${message.isBot ? "bot-container" : "user-container"}`}
                >
                  {message.isBot && (
                    <div className="bot-avatar">
                      <FaRobot />
                    </div>
                  )}
                  <div className={`message ${message.isBot ? "bot-message" : "user-message"}`}>
                    <div 
                      className="message-text"
                      style={{ fontSize: `${getMessageTextSize(message.text)}px` }}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message-container bot-container">
                  <div className="bot-avatar">
                    <FaRobot />
                  </div>
                  <div className="message bot-message loading-message">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <form className="input-container" onSubmit={sendMessage}>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="message-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="send-button" 
              disabled={inputText.trim() === "" || isLoading}
            >
              <IoMdSend />
            </button>
          </form>
        </div>
      ) : (
        <button className="chat-button" onClick={toggleChat} aria-label="Open chat">
          <FaRobot />
        </button>
      )}

      <style jsx>{`
        .floating-chat-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .chat-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: white;
          color: #8a2be2;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .chat-button:hover {
          transform: scale(1.05);
          background-color: #f8f8f8;
          box-shadow: 0 8px 24px rgba(138, 43, 226, 0.15);
        }

        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        /* Resize handles */
        .resize-handle {
          position: absolute;
          z-index: 10;
        }

        .resize-handle-n {
          top: 0;
          left: 8px;
          right: 8px;
          height: 8px;
          cursor: n-resize;
        }

        .resize-handle-ne {
          top: 0;
          right: 0;
          width: 16px;
          height: 16px;
          cursor: ne-resize;
        }

        .resize-handle-e {
          top: 8px;
          right: 0;
          width: 8px;
          bottom: 8px;
          cursor: e-resize;
        }

        .resize-handle-se {
          bottom: 0;
          right: 0;
          width: 16px;
          height: 16px;
          cursor: se-resize;
        }

        .resize-handle-s {
          bottom: 0;
          left: 8px;
          right: 8px;
          height: 8px;
          cursor: s-resize;
        }

        .resize-handle-sw {
          bottom: 0;
          left: 0;
          width: 16px;
          height: 16px;
          cursor: sw-resize;
        }

        .resize-handle-w {
          top: 8px;
          left: 0;
          width: 8px;
          bottom: 8px;
          cursor: w-resize;
        }

        .resize-handle-nw {
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          cursor: nw-resize;
        }

        .chat-header {
          padding: 16px;
          background: linear-gradient(135deg, #9c42f5 0%, #8a2be2 100%);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          position: relative;
          z-index: 5;
        }

        .chat-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 18px;
        }

        .bot-icon {
          font-size: 18px;
        }

        .close-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 20px;
          transition: transform 0.2s ease;
        }

        .close-button:hover {
          transform: rotate(90deg);
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          background-color: #f9f9f9;
          position: relative;
          padding: 0;
          display: block;
          height: calc(100% - 140px); /* Header + input heights */
        }

        .messages-wrapper {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          width: 100%;
          box-sizing: border-box;
        }

        .message-container {
          display: flex;
          width: 100%;
          align-items: flex-start;
          max-width: 100%;
        }

        .bot-container {
          align-items: flex-start;
          padding-right: 40px;
        }

        .user-container {
          justify-content: flex-end;
          padding-left: 40px;
        }

        .bot-avatar {
          width: 32px;
          height: 32px;
          background-color: #f0e6fb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
          color: #8a2be2;
          font-size: 14px;
          box-shadow: 0 1px 3px rgba(138, 43, 226, 0.15);
        }

        .message {
          border-radius: 18px;
          line-height: 1.45;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.3s ease;
          overflow: hidden;
          position: relative;
          max-width: 100%;
          word-break: break-word;
        }

        .message-text {
          padding: 14px 18px;
          word-wrap: break-word;
          overflow-wrap: break-word;
          text-align: left;
          line-height: 1.5;
          /* Font size is now set dynamically */
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .bot-message {
          background-color: white;
          color: #333;
          border-bottom-left-radius: 5px;
          border: 1px solid #eaeaea;
          max-width: calc(100% - 44px);
        }

        .user-message {
          background: linear-gradient(135deg, #9c42f5 0%, #8a2be2 100%);
          color: white;
          border-bottom-right-radius: 5px;
          max-width: 100%;
        }

        .loading-message {
          padding: 10px 20px;
          min-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 70px;
        }

        .loading-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 2px 0;
        }

        .loading-dots span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #8a2be2;
          opacity: 0.7;
          animation: loadingDot 1.4s infinite ease-in-out both;
        }

        .loading-dots span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes loadingDot {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .input-container {
          padding: 16px;
          display: flex;
          gap: 10px;
          background-color: white;
          border-top: 1px solid #f0f0f0;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);
        }

        .message-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e6e6e6;
          border-radius: 24px;
          outline: none;
          font-size: 15px;
          transition: all 0.2s ease;
          background-color: white;
        }

        .message-input:focus {
          border-color: #8a2be2;
          box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.1);
        }

        .message-input:disabled {
          background-color: #f9f9f9;
          cursor: not-allowed;
        }

        .send-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9c42f5 0%, #8a2be2 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 18px;
          flex-shrink: 0;
        }

        .send-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #a354f7 0%, #9539ee 100%);
          transform: scale(1.05);
        }

        .send-button:disabled {
          background: linear-gradient(135deg, #d2b6ea 0%, #c8b1e8 100%);
          cursor: not-allowed;
        }

        /* Custom scrollbar styles */
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background-color: rgba(138, 43, 226, 0.2);
          border-radius: 10px;
          border: transparent;
        }

        /* Enhancements for longer messages */
        .bot-message .message-text {
          white-space: pre-line; /* Preserve line breaks while wrapping */
        }

        @media (max-width: 480px) {
          .chat-window {
            width: 320px !important; /* Override inline style for mobile */
            right: -15px;
          }
          
          .message-text {
            font-size: 14px !important; /* Override dynamic font size for mobile */
            padding: 12px 16px;
          }
          
          .bot-container {
            padding-right: 20px;
          }
          
          .user-container {
            padding-left: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default FloatingActionButton;