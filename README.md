![Banner](./Qubit_Banner.png)

# Qubit - IT-Related Chatbot

**Qubit** is an intelligent, structured, and versatile IT chatbot designed to respond to a wide range of IT-related topics. With Qubit, users can easily explore technical concepts, and enhance their understanding of various IT domains.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [How It Works](#how-it-works)
4. [Installation](#installation)
5. [API Documentation](#api-documentation)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [Contact](#contact)

---

## Overview

Qubit is a sophisticated IT chatbot built to provide answers in a structured format. When a user sends a request, it processes the query, searches for the relevant information, and then structures the response as follows:

1. **Introduction**: General overview of the concept or topic.
2. **How It Works**: Detailed explanation of how the concept works.
3. **Use Cases**: Real-world applications or scenarios where the concept is applied.
4. **Challenges & Best Practices**: Highlight common issues and provide solutions to overcome them.  
5. **Summary**: concise recap and other topics suggestion.   
---

## Features

- **Structured Responses**: Qubit delivers its responses in a clear, organized structure to help users easily understand concepts.
- **IT-Focused**: Only responds to IT-related topics, ensuring that the answers are relevant and focused.
- **User Authentication**: Uses JWT for secure for secure token-based authentication and Bcrypt for password encryption.
- **Chat History**: Saves chat history for users to continue conversations later.
- **Interactive Conversations**: Engages users with multi-step conversations and context for a deeper dive into technical topics.
---

## How It Works

Qubit leverages the latest GPT-4o model, fine-tuned through prompt engineering techniques and context-aware processing to deliver structured and precise answers.

When a user submits a request, Qubit follows a systematic approach:

1. **Analyzing the Query**: It identifies key terms and the intent behind the request using chat context.
2. **Retrieving Relevant Information**: It searches for accurate and relevant IT-related data.
3. **Structuring the Response**: The answer is formatted in a clear and structured manner, ensuring clarity and ease of understanding.
---

## Installation

To run Qubit locally, follow these steps:

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB Atlas or a local MongoDB instance.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Zineeddine-Abd/Qubit_Ai.git
   cd Qubit_Ai

2. install dependecies In The Clien's folder: change dirrectory to Client and install dependecies
   ```bash
   cd Client
   npm install

3. install dependecies In The Servers's folder: change dirrectory to Server and install dependecies
   ```bash
   cd Server
   npm install

4. Set Up Environment Variables Of The Client's Folder: Create a .env file in the Client directory with the following:
   ```bash
   REACT_APP_OPENAI_KEY=your_openai_key
   REACT_APP_BACKEND_BASEURL=http://localhost:5000

5. Set Up Environment Variables Of The Server's Folder: Create a .env file in the Server directory with the following:
   ```bash
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   FRONTEND_BASEURL=http://localhost:3000

6. Start the server:
   ```bash
   cd Server
   npm start

7. Start the app:
   ```bash
   cd Client
   npm start

## API Documentation
(For Later)

## Technologies used
- React: for building the frontend UI.
- Node.js: Server-side runtime.
- Express: for the backend API.
- MongoDB & Mongoose: NoSQL database and ORM for data management.
- JWT: Secure authentication using JSON Web Tokens.
- Bcrypt: Password hashing for security.
- CORS: Handling cross-origin requests.

## Contributing
We welcome contributions to make Qubit even better! If you'd like to help, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Test your changes.
5. Submit a pull request with a description of your changes.

## Contact
For more information or inquiries, feel free to contact me via [abdeladimzineeddine@gmail.com] or open an issue in the repository.



