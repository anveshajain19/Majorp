import ChatLayout from "./ChatLayout";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function ChatWs({ username }) {
  const [cookie, , ] = useCookies(["token"]);
  const [cookieUsername, , ] = useCookies(["username"]);
  const [authToken, setAuthToken] = useState("");
  const [messages, setMessages] = useState([]); // Store all messages
  const [ws, setWs] = useState(null);

  // Initialize auth token from cookie
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  }, [cookie]);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

    socket.onopen = () => {
      console.log("WebSocket connection opened");

      // Join the chat room
      socket.send(
        JSON.stringify({
          command: "join",
          groupname: username,  // The room the user is joining
          user_name: cookieUsername["username"],
        })
      );
    };

    // Handle incoming messages, including previous chat history
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.warning) {
        alert("Something went wrong");
      } else if (data.messages) {
        // Receiving previous messages as an array when joining the room
        setMessages(data.messages); // Replace entire message history on join
      } else if (data.message) {
        // New message broadcast to the room
        const newMessage = {
          message: data.message,
          user_name: data.username,
        };
        // Append the new message to the messages array
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Set WebSocket instance to state
    setWs(socket);

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, [username, cookieUsername]);

  // Send a message to the WebSocket server
  const sendMessage = (text) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          command: "send",
          message: text,
          token: authToken,
          groupname: username,  // The room in which the message is sent
          user_name: cookieUsername["username"],
        })
      );
    } else {
      console.log("WebSocket not connected");
    }
  };

  return (
    <>
      {/* Pass messages and sendMessage function to ChatLayout */}
      <ChatLayout messages={messages} sendMessage={sendMessage} username={username} />
    </>
  );
}
