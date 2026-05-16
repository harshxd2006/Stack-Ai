import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Find me a video editing tool",
    "Compare ChatGPT vs Claude",
    "Build me a developer stack",
    "What is the best free AI image generator"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const functionUrl = import.meta.env.VITE_CHAT_FUNCTION_URL;
      
      if (!functionUrl) {
        throw new Error('Chat function URL not configured');
      }

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ 
          message: text,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      console.log('Chat API response:', data);
      
      let botContent = "Sorry, I couldn't process that.";
      
      if (typeof data === 'string') {
        botContent = data;
      } else if (data) {
        botContent = data.reply || 
                     data.content || 
                     data.message || 
                     data.answer || 
                     data.response || 
                     data.text || 
                     (data.choices && data.choices[0]?.message?.content) || 
                     (data.candidates && data.candidates[0]?.content?.parts[0]?.text) || 
                     (data.error && typeof data.error === 'string' ? `Error: ${data.error}` : null) ||
                     (data.error?.message ? `Error: ${data.error.message}` : null) ||
                     "Sorry, I couldn't process that. (Check console)";
      }
      
      setMessages([...newMessages, { role: 'assistant', content: botContent }]);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-card mb-4 w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] flex flex-col overflow-hidden !bg-[#12121A] !border-white/10 !rounded-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-[#12121A]/80 backdrop-blur-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4AA] flex items-center justify-center shadow-[0_0_15px_rgba(108,99,255,0.3)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8V4H8" />
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M2 14h2" />
                    <path d="M20 14h2" />
                    <path d="M15 13v2" />
                    <path d="M9 13v2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne font-bold text-white text-sm">Stack AI Assistant</h3>
                  <p className="text-xs text-[#00D4AA]">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button 
                    onClick={clearChat}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                    title="Clear chat"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 font-dm-sans bg-[#0A0A0F]/50">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C63FF]/20 to-[#00D4AA]/20 flex items-center justify-center mx-auto mb-3 border border-[#6C63FF]/30">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <h4 className="text-white font-medium mb-1">How can I help you?</h4>
                    <p className="text-sm text-gray-400">Ask anything about AI tools or your stack.</p>
                  </div>
                  <div className="grid gap-2">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm text-gray-300 hover:text-white hover:border-[#6C63FF]/30"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-[#6C63FF] text-white rounded-2xl rounded-tr-sm shadow-[0_4px_15px_rgba(108,99,255,0.2)]' 
                          : msg.isError
                            ? 'bg-red-500/10 text-red-200 border border-red-500/30 rounded-2xl rounded-tl-sm'
                            : 'glass bg-[#12121A] text-gray-200 rounded-2xl rounded-tl-sm border border-white/5 shadow-md'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass bg-[#12121A] border border-white/5 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 w-16 shadow-md">
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-[#12121A]/80 backdrop-blur-md">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Stack AI..."
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-[#6C63FF]/50 transition-colors placeholder:text-gray-500 shadow-inner"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-2 bg-[#6C63FF] hover:bg-[#5a52d6] disabled:bg-[#6C63FF]/30 disabled:opacity-50 text-white rounded-full transition-all shadow-md"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#5a52d6] text-white flex items-center justify-center shadow-[0_0_20px_rgba(108,99,255,0.4)] border border-white/10 relative z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
