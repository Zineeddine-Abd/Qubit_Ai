const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Use secret from environment variables
const SECRET_KEY = process.env.JWT_SECRET;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/qubit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Chat Schema
const chatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  chats: [
    {
      id: { type: String, required: true },
      name: String,
      messages: [
        {
          text: String,
          isBot: Boolean,
        },
      ],
    },
  ],
});
const Chat = mongoose.model("Chat", chatSchema);

// signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the user already exists
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).send("User registered successfully");

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Server error");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "Username not found" });

    if (!(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: "Incorrect password" });

    // Generate JWT token using the secure secret key
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: "Login successful",
      token: token,
      username: user.username,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error");
  }
});

// Load Chat Route
app.get("/loadChat", async (req, res) => {
  const { userId } = req.query;
  const chat = await Chat.findOne({ userId });
  
  if (chat) {
    res.json(chat.chats);
  } else {
    res.status(404).send("No chats found");
  }
});

// Save Chat Route
app.post("/saveChat", async (req, res) => {
  const { userId, chats } = req.body;
  let chat = await Chat.findOne({ userId });

  if (!chat) {
    chat = new Chat({ userId, chats });
  } else {
    chat.chats = chats;
  }
  await chat.save();
  res.status(200).send("Chat saved");
});

// Edit Chat Name
app.put("/editChat/:userId/:chatId", async (req, res) => {
  const { userId, chatId } = req.params;
  const { name } = req.body;

  try {
    const chat = await Chat.findOne({ userId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const chatToEdit = chat.chats.find((c) => c.id === parseInt(chatId));
    if (!chatToEdit) return res.status(404).json({ message: "Chat not found" });

    chatToEdit.name = name;
    await chat.save();
    res.status(200).json({ message: "Chat renamed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Chat
app.delete("/deleteChat/:userId/:chatId", async (req, res) => {
  const { userId, chatId } = req.params;

  try {
    const chat = await Chat.findOne({ userId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    chat.chats = chat.chats.filter((c) => c.id !== parseInt(chatId));
    await chat.save();
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get if the user has a premium attribute


app.listen(5000, () => {
  console.log(`Server running`);
});
