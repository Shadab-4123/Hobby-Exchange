import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { useAuth } from '../context/AuthContext';
import './ChatRoom.css';

const ChatRoom = ({ groupId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messageEndRef = useRef(null);

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://hobby-exchange.onrender.com/api';
        const res = await axios.get(`${API_URL}/groups/${groupId}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };
    fetchMessages();

    // Pusher Setup: Listen for new messages in the group
    const pusher = new Pusher('c1e05ef18df32ca6fa74', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe(`group-${groupId}`);
    channel.bind('new-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe(`group-${groupId}`);
    };
  }, [groupId]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://hobby-exchange.onrender.com/api';
      const res = await axios.post(
        `${API_URL}/groups/${groupId}/messages`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  useEffect(() => {
    // Scroll to the bottom when new message is added
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h3>Chat Room</h3>
      </div>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className="message">
            <strong>{msg.senderId ? msg.senderId.username : 'Unknown'}:</strong> {msg.message}
            </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
