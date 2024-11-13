"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import './Chatroom.css';
import { useUserContext } from "../context/userContext";

const socket = io("http://localhost:5000");

export default function ChatRoom() {
  const [groups, setGroups] = useState(["General", "Sports", "Tech"]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { user, userAvatar } = useUserContext();

  // Define group profile photos
  const groupPhotos = {
    General: "/avatars/avatar5.png",
    Sports: "/avatars/avatar5.png",
    Tech: "/avatars/avatar5.png",
  };

  useEffect(() => {
    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
    };
  }, []);

  const joinGroup = (group) => {
    if (currentGroup) {
      socket.emit("leaveGroup", currentGroup);
    }
    setCurrentGroup(group);
    socket.emit("joinGroup", group);
  };

  const sendMessage = () => {
    if (message && user?.username) {
      socket.emit("sendMessage", { 
        group: currentGroup, 
        user: user.profileName, 
        profilePhoto: userAvatar, // Send user profile photo with message
        message 
      });
      setMessage("");
    }
  };

  return (
    <div className="chatroom">
      <div className="groups">
        <h2>Join a Chat Group</h2>
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => joinGroup(group)}
            className={`group-button ${group === currentGroup ? "active" : ""} flex items-center gap-2`}
          >
            <img
              src={groupPhotos[group]} // Display the group-specific photo
              width={40}
              height={40}
              className="rounded-full object-cover"
              alt={`${group} chat`}
            />
            {group}
          </button>
        ))}
      </div>

      <div className="chat-window">
        {currentGroup && (
          <div className="chat-header flex items-center px-4 bg-[#002c5a] py-2 gap-2">
            <img
              src={groupPhotos[currentGroup]} // Display the active group's photo in the header
              width={40}
              height={40}
              className="rounded-full object-cover"
              alt={`${currentGroup} chat`}
            />
            <h3>{currentGroup}</h3>
          </div>
        )}
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <img src={msg.profilePhoto} alt="Profile" className="profile-photo" />
              <div className="message-content">
                <strong>{msg.user}</strong>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {currentGroup && (
          <div className="message-input">
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}
