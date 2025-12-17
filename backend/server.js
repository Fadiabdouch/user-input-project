const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

let messages = [];

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/message", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  messages.push({ name, message });
  res.json({ success: true });
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
