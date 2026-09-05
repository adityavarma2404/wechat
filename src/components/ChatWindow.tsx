import { Box, IconButton, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, type KeyboardEvent } from "react";
import { useParams } from "react-router-dom";
import "./components.scss";

type ChatMessage = {
  id: number;
  text: string;
  direction: "sent" | "received";
};

const initialMessages: ChatMessage[] = [
  { id: 1, text: "Hi", direction: "sent" },
  { id: 2, text: "Hello there", direction: "received" },
  { id: 3, text: "How are you?", direction: "sent" },
  { id: 4, text: "I am good, what about you?", direction: "received" },
];

export function ChatWindow() {
  const { chatId } = useParams<{ chatId: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  function handleSendMessage() {
    const text = message.trim();

    if (!text || !chatId) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), text, direction: "sent" },
    ]);
    setMessage("");
  }

  function handleMessageKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <Box className="chat-window">
      <Box className="chat-window__header">
        <img
          className="chat-window__avatar"
          src="https://2pick.app/storage/default-avatar.webp"
          width={50}
          height={50}
          alt=""
        />
        <Box component="span" className="chat-window__name">
          Adha
        </Box>
        <Box
          component="span"
          aria-label="Online"
          className="chat-window__online-indicator"
        />
      </Box>
      <Box className="chat-window__body">
        <Box className="chat-window__messages">
          {messages.map(({ id, text, direction }) => (
            <Box
              key={id}
              className={`chat-window__message chat-window__message--${direction}`}
            >
              {text}
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="chat-window__composer">
        <TextareaAutosize
          minRows={1}
          maxRows={2}
          aria-label="maximum height"
          placeholder="write something..."
          className="chat-window__input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleMessageKeyDown}
        />
        <IconButton
          className="chat-window__send"
          aria-label="Send message"
          disabled={!message.trim() || !chatId}
          onClick={handleSendMessage}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
