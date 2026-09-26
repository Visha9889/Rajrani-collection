import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LiveChatSupport: React.FC = () => {
  const { showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { sender: 'user' | 'support'; text: string; time: string }[]
  >([
    {
      sender: 'support',
      text: 'नमस्ते! राजरानी कलेक्शन (हरदोई) लाइव चैट सपोर्ट में आपका स्वागत है। हम आपकी क्या सहायता कर सकते हैं?',
      time: 'Just now'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulated support response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'support',
          text: 'धन्यवाद! आपकी सहायता के लिए हमारी सपोर्ट टीम (+91 98765 43210) 2 मिनट के भीतर सम्पर्क करेगी।',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 p-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-2xl transition transform active:scale-95 flex items-center gap-2 font-bold text-xs"
        title="Live Chat Support"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">सहायता चैट (Live Support)</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-full max-w-sm rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 flex flex-col h-[420px] animate-fade-in">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-pink-900 to-rose-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h4 className="font-bold text-xs">राजरानी ग्राहक सहायता (Live Chat)</h4>
                <span className="text-[10px] text-pink-200">औसत प्रतिक्रिया समय: 2 मिनट</span>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs bg-slate-50">
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-pink-600 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {m.text}
                  <span className={`block text-[9px] mt-1 text-right ${
                    m.sender === 'user' ? 'text-pink-200' : 'text-slate-400'
                  }`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-slate-200 flex gap-1.5">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="मैसेज टाइप करें..."
              className="flex-1 rounded-xl border border-slate-300 p-2 text-xs focus:border-pink-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-3 py-2 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
