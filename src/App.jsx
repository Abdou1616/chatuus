import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
function App() {
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const server = io("http://localhost:5000");

  useEffect(() => {
    server.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      server.off("message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    server.emit("message", { sender, message });
    setMessage("");
  };

  return (
    <div className="container">
      <h3>Chat App</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}</strong>: {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
