import { Box, IconButton, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState, type KeyboardEvent } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { socket } from "../services/socket";
import "./components.scss";

type ChatMessage = {
  _id: string;
  conversationId: string;
  senderId: string;
  type: "text" | "image" | "video" | "file" | "audio";
  content: string;
  createdAt: string;
};

type SocketAcknowledgement = {
  success: boolean;
  error?: string;
};

export function ChatWindow() {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messagesByConversation, setMessagesByConversation] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [isSending, setIsSending] = useState(false);
  const messages = chatId ? (messagesByConversation[chatId] ?? []) : [];

  useEffect(() => {
    if (!chatId) return;

    function handleCreatedMessage(createdMessage: ChatMessage) {
      if (createdMessage.conversationId !== chatId) return;

      setMessagesByConversation((currentConversations) => {
        const currentMessages = currentConversations[chatId] ?? [];

        if (currentMessages.some(({ _id }) => _id === createdMessage._id)) {
          return currentConversations;
        }

        return {
          ...currentConversations,
          [chatId]: [...currentMessages, createdMessage],
        };
      });
    }

    socket.on("message:created", handleCreatedMessage);
    socket.emit(
      "conversation:join",
      { conversationId: chatId },
      (response: SocketAcknowledgement) => {
        if (!response.success) {
          console.error("Unable to join conversation:", response.error);
        }
      },
    );

    return () => {
      socket.off("message:created", handleCreatedMessage);
      socket.emit("conversation:leave", { conversationId: chatId });
    };
  }, [chatId]);

  function handleSendMessage() {
    const content = message.trim();

    if (!content || !chatId || isSending) return;

    setIsSending(true);
    socket.timeout(5000).emit(
      "message:send",
      { conversationId: chatId, content },
      (timeoutError: Error | null, response?: SocketAcknowledgement) => {
        setIsSending(false);

        if (timeoutError || !response?.success) {
          console.error(
            "Unable to send message:",
            response?.error ?? timeoutError?.message,
          );
          return;
        }

        setMessage("");
      },
    );
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
          {messages.map((chatMessage) => (
            <Box
              key={chatMessage._id}
              className={`chat-window__message chat-window__message--${
                chatMessage.senderId === user?._id ? "sent" : "received"
              }`}
            >
              {chatMessage.content}
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
          disabled={!message.trim() || !chatId || isSending}
          onClick={handleSendMessage}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
