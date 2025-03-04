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
      id: Number,
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
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User already exists");
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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid credentials");
    }

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

app.listen(5000, () => {
  console.log(`Server running`);
});
