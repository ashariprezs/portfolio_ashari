"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Wifi, 
  Layers, 
  ExternalLink, 
  Award, 
  BookOpen, 
  GraduationCap,
  Palette,
  ArrowUpRight,
  Menu,
  X,
  Globe,
  Briefcase,
  Terminal,
  Zap,
  Mail,
  User,
  Code2,
  Share2,
  MessageCircle, 
  Send, 
  Bot, 
  Paperclip, 
  Smile,
  Sparkles,
  RefreshCw,
  Search
} from 'lucide-react';

// Ikon Brand Kustom menggunakan SVG agar tetap presisi tanpa library tambahan
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// Custom Hook untuk animasi scroll reveal
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);;

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return [domRef, isVisible];
};



type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
};

const Reveal = ({ children, delay = 0, direction = 'up' }: RevealProps) => {
  const [ref, isVisible] = useScrollReveal();

  const getTransform = () => {
    if (direction === 'up') return isVisible ? 'translateY(0)' : 'translateY(30px)';
    if (direction === 'down') return isVisible ? 'translateY(0)' : 'translateY(-30px)';
    if (direction === 'left') return isVisible ? 'translateX(0)' : 'translateX(30px)';
    if (direction === 'right') return isVisible ? 'translateX(0)' : 'translateX(-30px)';
    return 'none';
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Data i18n - English as Primary
const i18n = {
  en: {
    nav_about: "About Me",
    nav_ai: "Ask Ashari's AI",
    nav_exp: "Experience",
    nav_cert: "Certifications",
    nav_edu: "Education",
    hero_hello: "Hi There, I'm",
    hero_desc: "IoT Engineer specializing in embedded systems development, hardware-software integration, and sensor network optimization for future industrial solutions.",
    hero_btn_1: "Ask Ashari's AI",
    hero_btn_2: "Explore Portfolio",
    ai_title: "Ask My Virtual AI",
    ai_subtitle: "Instant answers about my background, skills, and projects.",
    ai_placeholder: "Ask about Ashari's experience...",
    ai_suggest_1: "What are your core IoT skills?",
    ai_suggest_2: "Tell me about the PV Farm project",
    ai_suggest_3: "What is your educational background?",
    ai_hint: "AI can make mistakes in answering your questions.",
    ai_telegram: "Contact Ashari Directly via Telegram",
    stat_1: "Core Specialty",
    stat_2: "Main Controller",
    stat_3: "Communication",
    stat_4: "Operating System",
    about_title: "Skills & Philosophy",
    about_desc: "Focused on developing reliable end-to-end IoT solutions, from circuit design to real-time data integration for smarter decision making.",
    edu_desc: "GPA: 3.88/4.00. PM2.5 monitoring using IoT device for Final Project.",
    project_title: "Project Experience",
    project_subtitle: "Real-world implementations of technology-based solutions.",
    philosophy: [
      { title: "Embedded System", desc: "Low-level programming for performance optimization and memory management on MCUs.", icon: <Terminal className="w-6 h-6" />, color: "bg-slate-900" },
      { title: "IoT Protocol", desc: "Implementation of MQTT, HTTP for efficient and secure data communication.", icon: <Wifi className="w-6 h-6" />, color: "bg-blue-500" },
      { title: "IoT Design", desc: "IoT architecture design and sensor integration with controller and connectivity for various industrial needs.", icon: <Zap className="w-6 h-6" />, color: "bg-amber-500" }
    ],
    projects: [
      { title: "Remote Monitoring System for PV Farm", year: "2023-Present", client: "Industrial Project", category: "IoT Solution for Renewable Energy" },
      { title: "Thermal Body Scanner", year: "2020-2023", client: "Industrial Project", category: "IoT for Covid Prevention" },
      { title: "Real-Time Monitoring of PM2.5 and CO2 Concentrations Based on Low-Cost Sensors in the Greater Bandung Air Basin", year: "2019", client: "Undergraduate Thesis", category: "IoT Solution, Environmental Monitoring" }
    ],
    certs: [
      { title: "Certified IoT BNSP", org: "BNSP Indonesia", type: "Certification" },
      { title: "Practical IoT Concepts-Devices IoT Protocols & Servers", org: "Udemy", type: "Certificate of Completion" }
    ]
  },
  id: {
    nav_about: "Tentang Saya",
    nav_ai: "Tanya Ashari AI",
    nav_exp: "Pengalaman",
    nav_cert: "Sertifikasi",
    nav_edu: "Pendidikan",
    hero_hello: "Halo, Saya",
    hero_desc: "IoT Engineer dengan spesialisasi dalam pengembangan sistem embedded, integrasi hardware-software, dan optimasi jaringan sensor untuk solusi industri masa depan.",
    hero_btn_1: "Tanya Ashari AI",
    hero_btn_2: "Jelajahi Portofolio",
    ai_title: "Tanya AI Virtual Saya",
    ai_subtitle: "Jawaban instan mengenai latar belakang, keahlian, dan proyek saya.",
    ai_placeholder: "Tanya tentang pengalaman Ashari...",
    ai_suggest_1: "Apa keahlian IoT utama Anda?",
    ai_suggest_2: "Ceritakan tentang proyek PLTS",
    ai_suggest_3: "Apa latar belakang pendidikan Anda?",
    ai_hint: "AI dapat melakukan kesalahan dalam menjawab pertanyaan Anda.",
    ai_telegram: "Hubungi Ashari Langsung via Telegram",
    stat_1: "Keahlian Utama",
    stat_2: "Kontroler Utama",
    stat_3: "Komunikasi",
    stat_4: "Sistem Operasi",
    about_title: "Keahlian & Filosofi",
    about_desc: "Berfokus pada pengembangan solusi end-to-end IoT yang handal, mulai dari desain sirkuit hingga integrasi data real-time untuk pengambilan keputusan yang lebih cerdas.",
    edu_desc: "IPK: 3.88/4.00. Monitoring PM2.5 menggunakan perangkat IoT untuk tugas akhir.",
    project_title: "Pengalaman Proyek",
    project_subtitle: "Implementasi nyata dari solusi berbasis teknologi.",
    philosophy: [
      { title: "Embedded System", desc: "Pemrograman pada controller seperti Python, Javascript, dan C/C++.", icon: <Terminal className="w-6 h-6" />, color: "bg-slate-900" },
      { title: "IoT Protocol", desc: "Implementasi MQTT, HTTP untuk komunikasi data yang efisien dan aman.", icon: <Wifi className="w-6 h-6" />, color: "bg-blue-500" },
      { title: "IoT Design", desc: "Perancangan Arsiteektur IoT serta integrasi sensor dengan controller serta connectivity untuk berbagai kebutuhan industri.", icon: <Zap className="w-6 h-6" />, color: "bg-amber-500" }
    ],
    projects: [
      { title: "Remote Monitoring System Untuk PLTS", year: "2023-Sekarang", client: "Proyek Industri", category: "Solusi IoT untuk Energi Terbarukan" },
      { title: "Thermal Body Scanner", year: "2020-2023", client: "Proyek Industri", category: "IoT untuk Pencegahan Covid" },
      { title: "Pemantauan Konsentrasi PM2.5 dan CO2 Berbasis Low-Cost Sensor secara Real-Time di Cekungan Udara Bandung Raya", year: "2019", client: "Tugas Akhir", category: "Solusi IoT untuk Monitoring Lingkungan" }
    ],
    certs: [
      { title: "Sertifikasi IoT BNSP", org: "BNSP Indonesia", type: "Sertifikasi" },
      { title: "Practical IoT Concepts-Devices IoT Protocols & Servers", org: "Udemy", type: "Sertifikat Penyelesaian" }
    ]
  }
};

type Lang = 'en' | 'id';

export default function App() {
  type ChatMessage = {
    id: string | number;
    type: 'user' | 'bot';
    text: string;
    time: string;
  };

  type Message = {
    role: string;
    text: string;
  };

  // Set English ('en') as the default state
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState('modernist');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1', // ubah jadi string biar konsisten
      type: 'bot',
      text: 'Halo! 👋 Ada yang bisa saya bantu? Pesan Anda akan langsung terkirim ke Telegram saya.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastUpdateId, setLastUpdateId] = useState(0);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // AI Chat State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiHistory, setAiHistory] = useState<Message[]>([]);
  const aiScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll ke pesan terbawah setiap ada pesan baru
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isTyping]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isOpen) {
      interval = setInterval(() => {
        checkForTelegramReplies();
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isOpen, lastUpdateId]);

  useEffect(() => {
    if (aiScrollRef.current) {
      aiScrollRef.current.scrollTo({ top: aiScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [aiHistory, isAiLoading]);

  const checkForTelegramReplies = async () => {
    try {
      const res = await fetch(`/api/telegram/updates?offset=${lastUpdateId + 1}`);
      const data = await res.json();

      if (data.ok && data.result?.length > 0) {
        data.result.forEach((update: any) => {
          if (update.message?.text) {
            const replyMessage: ChatMessage = {
              id: `tg-${update.update_id}`,
              type: 'bot',
              text: update.message.text,
              time: new Date(update.message.date * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })
            };

            setChatHistory((prev) => [...prev, replyMessage]);
          }

          if (update.update_id) {
            setLastUpdateId(update.update_id);
          }
        });
      }
    } catch (err) {
      console.error('Error ambil update:', err);
    }
  };

  const sendToTelegram = async (text: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await res.json();
      return data.success;
    } catch {
      return false;
    }
  };


  const handleSendMessage = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userText = message.trim();
    if (!userText) return;

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, newUserMessage]);
    setMessage('');

    setIsTyping(true);
    const success = await sendToTelegram(userText);
    setIsTyping(false);
    
    if (!success) {
      setChatHistory(prev => [...prev, {
        id: `err-${Date.now()}`,
        type: 'bot',
        text: 'Gagal mengirim pesan. Periksa konfigurasi .env Anda.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  // --- AI Integration Logic ---
  const handleAiSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    handleAiAsk();
  }
  
  const handleAiAsk = async (customQuery?: string) => {
    const queryText = customQuery || aiQuery.trim();
    if (!queryText || isAiLoading) return;

    setAiQuery('');
    setIsAiLoading(true);
    setAiResponse(null);

    // Add user message to history
    const userMsg = { role: 'user', text: queryText };
    setAiHistory(prev => [...prev, userMsg]);

    try {
      // Call our API endpoint instead of directly calling Gemini
      const response = await fetch('/api/chat/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText })
      });

      const data = await response.json();

      if (data.success && data.response) {
        const botMsg = { role: 'bot', text: data.response };
        setAiHistory(prev => [...prev, botMsg]);
        setAiResponse(data.response);
      } else {
        const errorMsg = { 
          role: 'bot', 
          text: data.error || "I'm sorry, I couldn't process that right now." 
        };
        setAiHistory(prev => [...prev, errorMsg]);
        setAiResponse(errorMsg.text);
      }
    } catch (error) {
      const errorMsg = { 
        role: 'bot', 
        text: "Technical error. Please try again later." 
      };
      setAiHistory(prev => [...prev, errorMsg]);
      setAiResponse(errorMsg.text);
      console.error('Error calling AI API:', error);
    } finally {
      setIsAiLoading(false);
    }
  };


  const t = i18n[lang] ?? i18n.en;

  const getThemeClass = () => {
    switch(theme) {
      case 'academic': return 'font-serif';
      case 'tech': return 'font-mono';
      default: return 'font-sans';
    }
  };

  return (
    <div className={`${getThemeClass()} bg-white text-slate-900 antialiased min-h-screen scroll-smooth`}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .ai-gradient {
          background: linear-gradient(135deg, #6366f1, #3b82f6); /* Example gradient for Gemini-like branding */
        }
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slow-spin {
          animation: slow-spin 12s linear infinite;
        }
        .reveal-card {
           transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .reveal-card:hover {
           transform: translateY(-8px) scale(1.01);
           box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />

      {/* Theme Switcher FAB */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start">
        {isStyleOpen && (
          <div className="bg-white/90 backdrop-blur shadow-2xl border border-slate-200 p-2 rounded-2xl flex flex-col gap-1 w-40 mb-3 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-tighter text-center border-bottom border-slate-100">Select Style</p>
            <button onClick={() => {setTheme('modernist'); setIsStyleOpen(false);}} className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-all text-left flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span> Modernist
            </button>
            <button onClick={() => {setTheme('academic'); setIsStyleOpen(false);}} className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-all text-left flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Academic
            </button>
            <button onClick={() => {setTheme('tech'); setIsStyleOpen(false);}} className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-all text-left flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Tech Mono
            </button>
          </div>
        )}
        <button 
          onClick={() => setIsStyleOpen(!isStyleOpen)}
          className="w-12 h-12 bg-white shadow-xl border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all group"
        >
          <Palette className={`w-5 h-5 text-slate-400 group-hover:text-green-600 transition-colors ${isStyleOpen ? 'text-green-600' : ''}`} />
        </button>
      </div>

      {/* Chat Widget Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isOpen && (
          <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center border-2 border-indigo-300 font-bold">
                  AS
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Chat with Ashari</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs text-indigo-100">Dua Arah</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-500 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 min-h-0 max-h-full overflow-y-auto p-4 space-y-4 bg-slate-50">
              <div className="space-y-4">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] flex flex-col ${chat.type === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-3 rounded-2xl text-sm ${
                        chat.type === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 shadow-sm border border-slate-200 rounded-tl-none'
                      }`}>
                        {chat.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">{chat.time}</span>
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-[10px] text-slate-400 px-2 italic">Mengirim...</div>}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button type="submit" disabled={!message.trim()} className="absolute right-1 p-1.5 text-indigo-600">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
            isOpen ? 'bg-slate-800 text-white' : 'bg-indigo-600 text-white'
          }`}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 pt-3 px-3 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-xl border border-slate-200/60 p-4 px-8 rounded-full shadow-lg pointer-events-auto">
          <div className="font-black text-xl tracking-tighter"><a href="#hero">AS</a><span className="text-green-600">.</span></div>
          
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            <a href="#about" className="hover:text-slate-900 transition-colors">{t.nav_about}</a>
            <a href="#ai" className="hover:text-slate-900 transition-colors">{t.nav_ai}</a>
            <a href="#projects" className="hover:text-slate-900 transition-colors">{t.nav_exp}</a>
            <a href="#certifications" className="hover:text-slate-900 transition-colors">{t.nav_cert}</a>
            <a href="#education" className="hover:text-slate-900 transition-colors">{t.nav_edu}</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 p-1 rounded-full px-2">
              <button onClick={() => setLang('en')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400'}`}>EN</button>
              <button onClick={() => setLang('id')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'id' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400'}`}>ID</button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 md:px-10 overflow-hidden relative" style={{ background: 'radial-gradient(circle at center, #fff7ed 0%, #ffffff 70%)' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center w-full relative z-10">
          <div className="md:col-span-7">
            <Reveal direction="right">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8">
                {t.hero_hello} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-800">Ashari Sya'bani</span>
              </h1>
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed font-light mb-10">
                {t.hero_desc}
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <a href="#ai" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-[#4796E3] transition-all shadow-xl shadow-indigo-600/10 active:scale-95">
                  {t.hero_btn_1}
                </a>
                <a href="#projects" className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-green-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                  {t.hero_btn_2}
                </a>
                <a href="https://www.linkedin.com/in/asharisyabani" target="_blank" className="px-8 py-4 border border-slate-200 rounded-2xl text-sm font-bold hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all flex items-center gap-2 active:scale-95">
                  <LinkedinIcon /> LinkedIn Profile
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5 hidden md:block">
            <Reveal direction="left" delay={0.3}>
              <div className="relative group flex items-center justify-center">
                <div className="absolute inset-0 scale-110 opacity-30 group-hover:opacity-50 transition-opacity">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-[2px] border-dashed border-blue-500 rounded-full animate-slow-spin"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border-[1px] border-green-500 rounded-full animate-slow-spin" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
                </div>

                <div className="relative animate-float">
                  <div className="p-4 bg-white border border-slate-100 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[3.5rem] max-w-[420px] mx-auto transition-all duration-500 group-hover:shadow-green-600/20 group-hover:border-green-200">
                    <img 
                      src="/ashari.jpg"
                      alt="Avatar" 
                      className="w-full aspect-square object-cover rounded-[3rem] bg-slate-50 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 shadow-xl rounded-2xl border border-slate-100 flex items-center gap-3 animate-bounce shadow-green-600/10">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase text-slate-400 leading-none">IoT Engineer</p>
                      <p className="text-sm font-bold text-slate-900 mt-1">Solution & Development</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-10 -right-10 w-48 h-48 bg-green-600/20 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* --- Ask My Virtual AI Section (Gemini Style) --- */}
      <section id="ai" className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black tracking-tight mb-3">{t.ai_title}</h2>
              <p className="text-slate-500">{t.ai_subtitle}</p>
            </div>
          </Reveal>

          <div id="ai-chat-area" className="w-full max-w-6xl h-[600px] bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 flex flex-col overflow-hidden">
            {/* Chat Area */}
            <div id="ai-scroll-area" ref={aiScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar p-8 md:p-12"> 
              <div className="max-w-full mx-auto w-full space-y-12 pb-10"> {/* Wrapper untuk memberi jeda dan membatasi lebar teks agar tidak menabrak border */}
                {aiHistory.length === 0 ? ( // Ini adalah div untuk tampilan kosong
                  <div className="flex flex-col items-center justify-center text-center py-20"> {/* Menghapus h-full */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4"> 
                      {[t.ai_suggest_1, t.ai_suggest_2, t.ai_suggest_3].map((suggest, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleAiAsk(suggest)}
                          className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all text-left flex flex-col justify-between gap-4 h-full"
                        >
                          {suggest}
                          <ArrowUpRight size={14} className="opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  aiHistory.map((msg, i) => (
                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-100 text-slate-600' : 'ai-gradient text-white shadow-lg'}`}>
                          {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
                        </div>
                        <div className={`p-4 md:p-6 rounded-[2rem] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none text-right' : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100 shadow-sm text-left'}`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isAiLoading && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full ai-gradient animate-pulse flex items-center justify-center text-white">
                      <Sparkles size={18} />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] rounded-tl-none w-24 flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></div>
                    </div>
                  </div>
                )}

                {/* Telegram CTA Button - Tampil hanya jika sudah ada riwayat chat */}
                {aiHistory.length > 0 && !isAiLoading && (
                  <div className="flex justify-center mt-8">
                    <button 
                      onClick={() => setIsOpen(true)}
                      className="group flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
                    >
                      <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-sm">{t.ai_telegram}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-8 bg-white border-t border-slate-100"> {/* Menambah padding agar area input lebih bernapas */}
              <form onSubmit={handleAiSubmit} className="flex items-center gap-3 w-full">
                <input 
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder={t.ai_placeholder}
                  className="flex-1 pl-6 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  disabled={!aiQuery.trim() || isAiLoading}
                  className="w-12 h-12 flex-shrink-0 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 disabled:bg-slate-400 transition-all shadow-lg shadow-slate-900/10"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest"><i>{t.ai_hint}</i></p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: t.stat_1, val: "IoT, Laravel" },
            { label: t.stat_2, val: "Industrial Mini PC" },
            { label: t.stat_3, val: "HTTP, API, MQTT, Modbus" },
            { label: t.stat_4, val: "Linux" }
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <h4 className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">{stat.val}</h4>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-32 px-6">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-4xl font-black mb-6 tracking-tight">{t.about_title}</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-light">{t.about_desc}</p>
          </div>
        </Reveal>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {t.philosophy.map((item, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] reveal-card">
                <div className={`w-12 h-12 ${item.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:rotate-12`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-black tracking-tight">{t.project_title}</h2>
              <p className="text-slate-500 mt-2">{t.project_subtitle}</p>
            </div>
          </Reveal>
          <div className="grid gap-6">
            {t.projects.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between p-8 md:p-12 rounded-[2.5rem] group hover:border-green-600 transition-all hover:shadow-2xl hover:shadow-green-600/5 hover:-translate-y-1">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{p.year}</span>
                    <div>
                      <h4 className="text-2xl font-bold group-hover:text-green-600 transition-colors">{p.title}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{p.client}</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 flex items-center gap-4">
                    <span className="px-4 py-1.5 border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">{p.category}</span>
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl font-black mb-16 text-center tracking-tight">{t.nav_cert}</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {t.certs.map((c, i) => (
              <Reveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'right' : 'left'}>
                <div className="bg-white border border-slate-200 p-8 rounded-[2rem] flex items-center gap-6 group hover:border-green-600 transition-all hover:shadow-xl">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-green-600 transition-all group-hover:scale-110">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">{c.type}</span>
                    <h4 className="font-bold text-lg">{c.title}</h4>
                    <p className="text-xs text-slate-400">{c.org}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-black mb-16 text-center tracking-tight">{t.nav_edu}</h2>
          </Reveal>
          <div className="border-l-2 border-slate-200 space-y-16 ml-4">
            <Reveal direction="right">
              <div className="relative pl-12 group">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow-sm transition-transform group-hover:scale-150"></div>
                <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em] mb-2 block">2015 — 2019</span>
                <h3 className="text-2xl font-bold text-slate-900">Engineering Physics</h3>
                <p className="text-slate-500 mt-2 font-medium">Telkom University</p>
                <p className="text-sm text-slate-400 mt-4 max-w-lg leading-relaxed">{t.edu_desc}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100 text-center">
        <Reveal direction="down">
          <div className="font-black text-3xl mb-8 tracking-tighter">ASHARI<span className="text-green-600">.</span></div>
          <div className="flex justify-center gap-10 mb-12">
            <a href="https://www.linkedin.com/in/asharisyabani" className="text-slate-400 hover:text-[#0077B5] transition-all hover:scale-125"><LinkedinIcon /></a>
            <a href="https://github.com/ashariprezs" className="text-slate-400 hover:text-slate-900 transition-all hover:scale-125"><GithubIcon /></a>
            <a href="#" className="text-slate-400 hover:text-green-600 transition-all hover:scale-125"><Globe className="w-5 h-5" /></a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Built with Passion for Technology</p>
        </Reveal>
      </footer>

    </div>
  );
}