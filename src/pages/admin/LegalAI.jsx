import React, { useState, useEffect, useRef } from "react";
import {
  Loader2,
  Send,
  User,
  Bot,
  Plus,
  MessageSquare,
  Trash2,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Basic message structure
const createMessage = (role, content) => ({
  id: `${Date.now()}-${Math.random()}`,
  role,
  content,
});

export default function LegalAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatSessions, setChatSessions] = useState([
    { id: "initial", title: "New Conversation", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState("initial");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const popupRef = useRef();

  // Remove showScrollToBottom state and logic

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save messages to chat session
  useEffect(() => {
    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === activeChatId
          ? { ...session, messages: [...messages] }
          : session
      )
    );
  }, [messages, activeChatId]);

  // Always show the button, so no need for scroll detection

  const handleScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = createMessage("user", input);
    const botMessage = createMessage("assistant", "Thinking...");

    const updatedMessages = [...messages, userMessage, botMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Simulate bot reply after 1.5s
    setTimeout(() => {
      const newBotMessage = {
        ...botMessage,
        content: `You asked: "${input}". This is a placeholder answer.`,
      };
      setMessages((msgs) => [...msgs.slice(0, -1), newBotMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const startNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: `Chat ${chatSessions.length + 1}`,
      messages: [],
    };

    setChatSessions([...chatSessions, newChat]);
    setActiveChatId(newChatId);
    setMessages([]);
  };

  const switchChat = (chatId) => {
    setActiveChatId(chatId);
    const session = chatSessions.find((s) => s.id === chatId);
    if (session) setMessages(session.messages);
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    const updatedSessions = chatSessions.filter((s) => s.id !== chatId);
    setChatSessions(updatedSessions);

    if (chatId === activeChatId && updatedSessions.length > 0) {
      switchChat(updatedSessions[0].id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative h-screen flex flex-col pt-20"
    >
      <div className="relative h-screen flex flex-col pt-20">
        {/* Floating Chat Button */}
        <div className="absolute top-1 left-4 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl"
          >
            <MessageSquare size={24} />
          </motion.button>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-4 w-72 bg-white rounded-xl shadow-2xl p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Legal AI</h2>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSidebarOpen(false)}
                    className="px-2 py-1 text-gray-500 hover:text-gray-900"
                  >
                    ✕
                  </Button>
                </div>
                <Button
                  onClick={() => {
                    startNewChat();
                    setSidebarOpen(false);
                  }}
                  className="w-full mb-4 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  New Chat
                </Button>

                <div className="max-h-52 overflow-y-auto space-y-2">
                  {chatSessions.map((chat) => (
                    <div
                      key={chat.id}
                      className={cn(
                        "p-2 text-sm cursor-pointer flex items-center justify-between rounded-md hover:bg-blue-100 transition",
                        activeChatId === chat.id
                          ? "bg-blue-50 font-medium"
                          : "bg-white"
                      )}
                      onClick={() => {
                        switchChat(chat.id);
                        setSidebarOpen(false);
                      }}
                    >
                      <div className="truncate flex items-center">
                        <MessageSquare
                          size={14}
                          className="mr-2 text-blue-500"
                        />
                        <span className="truncate">{chat.title}</span>
                      </div>
                      {chatSessions.length > 1 && (
                        <Trash2
                          size={14}
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => deleteChat(chat.id, e)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Main Chat Container */}
        <div
          className={cn(
            "flex-1 flex flex-col transition-all duration-300",
            sidebarOpen ? "lg:ml-72 md:ml-56" : "ml-0"
          )}
        >
          {/* Messages Scroll Area */}
          <div
            className="flex-1 overflow-y-auto px-4 space-y-4 relative"
            ref={messagesContainerRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-400 mt-10">
                <Bot size={48} className="mb-4 text-blue-600" />
                <h2 className="text-xl font-semibold mb-2">
                  Welcome to Legal AI Assistant
                </h2>
                <p className="text-center max-w-md">
                  Ask any legal question and I'll provide you with expert
                  assistance based on legal knowledge and precedents.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex items-start gap-3 group transition-all duration-300",
                    message.role === "user" ? "justify-end" : ""
                  )}
                >
                  {message.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <Bot size={18} />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-4 shadow-md group-hover:shadow-lg transition-shadow duration-300",
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white rounded-bl-none"
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                      <User size={18} />
                    </div>
                  )}
                </motion.div>
              ))
            )}
            {/* Invisible anchor for scroll-to-bottom */}
            <div ref={messagesEndRef} />
            {/* Scroll to Bottom Button - ALWAYS VISIBLE */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
              onClick={handleScrollToBottom}
              className="fixed right-8 bottom-20 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
              aria-label="Scroll to bottom"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
            >
              <ArrowDown size={22} />
            </motion.button>
          </div>

          {/* Sticky Input at Bottom */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a legal question..."
                className="flex-1 bg-gray-100 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
