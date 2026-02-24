"use client";

import { useState, useEffect, useRef } from "react";
import { companyInfo } from "@/data/journals";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  time: string;
}

const quickReplies = [
  { label: "Submit Article", value: "How do I submit an article?" },
  { label: "Publication Fees", value: "What are your publication fees?" },
  { label: "Review Process", value: "How long is the review process?" },
  { label: "WhatsApp", value: "Connect me on WhatsApp" },
];

const botResponses: Record<string, string> = {
  "how do i submit an article?": "To submit an article:\n\n1. Go to our **Submissions** page\n2. Create an account or log in\n3. Fill out the submission form\n4. Upload your manuscript (Word/PDF)\n5. Pay the processing fee\n\nWould you like me to guide you to the submission page?",
  "what are your publication fees?": "Our publication fees vary by journal:\n\n• **Standard Processing**: £299\n• **Fast-Track Review**: £499\n• **Open Access**: £599\n\nWe offer discounts for students and researchers from developing countries. Would you like more details?",
  "how long is the review process?": "Our review timeline:\n\n• **Initial Review**: 2-3 days\n• **Peer Review**: 2-4 weeks\n• **Decision**: Within 30 days\n• **Fast-Track**: 7-10 days\n\nYou'll receive email updates at each stage.",
  "i want to speak with someone": "I'll connect you with our team! You can:\n\n📧 **Email**: info@greatbritainpublishers.co.uk\n📞 **WhatsApp**: Click below to chat\n\nOur team responds within 24 hours.",
  "whatsapp": "CONNECT_WHATSAPP",
  "default": "I'm here to help! You can ask me about:\n\n• Article submission\n• Publication fees\n• Review process\n• Author services\n\nOr click one of the quick options below!",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = companyInfo.contact.whatsapp?.replace(/[^0-9]/g, '') || '';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello! I need assistance with publishing.`;

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Show button after preloader
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Initial bot message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          id: 1,
          text: "👋 Hello! I'm your AI assistant at Great Britain Publishers. How can I help you today?",
          isBot: true,
          time: getCurrentTime(),
        }]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (userMessage: string): { text: string; action?: string } => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for WhatsApp connection requests
    if (
      lowerMessage.includes("whatsapp") ||
      lowerMessage.includes("connect") ||
      lowerMessage.includes("agent") ||
      lowerMessage.includes("talk to human") ||
      lowerMessage.includes("real person") ||
      lowerMessage.includes("human support") ||
      lowerMessage.includes("call") ||
      lowerMessage.includes("phone")
    ) {
      return {
        text: "🔗 Opening WhatsApp now...\n\nIf it doesn't open automatically, click the WhatsApp button below!",
        action: "CONNECT_WHATSAPP"
      };
    }

    if (lowerMessage.includes("submit") || lowerMessage.includes("article") || lowerMessage.includes("manuscript")) {
      return { text: botResponses["how do i submit an article?"] };
    }
    if (lowerMessage.includes("fee") || lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("payment")) {
      return { text: botResponses["what are your publication fees?"] };
    }
    if (lowerMessage.includes("review") || lowerMessage.includes("time") || lowerMessage.includes("long") || lowerMessage.includes("duration")) {
      return { text: botResponses["how long is the review process?"] };
    }
    if (lowerMessage.includes("speak") || lowerMessage.includes("contact") || lowerMessage.includes("human") || lowerMessage.includes("support") || lowerMessage.includes("help")) {
      return { text: botResponses["i want to speak with someone"] };
    }
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return { text: "Hello! 👋 Great to hear from you! How can I assist you today? Feel free to ask about submissions, fees, or our review process." };
    }
    if (lowerMessage.includes("thank")) {
      return { text: "You're welcome! 😊 Is there anything else I can help you with?" };
    }

    return { text: botResponses["default"] };
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      isBot: false,
      time: getCurrentTime(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const response = getBotResponse(text);
      const botResponse: Message = {
        id: messages.length + 2,
        text: response.text,
        isBot: true,
        time: getCurrentTime(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // If action is to connect WhatsApp, open it after a short delay
      if (response.action === "CONNECT_WHATSAPP") {
        setTimeout(() => {
          // Try to open WhatsApp - using location.href as fallback for popup blockers
          const newWindow = window.open(whatsappLink, "_blank");
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            // Popup was blocked, redirect in same tab
            window.location.href = whatsappLink;
          }
        }, 1000);
      }
    }, 1500);
  };

  const handleQuickReply = (value: string) => {
    handleSendMessage(value);
  };

  if (!showButton) return null;

  return (
    <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50">
      {/* Chat Window */}
      <div
        className={`absolute right-0 bottom-20 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[340px] sm:w-[380px] border border-gray-200 flex flex-col" style={{ height: "500px" }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] px-4 py-4 flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">GB Publishers Assistant</p>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                AI-powered • Always online
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.isBot
                      ? "bg-white shadow-sm border border-gray-100 rounded-tl-sm"
                      : "bg-[#1e3a5f] text-white rounded-tr-sm"
                  }`}
                >
                  <p className={`text-sm whitespace-pre-line ${message.isBot ? "text-gray-700" : "text-white"}`}>
                    {message.text}
                  </p>
                  <p className={`text-[10px] mt-1 ${message.isBot ? "text-gray-400" : "text-white/60"}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply.value)}
                    className="text-xs bg-white border border-[#1e3a5f]/20 text-[#1e3a5f] px-3 py-1.5 rounded-full hover:bg-[#1e3a5f] hover:text-white transition-colors"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center hover:bg-[#152d4a] transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {/* WhatsApp Connect */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-2 py-2 text-xs text-gray-500 hover:text-[#25D366] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp for human support
            </a>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group ${
          isOpen ? "bg-gray-700 rotate-0" : "bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f]"
        }`}
      >
        {/* Pulse Animation */}
        {!isOpen && (
          <>
            <span className="absolute w-full h-full bg-[#1e3a5f] rounded-full animate-ping opacity-20"></span>
            <span className="absolute w-full h-full bg-[#1e3a5f] rounded-full animate-pulse opacity-30"></span>
          </>
        )}

        {/* Icon */}
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}

        {/* Notification Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce">
            1
          </span>
        )}
      </button>

    </div>
  );
}
