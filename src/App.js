import "./App.css";
import LoadingAnimation from "./LoadingAnimation";
import qubitlogo from "./assets/Qubit_Logo.png";
import sendimg from "./assets/send_icon.png";
import usericon from "./assets/user-icon.png";
import settingsicon from "./assets/settings.png";
import { sendMsgToOpenAi } from "./openai";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello, I'm Qubit, your IT assistant chatbot",
      isBot: true,
    },
  ]);

  const msgEnd = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);

    setLoading(true);

    const response = await sendMsgToOpenAi(text);

    setLoading(false);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, isBot: true },
    ]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={qubitlogo} alt="logo" className="logo" />
            <span className="brand">Qubit Ai</span>
          </div>

          <button
            className="addButton"
            onClick={() => {
              window.location.reload();
            }}
          >
            add a new chat
          </button>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={settingsicon} alt="" className="listitemsimg" />
            Settings
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
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

            <button className="send" onClick={handleSend}>
              <img src={sendimg} alt="send" />
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
}

export default App;
