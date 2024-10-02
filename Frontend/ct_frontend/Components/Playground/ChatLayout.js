import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { MdArrowBackIosNew } from "react-icons/md";
import { BiCodeCurly } from "react-icons/bi";
import Link from "next/link";

export default function ChatLayout({ messages, sendMessage, username }) {
  const [cookie, , ] = useCookies(["token"]);
  const [cookieUsername, , ] = useCookies(["username"]);
  const [authToken, setAuthToken] = useState("");
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  // Fetch the auth token from cookies
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  }, [cookie]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="container h-[68vh] relative pb-4 md:pb-0">
      {/* Username Bar */}
      <div className="container p-4 bg-gray-800 flex justify-between items-center rounded-t-lg shadow-lg">
        <Link href={`/playground/${username}`}>
          <a className="text-xl text-primary hover:text-indigo-400">
            <MdArrowBackIosNew />
          </a>
        </Link>

        <div className="flex justify-end items-center">
          <div className="rounded-full p-2 border-2 border-indigo-800">
            <BiCodeCurly />
          </div>
          <p className="mx-3 text-xl text-white">{cookieUsername["username"]}</p>
        </div>
      </div>

      {/* Chat Window */}
      <div
        id="chat-window"
        className="container h-full pt-8 px-4 md:px-16 overflow-y-scroll bg-gray-900"
      >
        <div className="timeline max-w-full m-auto flex flex-col relative">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">No messages yet</div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="timeline-item mb-4 w-full relative pl-4">
                <div
                  className={`timeline-dot h-4 w-4 ${
                    message.user_name === cookieUsername["username"] ? "bg-indigo-400" : "bg-gray-500"
                  } rounded-full absolute top-3 left-0`}
                ></div>
                <div className="timeline-content bg-gray-800 p-4 rounded-lg max-w-lg w-auto">
                  <h3 className="text-sm text-indigo-400">{message.user_name}</h3>
                  <p className="text-white">{message.message}</p>
                </div>
              </div>
            ))
          )}
          {/* Dummy div for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input and Send Button */}
      <div className="absolute w-full bottom-0 px-1 mt-3 bg-gray-800 py-2 rounded-b-lg">
        <div className="flex justify-between w-full">
          <input
            type="text"
            value={text}
            placeholder="Type your message..."
            className="rounded-md px-4 py-2 w-full bg-gray-700 text-white"
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage(text);
                setText("");
              }
            }}
          />
          <button
            className="ml-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-semibold"
            onClick={() => {
              sendMessage(text);
              setText("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
