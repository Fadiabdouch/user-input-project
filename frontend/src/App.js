import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const submit = async () => {
    if (!name || !message) return;

    await fetch("http://localhost:5000/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message })
    });

    setName("");
    setMessage("");
    loadMessages();
  };

  const loadMessages = async () => {
    const res = await fetch("http://localhost:5000/api/messages");
    setMessages(await res.json());
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>User Input Project</h2>

      <input
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br /><br />

      <button onClick={submit}>Submit</button>

      <h3>Messages</h3>
      {messages.map((m, i) => (
        <p key={i}><b>{m.name}:</b> {m.message}</p>
      ))}
    </div>
  );
}

export default App;
