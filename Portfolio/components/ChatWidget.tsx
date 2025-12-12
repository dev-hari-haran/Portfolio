import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Loader2, X } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, embedded = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm JARVIS v2.0. Accessing Hariharan's data archives... How may I assist you?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert internal message format to Gemini history format
      const historyForApi = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateChatResponse(userMsg.text, historyForApi);
      
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "System error. Connection interrupted. Please try again.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen && !embedded) return null;

  const containerClasses = embedded 
    ? "w-full h-full flex flex-col bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl"
    : "fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] flex flex-col bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] z-50 animate-in slide-in-from-bottom-5";

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/50">
        <div className="flex items-center gap-2">
            <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-sm opacity-50 rounded-full animate-pulse"></div>
                <Bot className="w-6 h-6 text-cyan-400 relative z-10" />
            </div>
            <div>
                <h3 className="font-bold text-white text-sm">JARVIS v2.0</h3>
                <p className="text-xs text-cyan-300/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                </p>
            </div>
        </div>
        {!embedded && (
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
            </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-lg' 
                : 'bg-slate-800/80 text-gray-200 rounded-tl-none border border-white/5'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/80 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-xs text-gray-400">Processing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-slate-950/30">
        <div className="relative flex items-center bg-slate-800/50 rounded-full border border-white/10 focus-within:border-cyan-500/50 focus-within:bg-slate-800 transition-all">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask JARVIS about Hari..."
                className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 text-sm placeholder:text-gray-500"
            />
            <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 mr-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? <Sparkles className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
            </button>
        </div>
      </div>
    </div>
  );
};