import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Send, Shirt, Heart, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AiStyleAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiStyleAssistantModal: React.FC<AiStyleAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language, showToast } = useApp();

  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; timestamp: string }[]
  >([
    {
      sender: 'ai',
      text: 'नमस्ते! मैं राजरानी कलेक्शन की AI एथनिक स्टाइल कंसल्टेंट हूँ। आप मुझसे बनारसी साड़ी ड्रेपिंग, परफेक्ट ब्लाउज मैचिंग, या शादी-त्यौहार के परिधान सुझाव पूछ सकते हैं।',
      timestamp: 'Just now'
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendPrompt = async (presetPrompt?: string) => {
    const textToSend = presetPrompt || prompt;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!presetPrompt) setPrompt('');
    setLoading(true);

    try {
      // Safe Gemini API Key lookup
      const apiKey = (typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : '') || '';
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are the chief ethnic fashion stylist for "Rajrani Collection", a premier saree, suit, and lehenga store in Hardoi, UP, India.
Provide helpful, warm, culturally resonant styling, color-matching, and draping advice for Indian ladies ethnic wear in Hindi / English. Keep it concise (2-3 paragraphs max).
User query: "${textToSend}"`
        });

        const replyText = response.text || 'नमस्ते! आपके लिए लाल बनारसी साड़ी के साथ कंट्रास्ट ग्रीन ब्लाउज या जरी वर्क ब्लाउज सबसे सुंदर लगेगा!';
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        // Smart fallback styling answer
        setTimeout(() => {
          let advice =
            'शाही बनारसी साड़ी के लिए रॉयल बोट-नेक या कोर्सेट स्टाइल स्टिच्ड ब्लाउज सबसे ट्रेंडिंग है! इसके साथ टेम्पल ज्वैलरी पहनें।';
          if (textToSend.includes('हल्दी') || textToSend.includes('haldi')) {
            advice =
              'हल्दी सेरेमनी के लिए हमारी मस्टर्ड येलो कांचीपुरम सिल्क साड़ी या पटियाला सूट सबसे उत्तम विकल्प है। इसके साथ गोटा पट्टी दुपट्टा और फ्लोरल ज्वेलरी पेयर करें!';
          } else if (textToSend.includes('शादी') || textToSend.includes('wedding')) {
            advice =
              'दुल्हन एवं शादी के खास अवसरों के लिए मरून वेलवेट लहंगा चोली या पारंपरिक लाल-गोल्ड बनारसी सिल्क साड़ी सर्वोत्तम विकल्प है।';
          }

          setMessages(prev => [
            ...prev,
            {
              sender: 'ai',
              text: advice,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'बनारसी और कांचीपुरम साड़ियों के लिए डीप यू-नेक ब्लाउज और कुंदन ज्वेलरी हमेशा बेस्ट कॉम्बिनेशन बनती है!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl my-6 text-slate-800 overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900 to-pink-900 text-white shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
            <div>
              <h3 className="font-serif font-bold text-base">राजरानी AI स्टाइल कंसल्टेंट</h3>
              <p className="text-[10px] text-pink-200">Gemini AI संचालित साड़ी एवं फैशन गाइड</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-white/80 hover:bg-white/20 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Style Presets */}
        <div className="bg-slate-100 p-2.5 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0 border-b border-slate-200">
          <span className="font-bold text-slate-500 shrink-0">क्विक सवाल:</span>
          {[
            'हल्दी सेरेमनी में क्या पहनें?',
            'रेड बनारसी साड़ी संग ब्लाउज सलाह',
            'अनारकली सूट ज्वैलरी स्टाइल'
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(q)}
              className="bg-white hover:bg-pink-50 text-slate-800 font-semibold px-2.5 py-1 rounded-full border border-slate-200 shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-pink-600 text-white rounded-br-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                {m.text}
                <span
                  className={`block text-[9px] mt-1 text-right ${
                    m.sender === 'user' ? 'text-pink-200' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2 animate-pulse">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-pink-600" />
                <span>AI स्टाइल सलाह सोच रही है...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendPrompt()}
            placeholder="साड़ी ड्रेपिंग या ब्लाउज मैचिंग के बारे में पूछें..."
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-pink-500 focus:outline-none"
          />
          <button
            onClick={() => handleSendPrompt()}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center justify-center shadow-md"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
