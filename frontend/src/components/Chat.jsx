import React, { useState, useEffect } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 發送新消息到伺服器
    // socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="輸入您的消息"
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit">發送</button>
      </form>
    </div>
  );
}

export default Chat;
