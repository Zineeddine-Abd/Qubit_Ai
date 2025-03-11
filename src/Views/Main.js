import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../Animations/LoadingAnimation";
import qubitlogo from "../assets/qubit.png";
import sendimg from "../assets/send_icon.png";
import sendimgDisabled from '../assets/send-icon-disabled.png'
import usericon from "../assets/user.png";
import settingsicon from "../assets/settings.png";
import logoutIcon from '../assets/logout.png'
import logoutHoveredIcon from '../assets/logout_red.png'
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import deleteHoverdIcon from "../assets/delete_hoverd.png";
import editHoverdIcon from "../assets/edit_hoverd.png";
import { sendMsgToOpenAi } from "../Controllers/openai";
import axios from "axios";
import "./Main.css";

const Main = ({ token, userId, onLogout }) => {
  const navigate = useNavigate(); // Hook for navigation

  const [isHoveredLogout, setHoveredLogout] = useState(false);
  const handleLogout = () => {
    onLogout(); // Clear token and user data
    navigate("/auth"); // Redirect to login page
  };

  const [input, setInput] = useState("");
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Chat 1",
      messages: [
        {
          text: "Hello, I'm Qubit, your IT assistant chatbot",
          isBot: true,
        },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState(1);
  const [loading, setLoading] = useState(false);

  const msgEnd = useRef(null); //For Auto-Scrolling

  useEffect(() => {
    if (token) {
      axios
        .get("/loadChat", { params: { userId } })
        .then((response) => {
          setChats(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token, userId]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView();
  }, [chats.find((chat) => chat.id === activeChat)?.messages.length]);

  const handleSend = async () => {
    const text = input;
    setInput("");

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, { text, isBot: false }],
        };
      }
      return chat;
    });
    setChats(updatedChats);

    setLoading(true);

    const response = await sendMsgToOpenAi(
      text,
      chats.find((chat) => chat.id === activeChat).messages
    );

    setLoading(false);

    const updatedChatsWithResponse = updatedChats.map((chat) => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, { text: response, isBot: true }],
        };
      }
      return chat;
    });
    setChats(updatedChatsWithResponse);

    axios.post("/saveChat", { userId, chats: updatedChatsWithResponse });
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const addNewChat = () => {
    const newChatId = chats.length + 1;
    const newChat = {
      id: newChatId,
      name: `Chat ${newChatId}`,
      messages: [
        {
          text: "Hello, I'm Qubit, your IT assistant chatbot",
          isBot: true,
        },
      ],
    };

    const updatedChats = [...chats, newChat]
    setChats(updatedChats);
    setActiveChat(newChatId);

    axios.post("/saveChat", { userId, chats: updatedChats});
  };

  const switchChat = (chatId) => {
    setActiveChat(chatId);
  };

  const deleteChat = async (chatId) => {
    try {
      await axios.delete(`/deleteChat/${userId}/${chatId}`);
      setChats(chats.filter((chat) => chat.id !== chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const [editingChatId, setEditingChatId] = useState(null);
  const [newChatName, setNewChatName] = useState("");

  const [hoveredEditChat, setHoveredEditChat] = useState(null);
  const [hoveredDeleteChat, setHoveredDeleteChat] = useState(null);

  const MAX_CHARACTERS = 50;


  const startEditingChat = (chatId, currentName) => {
    setEditingChatId(chatId);
    setNewChatName(currentName);
  };

  const saveChatName = async (chatId) => {
    if (!newChatName.trim()) return; // Prevent empty names
  
    try {
      await axios.put(`/editChat/${userId}/${chatId}`, { name: newChatName });
  
      setChats(chats.map((chat) => 
        chat.id === chatId ? { ...chat, name: newChatName } : chat
      ));
  
      setEditingChatId(null);
    } catch (error) {
      console.error("Error editing chat:", error);
    }
  };
  
  const activeChatMessages = chats.find((chat) => chat.id === activeChat)?.messages || [];

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={qubitlogo} alt="logo" className="logo" />
            <span className="brand">Qubit Ai</span>
          </div>

          <button className="addButton" onClick={addNewChat}>
            add a new chat
          </button>

          <div className="chatList">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`chatListItem ${chat.id === activeChat ? "active" : ""}`}
                onClick={() => switchChat(chat.id)}
              >
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={newChatName}
                    autoFocus
                    onChange={(e) => setNewChatName(e.target.value)}
                    onBlur={() => saveChatName(chat.id)} // Save when clicking outside
                    maxLength={MAX_CHARACTERS}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveChatName(chat.id);
                      if (e.key === "Escape") setEditingChatId(null); // Cancel editing
                    }}
                    className="edit-input"
                  />
                ) : (
                  <span>{chat.name}</span>
                )}

                <div className="icons">
                  <img
                    src={hoveredEditChat === chat.id ? editHoverdIcon : editIcon}
                    alt="Edit"
                    className="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingChat(chat.id, chat.name);
                    }}
                    onMouseEnter={() => setHoveredEditChat(chat.id)} 
                    onMouseLeave={() => setHoveredEditChat(null)} 
                  />
                  <img
                    src={hoveredDeleteChat === chat.id ? deleteHoverdIcon : deleteIcon}
                    alt="Delete"
                    className="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    onMouseEnter={() => setHoveredDeleteChat(chat.id)} 
                    onMouseLeave={() => setHoveredDeleteChat(null)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={settingsicon} alt="" className="listitemsimg" />
            Settings
          </div>
        </div>
      </div>

      <div className="main">
          <img
            src={isHoveredLogout ? logoutHoveredIcon : logoutIcon}
            alt="Logout"
            className="logoutIcon"
            onClick={(e) => handleLogout()}
            onMouseEnter={() => setHoveredLogout(true)} 
            onMouseLeave={() => setHoveredLogout(false)} 
            >    
            </img>
        <div className="chats">
          {activeChatMessages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                src={message.isBot ? qubitlogo : usericon}
                className={"chat-img"}
                alt="icon"
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}

          {loading && (
            <div className="chat bot">
              <LoadingAnimation />
            </div>
          )}

          <div ref={msgEnd} />
        </div>

        <div className="chat-footer">
          <div className="inp">
            <input
              type="text"
              placeholder="What do you want to know ?"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            <button className={!input.trim() ? "send-disabled" : "send"} onClick={handleSend} disabled={!input.trim()}>
              <img src={!input.trim() ? sendimgDisabled : sendimg} alt="send" />
            </button>
          </div>
          <p>
            Qubit is designed to understand and respod to IT related topics, but
            it may produce some innaccurate informations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
