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
  Share2
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
    nav_exp: "Experience",
    nav_cert: "Certifications",
    nav_edu: "Education",
    hero_hello: "Hi There, I'm",
    hero_desc: "IoT Engineer specializing in embedded systems development, hardware-software integration, and sensor network optimization for future industrial solutions.",
    hero_btn_1: "Explore Portfolio",
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
    nav_exp: "Pengalaman",
    nav_cert: "Sertifikasi",
    nav_edu: "Pendidikan",
    hero_hello: "Halo, Saya",
    hero_desc: "IoT Engineer dengan spesialisasi dalam pengembangan sistem embedded, integrasi hardware-software, dan optimasi jaringan sensor untuk solusi industri masa depan.",
    hero_btn_1: "Jelajahi Portofolio",
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
  // Set English ('en') as the default state
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState('modernist');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStyleOpen, setIsStyleOpen] = useState(false);

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

      {/* Navigation */}
      <nav className="fixed w-full z-50 pt-3 px-3 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-xl border border-slate-200/60 p-4 px-8 rounded-full shadow-lg pointer-events-auto">
          <div className="font-black text-xl tracking-tighter">AS<span className="text-green-600">.</span></div>
          
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            <a href="#about" className="hover:text-slate-900 transition-colors">{t.nav_about}</a>
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
      <header className="min-h-screen flex items-center justify-center pt-20 px-6 md:px-10 overflow-hidden relative" style={{ background: 'radial-gradient(circle at center, #fff7ed 0%, #ffffff 70%)' }}>
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
                <a href="#projects" className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-green-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                  {t.hero_btn_1}
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

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 bg-slate-50/50">
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