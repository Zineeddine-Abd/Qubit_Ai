import React, { useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from "react-markdown";
import LoadingAnimation from "../Animations/LoadingAnimation";
import qubitlogo from "../assets/Logo_No_BG.png";
import sendimg from "../assets/send_icon.png";
import sendimgDisabled from '../assets/send-icon-disabled.png'
import usericon from "../assets/user.png";
import settingsicon from "../assets/setting.png";
import logoutIcon from '../assets/logout.png'
import logoutHoveredIcon from '../assets/logout_red.png'
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import deleteHoverdIcon from "../assets/delete_hoverd.png";
import editHoverdIcon from "../assets/edit_hoverd.png";
import homeIcon from '../assets/homeWhite.png'
import menuIcon from '../assets/menu.png';
import { sendMsgToOpenAi } from "../Controllers/openai";
import axios from "axios";
import "./Main.css";
import Sidebar from "../Components/Sidebar";

const Main = ({ token, userId, onLogout }) => {
  const navigate = useNavigate();

  const [isHoveredLogout, setHoveredLogout] = useState(false);
  const handleLogout = () => {
    setActiveChat(null);
    setInput("");
    setLoading(false);
    onLogout(); 
    axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/saveChat`, { userId, chats});
    
    navigate("/auth");
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

   // Toggle sidebar for mobile view
   const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);

  const [activeChat, setActiveChat] = useState(null);
  
  const [loading, setLoading] = useState(false);
  // Set active chat
  useEffect(() => {
    if (chats.length > 0 && activeChat === null) {
      setActiveChat(chats[0].id);
    } else if(chats.length === 0) {
        setActiveChat(null);
    }
  }, [chats]);
  
  // Load chats on mount
  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_BASEURL}/loadChat`, { params: { userId } })
        .then((response) => {
          const serverChats = response.data;

          if (Array.isArray(serverChats) && serverChats.length === 0) {
            addNewChat();
          }else{
            setChats(serverChats);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      
    }
  }, [token, userId]);

  const msgEnd = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    msgEnd.current?.scrollIntoView();
  }, [chats.find((chat) => chat.id === activeChat)?.messages?.length]);

  // Send message function
  const handleSend = async () => {
    const text = input.trim();
    if (!text || activeChat === null) return;
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

    axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/saveChat`, { userId, chats: updatedChatsWithResponse });
  };

  // Handle keyboard entry
  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const chatInputRef = useRef(null); // For focusing the input

  // Add new chat
  const addNewChat = () => {
    const newChatId = uuidv4();
    const newChat = {
      id: newChatId,
      name: `Chat ${chats.length + 1}`,
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
    setSidebarOpen(false); // Close sidebar on mobile after creating new chat

    axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/saveChat`, { userId, chats: updatedChats});

    // Focus on the input field after creating a new chat
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 100);
  };

  const switchChat = (chatId) => {
    setActiveChat(chatId);
    setSidebarOpen(false); // Close sidebar on mobile after switching chats

     // Focus on the input field after switching chats
     setTimeout(() => {
      chatInputRef.current?.focus();
    }, 100);
  };

  const deleteChat = async (chatId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_BASEURL}/deleteChat/${userId}/${chatId}`);
      setChats(chats.filter((chat) => chat.id !== chatId));
      setActiveChat(null)
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
      await axios.put(`${process.env.REACT_APP_BACKEND_BASEURL}/editChat/${userId}/${chatId}`, { name: newChatName });
  
      setChats(chats.map((chat) => 
        chat.id === chatId ? { ...chat, name: newChatName } : chat
      ));
  
      setEditingChatId(null);
    } catch (error) {
      console.error("Error editing chat:", error);
    }
  };
  
  const activeChatMessages = chats.find((chat) => chat.id === activeChat)?.messages || [];

  const [isSettingsOpen, setSettingsOpen] = useState(false); // State for settings sidebar
    
  const toggleSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="App">

      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu" style={{ width: '20px', height: '20px' }} />
      </button>

      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={handleOverlayClick}
      ></div>

      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
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

        <Sidebar isSettingsOpen={isSettingsOpen} toggleSettings={toggleSettings} />

        <div className="lowerSide">
          <div className="settings" onClick={() => navigate('/')}>
            <img src={homeIcon} alt="" className="homeimg"/>
            Home
          </div>

          <div className="settings" onClick={toggleSettings}>
            <img src={settingsicon} alt="" className="settingsimg"/>
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
          />    

        <div className="chats">
          {activeChatMessages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                src={message.isBot ? qubitlogo : usericon}
                className={"chat-img"}
                alt="icon"
              />
              <div className="txt"><ReactMarkdown>{message.text}</ReactMarkdown></div>
            </div>
          ))}

          {loading && (
            <div className="chat bot">
              <img src={qubitlogo} className={"chat-img"} alt="icon"/>
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
              ref={chatInputRef}
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
