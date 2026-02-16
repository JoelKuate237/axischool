
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  STRIPE_URL, 
  EMAIL_CONTACT, 
  PHONE_CONTACT,
  WORKSHOPS, 
  FAQ_DATA,
  LEGAL_MENTIONS,
  CONFIDENTIALITY_POLICY
} from './constants.tsx';
import { Workshop } from './types.ts';

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void) => {
  if (!href || !href.startsWith('#')) return;
  e.preventDefault();
  if (callback) callback();
  const id = href.replace('#', '');
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    window.history.pushState(null, '', href);
  }
};

const LegalModal = ({ title, content, onClose }: { title: string, content: string, onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 text-stone-300 hover:text-rose-500 transition-colors">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <h3 className="text-3xl font-black mb-6 text-stone-900 tracking-tight">{title}</h3>
      <div className="text-stone-600 font-medium leading-relaxed whitespace-pre-wrap text-base md:text-lg tracking-tight">
        {content}
      </div>
    </div>
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Catalogue', href: '#workshops' },
    { name: 'La Méthode', href: '#process' },
    { name: 'Prix', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 py-4 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-creator-gradient rounded-lg flex items-center justify-center text-white font-black text-xs">AX</div>
          <span className="font-extrabold text-lg tracking-tight text-stone-900 uppercase">AXIA <span className="text-rose-500">Académie</span></span>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)} 
              className="text-base font-black text-stone-900 hover:text-rose-500 transition-all duration-500 uppercase tracking-tight hover:scale-125 inline-block transform-gpu"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="lg:hidden">
           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-stone-900">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
           </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-100 p-10 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href, () => setIsMenuOpen(false))} 
              className="text-2xl font-black text-stone-900 hover:text-rose-500 active:text-rose-600 transition-all duration-300 tracking-tight hover:scale-105 origin-left"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const themes = {
    emerald: { text: 'text-emerald-500', icon: 'bg-emerald-500/10' },
    amber: { text: 'text-amber-500', icon: 'bg-amber-500/10' },
    orange: { text: 'text-orange-500', icon: 'bg-orange-500/10' },
    rose: { text: 'text-rose-500', icon: 'bg-rose-500/10' },
    indigo: { text: 'text-indigo-500', icon: 'bg-indigo-500/10' },
    violet: { text: 'text-violet-500', icon: 'bg-violet-500/10' },
    sky: { text: 'text-sky-500', icon: 'bg-sky-500/10' }
  };
  const theme = themes[workshop.colorTheme] || themes.amber;

  return (
    <div className={`card-creator p-8 md:p-10 border-2 border-transparent transition-all duration-500 bg-white ${isExpanded ? 'lg:col-span-2 shadow-2xl z-20 scale-100' : 'hover:-translate-y-3'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-10 h-10 rounded-xl ${theme.icon} flex items-center justify-center ${theme.text}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        {isExpanded && <button onClick={() => setIsExpanded(false)} className="text-stone-300 hover:text-rose-500 p-2 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg></button>}
      </div>
      
      <h3 className="text-xl font-black text-stone-900 leading-[1.2] mb-3 group-hover:text-rose-500 transition-colors tracking-tight">
        {workshop.title}
      </h3>
      <p className="text-[10px] font-black text-stone-400 uppercase tracking-tight mb-6">NIVEAU {workshop.level} — {workshop.levelLabel}</p>
      
      {!isExpanded ? (
        <>
          <p className="text-[13px] text-stone-500 font-bold leading-relaxed mb-8 line-clamp-3 italic tracking-tight">"{workshop.goal}"</p>
          <button onClick={() => setIsExpanded(true)} className={`text-[10px] font-black uppercase tracking-tight ${theme.text} hover:opacity-70 transition-all flex items-center gap-2 group`}>
            DÉTAILS & OBJECTIFS <span className="group-hover:translate-x-1 transition-transform">—</span>
          </button>
        </>
      ) : (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-stone-50">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
               <div>
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-tight mb-3">Objectifs Pédagogiques</p>
                  <ul className="space-y-3">
                     {workshop.objectives.map((obj, i) => (
                       <li key={i} className="flex gap-3 text-[12px] font-bold text-stone-700 leading-tight tracking-tight">
                         <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${theme.text.replace('text-', 'bg-')}`} />
                         {obj}
                       </li>
                     ))}
                  </ul>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-tight mb-3">Livrable Final</p>
                  <p className="text-[13px] font-black text-rose-500 leading-snug tracking-tight">{workshop.deliverable}</p>
               </div>
            </div>
            <div className="space-y-6">
               <div>
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-tight mb-3">Partie 1 — Veille Stratégique</p>
                  <p className="text-[12px] font-medium text-stone-600 leading-relaxed tracking-tight">{workshop.veille}</p>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-tight mb-3">Partie 2 — Atelier Pratique</p>
                  <p className="text-[12px] font-medium text-stone-600 leading-relaxed tracking-tight">{workshop.practice}</p>
               </div>
               <div className="pt-4">
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-tight mb-1">Inspiration du programme</p>
                  <p className="text-[11px] font-bold text-stone-400 tracking-tight">{workshop.inspiration}</p>
               </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-stone-50">
             <div className="flex items-center gap-4">
                <span className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter">200€</span>
                <span className="text-[10px] font-black text-stone-300 uppercase tracking-tight leading-none">/ PLACE <br/>ATELIER PRATIQUE</span>
             </div>
             <a href={STRIPE_URL} className="w-full sm:w-auto btn-creator px-8 py-3.5 text-[11px] font-black uppercase tracking-tight text-center">RÉSERVER MA PLACE</a>
          </div>
        </div>
      )}
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Bonjour ! Je suis l'assistant d'AXIA Académie. Comment puis-je vous aider aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        Tu es l'assistant virtuel exclusif d'AXIA Académie.
        Ton but est de renseigner les utilisateurs UNIQUEMENT sur AXIA Académie, ses formations, sa méthode et Digital House Company (dhcompany.pro).
        
        CATALOGUE DES ATELIERS :
        ${WORKSHOPS.map(w => `- ${w.title} (Niveau ${w.level}): ${w.goal}. Prix: 200€.`).join('\n')}
        
        INFOS CLÉS :
        - Méthode : Audit Stratégique -> Formation Action IA -> Déploiement & Automatisation -> Autonomie.
        - Prix : 200€ par atelier (4h de workshop intensif, prompts business inclus, replay à vie).
        - Contact : ${EMAIL_CONTACT} / ${PHONE_CONTACT}.
        - AXIA est un produit de Digital House Company.
        - Formateur : Joël Parfait Kuate.
        
        RÈGLES CRITIQUES :
        1. Ne réponds JAMAIS à des questions hors de ce contexte.
        2. Si l'utilisateur pose une question sur un autre sujet, réponds poliment : "Je suis désolé, je suis uniquement formé pour vous assister sur les programmes d'AXIA Académie et les services de Digital House Company. Comment puis-je vous aider sur ces sujets ?"
        3. Sois professionnel, enthousiaste et concis.
        4. Si l'utilisateur veut s'inscrire, renvoie-le vers le bouton de réservation ou contacte ${EMAIL_CONTACT}.
        5. RÉPONDS EXCLUSIVEMENT EN FORMAT HTML (balises <b>, <br>, <ul>, <li>, <a>). 
        6. N'UTILISE JAMAIS DE MARKDOWN (pas de **, pas de #, pas de tirets de liste markdown).
        7. Tes réponses doivent être du HTML pur sans blocs de code (\`\`\`).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: context,
          temperature: 0.7,
        },
      });

      const botText = response.text || "Je n'ai pas pu générer de réponse. Veuillez réessayer ou nous contacter par email.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Désolé, j'ai rencontré une erreur technique. Veuillez nous contacter directement." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-creator-gradient rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform animate-bounce"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      ) : (
        <div className="w-[350px] sm:w-[400px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-creator-gradient p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">AX</div>
              <div>
                <p className="font-black uppercase text-xs tracking-widest leading-none">Assistant</p>
                <p className="text-[10px] font-bold text-white/80">AXIA Académie</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-stone-50/30 chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm tracking-tight ${
                  msg.role === 'user' 
                    ? 'bg-rose-500 text-white rounded-br-none' 
                    : 'bg-white text-stone-800 border border-stone-100 rounded-bl-none'
                }`}>
                  {msg.role === 'bot' ? (
                    <div className="chatbot-html-content" dangerouslySetInnerHTML={{ __html: msg.text }} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100">
            <div className="flex items-center gap-2 bg-stone-50 rounded-full px-4 py-2 border border-stone-100 focus-within:border-rose-500 transition-colors">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="flex-grow bg-transparent border-none outline-none text-sm font-bold text-stone-700 py-1"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="text-rose-500 hover:scale-110 disabled:opacity-30 transition-transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [legalModal, setLegalModal] = useState<null | 'mentions' | 'confidentiality'>(null);

  const footerNav = [
    { name: 'Catalogue', href: '#workshops' },
    { name: 'La Méthode', href: '#process' },
    { name: 'Prix', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="bg-white min-h-screen text-stone-900 selection:bg-rose-100 selection:text-rose-900">
      <Header />
      
      {/* LEGAL MODALS */}
      {legalModal === 'mentions' && (
        <LegalModal title={LEGAL_MENTIONS.title} content={LEGAL_MENTIONS.content} onClose={() => setLegalModal(null)} />
      )}
      {legalModal === 'confidentiality' && (
        <LegalModal title={CONFIDENTIALITY_POLICY.title} content={CONFIDENTIALITY_POLICY.content} onClose={() => setLegalModal(null)} />
      )}

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <h1 className="text-5xl sm:text-7xl lg:text-[85px] font-black leading-[0.95] mb-10 tracking-tighter">
              Ne travaillez <br/>
              <span className="hand-drawn-circle">plus jamais</span> <br/>
              <span className="text-creator-gradient">comme avant.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 font-bold mb-12 max-w-xl leading-relaxed tracking-tight">
              Gagnez 1 jour par semaine. Réduisez vos coûts opérationnels. Maîtrisez l'IA qui va faire de vous un leader dans votre secteur.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <a href="#workshops" onClick={(e) => handleLinkClick(e, '#workshops')} className="btn-creator px-8 py-3.5 text-[11px] font-black uppercase tracking-tight text-center">Découvrir le catalogue</a>
              <a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="px-8 py-3.5 bg-stone-50 text-stone-900 hover:bg-stone-100 rounded-full text-[11px] font-black uppercase tracking-tight transition-all text-center">Tarifs & Devis</a>
            </div>
            <div className="flex flex-wrap gap-10 opacity-30 grayscale">
              <span className="text-[9px] font-black uppercase tracking-tight">100% PRATIQUE</span>
              <span className="text-[9px] font-black uppercase tracking-tight">ROI IMMÉDIAT</span>
              <span className="text-[9px] font-black uppercase tracking-tight">CERTIFIÉ AXIA</span>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 p-5 bg-white rounded-[4rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-1000">
              <img src="https://masterleads.be/wp-content/uploads/2026/01/axia.png" className="w-full h-[550px] object-cover rounded-[3.5rem]" alt="Team working with AI" />
              <div className="absolute top-8 left-8 w-14 h-14 bg-creator-gradient rounded-2xl flex items-center justify-center text-white shadow-2xl animate-float-3d">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM14.95 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM6.464 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0z" /></svg>
              </div>
              <div className="absolute -bottom-8 -right-8 p-8 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-stone-100 flex items-center gap-5 max-w-sm animate-float-3d-delayed">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg></div>
                <div><p className="text-[10px] font-black uppercase text-emerald-500 tracking-tight mb-1.5">• SUCCÈS PARTAGÉ</p><p className="text-[13px] font-black text-stone-900 leading-tight tracking-tight">Rejoignez la communauté des leaders augmentés par l'IA.</p></div>
              </div>
            </div>
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[150px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* LOGOS SCROLL */}
      <section className="py-16 bg-stone-50 border-y border-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
           <p className="text-[10px] font-black uppercase tracking-tight text-stone-300">ORGANISATIONS FORMÉES PAR AXIA ACADÉMIE</p>
        </div>
        <div className="flex animate-scroll whitespace-nowrap gap-24 items-center">
          {["HUB BRUSSEL", "IFAPME", "EFP", "CHALLENGE", "CQP BXL", "ECOLE-IT", "HUB BRUSSEL", "IFAPME", "EFP", "CHALLENGE"].map((p, i) => (
            <span key={i} className="text-3xl font-black text-stone-200/80 hover:text-stone-400 transition-colors uppercase tracking-tighter">{p}</span>
          ))}
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="workshops" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">La boîte à outils <br/><span className="text-creator-gradient">de votre succès</span></h2>
            <p className="text-stone-500 font-bold max-w-2xl mx-auto text-lg tracking-tight">S'équiper n'est plus une option. C'est votre assurance contre l'obsolescence technologique.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {WORKSHOPS.map(w => <WorkshopCard key={w.id} workshop={w} />)}
          </div>
        </div>
      </section>

      {/* METHOD SECTION */}
      <section id="process" className="py-24 md:py-32 bg-stone-50 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative order-2 lg:order-1">
               <img src="https://masterleads.be/wp-content/uploads/2026/01/axia2.png" className="w-full h-[400px] md:h-[650px] object-cover rounded-[3rem] md:rounded-[4rem] shadow-2xl transition-all duration-1000" alt="Méthode AXIA IA et productivité" />
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl -z-10"></div>
            </div>
            <div className="order-1 lg:order-2">
               <h2 className="text-4xl md:text-7xl font-black mb-12 md:mb-20 tracking-tighter leading-none text-stone-900">Propulser votre <br/><span className="text-creator-gradient">productivité</span></h2>
               <div className="space-y-12 md:space-y-16">
                  {[
                    { id: '01', title: 'Audit Stratégique & Flux', desc: "Nous identifions vos goulots d'étranglement opérationnels pour cibler les automatisations à plus fort impact immédiat sur votre ROI." },
                    { id: '02', title: 'Volet Formation & Action IA', desc: "Vos équipes sont formées de manière intensive aux outils spécifiques identifiés pour une adoption immédiate des nouvelles méthodes de travail augmentées par l'IA." },
                    { id: '03', title: 'Déploiement & Automatisation', desc: "Nous configurons vos outils et entraînons vos propres modèles IA sur vos données métiers spécifiques pour une efficacité chirurgicale." },
                    { id: '04', title: 'Autonomie & Performance', desc: "Vos équipes maîtrisent les flux augmentés. Vous scalez votre activité sans augmenter votre charge de travail ni vos effectifs." }
                  ].map(step => (
                    <div key={step.id} className="flex gap-6 md:gap-10 group">
                       <span className="text-5xl md:text-6xl font-black text-rose-500/20 group-hover:text-rose-500 transition-colors duration-700 leading-none">{step.id}</span>
                       <div>
                          <h4 className="text-xl md:text-2xl font-black mb-2 md:mb-3 tracking-tight text-stone-900">{step.title}</h4>
                          <p className="text-stone-500 font-bold leading-relaxed text-base md:text-lg tracking-tight">{step.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] -z-10 -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 md:py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-tight text-stone-900">Prenez de l'avance <br/><span className="text-creator-gradient">maintenant.</span></h2>
               <p className="text-stone-500 font-bold text-base md:text-lg uppercase tracking-tight">Prix fixe. Résultats garantis. Formation action immédiate.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto items-stretch">
               <div className="bg-stone-50 p-8 md:p-14 rounded-[3rem] shadow-2xl border border-stone-100 flex flex-col items-center">
                  <p className="text-[10px] font-black uppercase text-stone-300 tracking-tight mb-8 md:mb-12">ACCÈS PAR ATELIER PRATIQUE</p>
                  <div className="text-center mb-10 md:mb-12">
                    <span className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter leading-none">200€</span>
                    <p className="text-[11px] font-black text-stone-400 tracking-tight mt-2 md:mt-4 uppercase">/ ATELIER</p>
                  </div>
                  <ul className="space-y-4 md:space-y-6 text-sm md:text-base font-bold text-stone-600 flex-grow mb-12 md:mb-16 w-full tracking-tight">
                     <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-100" /> 4h de Workshop Intensif Pratique</li>
                     <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-100" /> Bibliothèque de Prompts Business</li>
                     <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-100" /> Replay vidéo HD disponible à vie</li>
                  </ul>
                  <a href={STRIPE_URL} className="btn-creator w-full py-3.5 text-center text-[11px] font-black uppercase tracking-tight">RÉSERVER MON ATELIER</a>
               </div>
               
               <div className="bg-creator-gradient p-8 md:p-14 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(244,63,94,0.4)] flex flex-col text-white relative overflow-hidden group">
                  <div className="relative z-10 flex flex-col h-full items-center">
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-tight mb-8 md:mb-12">SOLUTIONS ENTREPRISE SUR-MESURE</p>
                    <h3 className="text-3xl md:text-5xl font-black text-center mb-10 md:mb-12 leading-tight tracking-tighter">Accélération <br/>d'équipe</h3>
                    <ul className="space-y-4 md:space-y-6 text-sm md:text-base font-bold text-white/80 flex-grow mb-12 md:mb-16 w-full tracking-tight">
                      <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white/20" /> Audit de productivité complet</li>
                      <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white/20" /> Formation intra-entreprise sur mesure</li>
                      <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white/20" /> Support post-formation dédié 30 jours</li>
                    </ul>
                    <a href={`mailto:${EMAIL_CONTACT}`} className="w-full py-3.5 bg-white text-rose-500 rounded-full text-center text-[11px] font-black uppercase tracking-tight hover:scale-[1.03] transition-transform duration-500">OBTENIR UN DEVIS</a>
                  </div>
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[120px] pointer-events-none"></div>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 md:py-32 bg-stone-50">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black mb-12 md:mb-20 text-center tracking-tighter text-stone-900">Questions fréquentes</h2>
            <div className="space-y-4 md:space-y-5">
              {FAQ_DATA.map((item, i) => (
                <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-stone-100 transition-all hover:border-rose-200">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-8 md:px-10 py-6 md:py-8 flex justify-between items-center group">
                    <span className="font-black text-stone-800 text-base md:text-lg tracking-tight">{item.question}</span>
                    <svg className={`w-6 h-6 text-stone-300 transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-rose-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openFaq === i && <div className="px-8 md:px-10 pb-8 md:pb-10 text-sm md:text-[15px] font-bold text-stone-500 leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500 tracking-tight">{item.answer}</div>}
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="py-24 bg-stone-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-24">
              <div className="space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-creator-gradient rounded-2xl flex items-center justify-center font-black shadow-lg shadow-rose-500/20">AX</div>
                    <span className="text-2xl font-black uppercase tracking-tight">AXIA <span className="text-rose-500">Académie</span></span>
                 </div>
                 <p className="text-stone-400 font-medium leading-relaxed text-sm tracking-tight">
                   AXIA Académie est un produit de Digital House Company (dhcompany.pro). Nous transformons les organisations par la formation intensive en Intelligence Artificielle ainsi que par nos services de pointe en automatisation sur-mesure. Notre mission est de rendre la puissance technologique accessible à chaque professionnel.
                 </p>
              </div>

              <div>
                 <h4 className="text-lg font-bold mb-8 uppercase tracking-tight">Académie</h4>
                 <ul className="space-y-4">
                    {footerNav.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} onClick={(e) => handleLinkClick(e, item.href)} className="text-stone-400 hover:text-rose-500 font-medium transition-all text-sm block tracking-tight">
                          {item.name}
                        </a>
                      </li>
                    ))}
                 </ul>
              </div>

              <div>
                 <h4 className="text-lg font-bold mb-8 uppercase tracking-tight">Contact</h4>
                 <ul className="space-y-6">
                    <li>
                       <p className="text-[10px] font-bold text-rose-500 uppercase mb-1 tracking-tight">Email</p>
                       <a href={`mailto:${EMAIL_CONTACT}`} className="text-stone-400 hover:text-white font-medium transition-all text-sm tracking-tight">{EMAIL_CONTACT}</a>
                    </li>
                    <li>
                       <p className="text-[10px] font-bold text-rose-500 uppercase mb-1 tracking-tight">Téléphone</p>
                       <a href={`tel:${PHONE_CONTACT.replace(/\s/g, '')}`} className="text-stone-400 hover:text-white font-medium transition-all text-sm tracking-tight">{PHONE_CONTACT}</a>
                    </li>
                    <li>
                       <p className="text-[10px] font-bold text-rose-500 uppercase mb-1 tracking-tight">Localisation</p>
                       <p className="text-stone-400 font-medium text-sm tracking-tight">Bruxelles, Belgique</p>
                    </li>
                 </ul>
              </div>

              <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                 <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight mb-4">Direction pédagogique</p>
                 <a href="https://www.linkedin.com/in/joelparfaitkuate/" target="_blank" className="block group">
                    <p className="text-lg font-bold text-white group-hover:text-rose-500 transition-colors mb-2 tracking-tight">KUATE JOEL PARFAIT</p>
                    <p className="text-xs text-stone-400 font-medium leading-relaxed mb-6 tracking-tight">Expert en ingénierie de formation & transformation numérique.</p>
                    <div className="flex items-center gap-2 text-rose-500 font-bold text-[10px] uppercase tracking-tight">
                       Profil LinkedIn <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </div>
                 </a>
              </div>
           </div>

           <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] font-semibold tracking-tight text-stone-600">
                 <button onClick={() => setLegalModal('mentions')} className="hover:text-white transition-colors">mentions légales</button>
                 <button onClick={() => setLegalModal('confidentiality')} className="hover:text-white transition-colors">confidentialité</button>
                 <a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')} className="hover:text-white transition-colors">conditions de vente</a>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tight text-stone-700">© 2025 AXIA Académie — Tous droits réservés.</p>
           </div>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default App;
