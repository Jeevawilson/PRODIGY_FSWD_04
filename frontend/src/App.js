import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setChat([...chat, { message, from: "You" }]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prevChat) => [...prevChat, { message: data.message, from: "Other" }]);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Real-Time Chat</h2>
      <div>
        {chat.map((msg, index) => (
          <p key={index}><strong>{msg.from}:</strong> {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
