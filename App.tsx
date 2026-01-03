
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import {
  STRIPE_URL,
  EMAIL_CONTACT,
  PHONE_CONTACT,
  WORKSHOPS,
  FAQ_DATA
} from './constants';
import { Workshop } from './types';

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void) => {
  if (!href || !href.startsWith('#')) return;
  e.preventDefault();

  // Fermer le menu d'abord pour éviter les conflits visuels pendant le scroll
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

const LegalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-rose-500 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-3xl font-black mb-8 text-stone-900">Mentions Légales</h2>
        <div className="space-y-6 text-stone-600 font-medium">
          <section>
            <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Éditeur du site</h3>
            <p>AXIA Académie par DH Company</p>
            <p>Siège social : Bruxelles, Belgique</p>
            <p>Email : {EMAIL_CONTACT}</p>
          </section>
          <section>
            <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Coordination des formations</h3>
            <p className="text-stone-900">
              <a href="https://www.linkedin.com/in/joelparfaitkuate/" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors underline decoration-stone-200 underline-offset-4">
                KUATE JOEL PARFAIT
              </a>
            </p>
            <p className="text-sm">Responsable pédagogique et coordinateur technique des programmes IA.</p>
          </section>
          <section>
            <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Hébergement</h3>
            <p>Hostinger</p>
            <p>Europe</p>
          </section>
          <section>
            <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Propriété intellectuelle</h3>
            <p className="text-sm">L'ensemble du contenu (textes, images, vidéos, structure) est la propriété exclusive de DH Company et de ses partenaires, sauf mention contraire.</p>
          </section>
        </div>
        <div className="mt-10 pt-6 border-t border-stone-100 flex justify-end">
          <button onClick={onClose} className="px-8 py-3 bg-stone-100 text-stone-900 font-black rounded-full text-xs uppercase tracking-widest hover:bg-stone-200 transition-colors">Fermer</button>
        </div>
      </div>
    </div>
  );
};

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-rose-500 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-3xl font-black mb-8 text-stone-900">Politique de Confidentialité</h2>
        <div className="space-y-6 text-stone-600 font-medium text-sm md:text-base">
          <section>
            <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Collecte des données</h3>
            <p>Nous collectons les informations que vous nous fournissez directement lors de votre inscription aux ateliers (via Stripe) ou lors de vos demandes via l'assistant IA et le formulaire de contact (Nom, Prénom, Email, Téléphone).</p>
          </section>
          <section>
            <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Utilisation des données</h3>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>La gestion de vos réservations aux ateliers.</li>
              <li>La communication d'informations relatives à vos formations.</li>
              <li>Le support client et l'amélioration de nos services.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Vos droits (RGPD)</h3>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles. Pour exercer ces droits, contactez-nous à <span className="text-rose-500 font-bold">{EMAIL_CONTACT}</span>.</p>
          </section>
          <section>
            <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Sécurité</h3>
            <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé.</p>
          </section>
        </div>
        <div className="mt-10 pt-6 border-t border-stone-100 flex justify-end">
          <button onClick={onClose} className="px-8 py-3 bg-stone-100 text-stone-900 font-black rounded-full text-xs uppercase tracking-widest hover:bg-stone-200 transition-colors">J'ai compris</button>
        </div>
      </div>
    </div>
  );
};

const CookieBanner = ({ onOpenPrivacy }: { onOpenPrivacy: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('axia-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status: 'accepted' | 'declined') => {
    localStorage.setItem('axia-cookie-consent', status);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-[55] animate-in slide-in-from-left-10 duration-700">
      <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 shadow-3xl border border-stone-100">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h4 className="text-stone-900 font-black text-sm uppercase tracking-widest mb-1">Cookies & Vie privée</h4>
            <p className="text-stone-500 font-medium text-xs leading-relaxed">
              Nous utilisons des cookies pour optimiser votre expérience et analyser notre trafic. En continuant, vous acceptez notre <button onClick={onOpenPrivacy} className="text-rose-500 underline underline-offset-2 font-bold">politique de confidentialité</button>.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleConsent('accepted')}
            className="flex-grow btn-creator py-2.5 text-[10px] font-black uppercase tracking-widest"
          >
            Accepter
          </button>
          <button
            onClick={() => handleConsent('declined')}
            className="px-6 py-2.5 bg-stone-100 text-stone-500 hover:bg-stone-200 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Catalogue', href: '#workshops' },
    { name: 'La Méthode', href: '#process' },
    { name: 'Prix', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl z-50 py-3 md:py-4 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-creator-gradient rounded-xl rotate-3 flex items-center justify-center text-white font-black shadow-lg text-sm">AX</div>
            <span className="font-extrabold text-lg md:text-xl tracking-tight text-stone-900">AXIA <span className="text-creator-gradient">Académie</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xl font-black text-stone-900 hover:text-rose-500 transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-stone-600 hover:text-rose-500 transition-colors z-50 relative"
              aria-label="Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Fond flou et opacité progressive */}
      <div
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-md z-[40] transition-opacity duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white/95 backdrop-blur-3xl z-[45] shadow-2xl transition-transform duration-500 ease-in-out lg:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-start justify-start h-full px-8 pt-32 pb-12 overflow-y-auto">
          <div className="flex flex-col gap-8 w-full">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, () => setIsMenuOpen(false))}
                className={`text-4xl font-black text-stone-900 hover:text-rose-500 transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="w-full mt-16 space-y-6">
            <a
              href={STRIPE_URL}
              onClick={() => setIsMenuOpen(false)}
              className={`btn-creator block w-full text-center py-4 text-base font-black uppercase tracking-widest transition-all duration-500 shadow-2xl ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: '300ms' }}
            >
              Réserver ma place
            </a>
            <div className={`pt-6 border-t border-stone-100 transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">© AXIA Académie</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const themes = {
    amber: { bg: 'bg-amber-50', text: 'text-amber-500', badge: 'bg-amber-100 text-amber-700', border: 'hover:border-amber-400' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-500', badge: 'bg-indigo-100 text-indigo-700', border: 'hover:border-indigo-400' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-500', badge: 'bg-rose-100 text-rose-700', border: 'hover:border-rose-400' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-500', badge: 'bg-emerald-100 text-emerald-700', border: 'hover:border-emerald-400' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-500', badge: 'bg-violet-100 text-violet-700', border: 'hover:border-violet-400' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-500', badge: 'bg-sky-100 text-sky-700', border: 'hover:border-sky-400' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-500', badge: 'bg-orange-100 text-orange-700', border: 'hover:border-orange-400' }
  };

  const theme = themes[workshop.colorTheme];

  return (
    <div className={`card-creator p-6 md:p-8 flex flex-col transition-all duration-500 bg-white border-2 border-transparent ${theme.border} ${isExpanded ? 'lg:col-span-2 row-span-2 shadow-2xl z-20' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-10 h-10 ${theme.bg} rounded-[1rem] flex items-center justify-center ${theme.text} organic-shape shadow-inner`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        {isExpanded && (
          <button onClick={() => setIsExpanded(false)} className="text-stone-300 hover:text-rose-500 p-2 bg-stone-50 rounded-full transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
        )}
      </div>

      <h3 className="text-xl font-black mb-3 leading-tight text-stone-900">{workshop.title}</h3>
      <p className={`text-stone-500 font-medium leading-relaxed mb-6 ${isExpanded ? 'text-base md:text-lg' : 'text-[13px] flex-grow'}`}>{workshop.promise}</p>

      {!isExpanded ? (
        <button onClick={() => setIsExpanded(true)} className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.text} hover:translate-x-2 transition-transform inline-flex items-center gap-2 group`}>
          Détails & Objectifs <span className="group-hover:translate-x-2 transition-transform">→</span>
        </button>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="grid sm:grid-cols-2 gap-6 py-6 border-y border-stone-100">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Pour qui ?</p>
              <div className="flex flex-wrap gap-2">
                {workshop.forWhom.map((item, i) => (
                  <span key={i} className={`text-[9px] font-bold ${theme.badge} px-2 py-1 rounded-full`}>{item}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Ce que vous allez maîtriser</p>
              <ul className="space-y-2">
                {workshop.expectedResults.map((item, i) => (
                  <li key={i} className="text-[10px] font-bold text-stone-600 flex items-start gap-2">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${theme.text.replace('text-', 'bg-')}`}></div> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4 relative before:absolute before:left-3 before:top-4 before:bottom-4 before:w-[2px] before:bg-stone-100">
            {workshop.timeline.map((step, i) => (
              <div key={i} className="pl-10 relative">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 ${theme.text.replace('text-', 'border-')} flex items-center justify-center text-[10px] font-black ${theme.text} shadow-sm`}>{i + 1}</div>
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-1">
                  <p className="font-bold text-stone-800 text-sm">{step.activity}</p>
                  <span className="text-[9px] font-black uppercase text-stone-300 tracking-widest">{step.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-stone-100">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-stone-900 leading-none">200€</span>
                <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest mt-1">/atelier</span>
              </div>
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest px-3 py-1 bg-rose-50 rounded-full">Place limitée</span>
            </div>
            <a href={STRIPE_URL} className="w-full md:w-auto btn-creator px-5 py-2.5 font-black uppercase tracking-widest text-[11px] text-center">Réserver ma place</a>
          </div>
        </div>
      )}
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: '<p>Bonjour ! Je suis l\'assistant AXIA Académie. Comment puis-je vous aider aujourd\'hui ?</p>' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = () => {
    if (!chatInstance.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `Tu es l'assistant exclusif d'AXIA Académie. 
        TA MISSION : Répondre UNIQUEMENT aux questions basées sur le contexte d'AXIA Académie.
        IMPORTANT : Tu dois répondre EXCLUSIVEMENT en format HTML (utilise <p>, <b>, <ul>, <li>, <br>). N'utilise jamais de Markdown.
        
        CONTEXTE AXIA ACADÉMIE :
        - Formations (200€ par atelier) : L'IA pour tous, Support client IA, Marketing IA, RAG (Assistant Interne), UX/UI IA, Automatisation IA, Productivité IA.
        - Tarifs : 200€ l'atelier. Solutions sur-mesure pour entreprises via devis.
        - Méthode : Diagnostic ROI, Ingénierie IA, Passage à l'échelle.
        - FAQ Dates : Les ateliers sont programmés dès que le seuil de 5 participants est atteint.
        - FAQ Annulation : Montant crédité sous forme d'avoir sur une autre formation.
        - Contact : hello@dhcompany.pro et +32465557109.
        - Localisation : Bruxelles.
        
        CONSIGNE DE SÉCURITÉ : Si l'utilisateur pose une question hors de ce contexte, réponds poliment que tu es là pour accompagner les futurs participants d'AXIA Académie uniquement.`;

        chatInstance.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: { systemInstruction }
        });
      } catch (err) {
        console.error("Failed to initialize Gemini AI", err);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    initChat();
    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (chatInstance.current) {
        const response = await chatInstance.current.sendMessage({ message: userMessage });
        const botText = response.text || "<p>Désolé, j'ai rencontré une petite erreur.</p>";
        setMessages(prev => [...prev, { role: 'model', text: botText }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "<p>L'assistant n'est pas prêt. Veuillez réessayer.</p>" }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "<p>Je suis désolé, je ne peux pas répondre pour le moment.</p>" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] h-[500px] bg-white rounded-[2rem] shadow-3xl border border-stone-100 flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="p-5 bg-creator-gradient text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-black">AX</div>
              <span className="font-bold text-sm tracking-tight">Support AXIA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-4 bg-stone-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'user' ? (
                  <div className="max-w-[85%] p-3.5 rounded-[1.5rem] text-sm font-medium leading-relaxed bg-indigo-600 text-white rounded-tr-none">
                    {m.text}
                  </div>
                ) : (
                  <div
                    className="max-w-[85%] p-3.5 rounded-[1.5rem] text-sm font-medium leading-relaxed bg-white text-stone-800 shadow-sm border border-stone-100 rounded-tl-none prose prose-sm prose-stone"
                    dangerouslySetInnerHTML={{ __html: m.text }}
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3.5 rounded-[1.5rem] rounded-tl-none shadow-sm border border-stone-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-stone-100 bg-white">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
                className="w-full bg-stone-50 border-stone-100 focus:border-rose-300 focus:ring-rose-300 rounded-full pl-5 pr-12 py-3 text-sm font-medium outline-none transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="absolute right-2 top-2 w-8 h-8 bg-creator-gradient text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9-7-9-7v14z" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-creator-gradient rounded-full shadow-2xl flex items-center justify-center text-white transition-transform hover:rotate-12 hover:scale-110 active:scale-95 group"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const partners = [
    'Hub brussel', 'IFAPME', 'EFP', 'Challenge', 'CQP Bxl', 'Ecole-it'
  ];

  return (
    <div className="min-h-screen selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden bg-creator-bg">
      <Header />

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 md:mb-10 tracking-tighter text-stone-900">
                Ne travaillez <br />
                <span className="hand-drawn-circle">plus jamais</span> <br />
                <span className="text-creator-gradient px-1">comme avant.</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-stone-500 font-bold mb-8 md:mb-14 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
                Gagnez 1 jour par semaine. Réduisez vos coûts opérationnels. <span className="hand-drawn-underline">Maîtrisez l'IA</span> qui va faire de vous un leader dans votre secteur.
              </p>

              <div className="flex flex-col sm:row justify-center lg:justify-start gap-4 mb-10 md:mb-16">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#workshops" onClick={(e) => handleLinkClick(e, '#workshops')} className="btn-creator px-6 py-3 text-sm font-black uppercase tracking-widest shadow-2xl text-center">
                    Découvrir le catalogue
                  </a>
                  <a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="px-6 py-3 bg-stone-100 text-stone-900 hover:bg-stone-200 rounded-full transition-all text-sm font-black uppercase tracking-widest text-center">
                    Tarifs & Devis
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-10 opacity-40">
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">100% Pratique</span>
                <div className="hidden sm:block w-1 h-1 bg-stone-400 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">ROI Immédiat</span>
                <div className="hidden sm:block w-1 h-1 bg-stone-400 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Certifié AXIA</span>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10 bg-white p-4 rounded-[4rem] shadow-[0_40px_120px_rgba(244,63,94,0.15)] rotate-2 border-4 border-stone-50 overflow-hidden group hover:rotate-0 transition-all duration-1000">
                <img
                  src="media/axia.png"
                  alt="Équipe AXIA Académie collaborative"
                  className="w-full h-[650px] object-cover rounded-[3.5rem] group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Succès partagé <span className="inline-block w-4"></span></span>
                  </div>
                  <p className="text-xl font-black text-stone-900 leading-tight">Rejoignez la communauté des leaders augmentés par l'IA.</p>
                </div>
              </div>

              <div className="absolute -top-12 -left-12 animate-float-3d z-20">
                <div className="p-6 bg-amber-400 rounded-[2rem] shadow-[0_20px_50px_rgba(245,158,11,0.3)] text-white">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
              </div>

              <div className="absolute bottom-20 -right-8 animate-float-3d-delayed z-20">
                <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-[0_20px_50px_rgba(99,102,241,0.3)] text-white">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS SLIDER */}
      <section className="py-12 md:py-16 bg-stone-50 border-y border-stone-100 overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-4">
          <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-stone-400">
            Organisations formées par <span className="text-stone-900">AXIA Académie</span>
          </h3>
          <div className="h-px bg-stone-200 flex-grow mx-8 hidden lg:block"></div>
        </div>
        <div className="relative flex overflow-x-hidden w-full">
          <div className="flex animate-scroll whitespace-nowrap items-center gap-12 md:gap-16 py-4">
            {[...partners, ...partners, ...partners].map((p, i) => (
              <span key={i} className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-stone-300 hover:text-rose-500 transition-colors duration-500 cursor-default px-4">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSHOPS CATALOGUE */}
      <section id="workshops" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 md:mb-10 leading-[1.1] text-stone-900 px-2">
              La boîte à outils <br /><span className="text-creator-gradient">de votre succès</span>
            </h2>
            <p className="text-stone-500 font-bold text-lg md:text-xl leading-relaxed">S'équiper n'est plus une option. C'est votre assurance contre l'obsolescence technologique.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {WORKSHOPS.map(w => <WorkshopCard key={w.id} workshop={w} />)}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section id="process" className="py-16 md:py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-stone-800 p-3 md:p-4 rounded-[3rem] md:rounded-[4rem] shadow-3xl -rotate-1 md:-rotate-2 relative z-10 border-4 border-stone-700 overflow-hidden group">
                <img
                  src="medias/axia2.png"
                  alt="Interaction et apprentissage pratique"
                  className="w-full h-[400px] md:h-[500px] lg:h-[700px] object-cover rounded-[2.5rem] md:rounded-[3.5rem] group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay"></div>
              </div>
              <div className="absolute -top-10 md:-top-20 -left-10 md:-left-20 w-40 md:w-80 h-40 md:h-80 bg-rose-500/20 rounded-full blur-[60px] md:blur-[100px]"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-10 md:mb-14 leading-[1.1]">
                Une transition <br /><span className="text-creator-gradient">en 3 étapes</span>
              </h2>
              <div className="space-y-10 md:space-y-14">
                {[
                  { num: "01", title: "Diagnostic ROI", desc: "Nous isolons les tâches qui vous coûtent le plus cher en temps et en argent. C'est notre première cible." },
                  { num: "02", title: "Ingénierie IA", desc: "On configure vos outils, on teste les automatisations. Pas de blabla, des robots qui tournent pour vous." },
                  { num: "03", title: "Passage à l'Échelle", desc: "Vous devenez autonome. Votre business peut désormais encaisser 5x plus de volume sans surcharger l'équipe." }
                ].map(step => (
                  <div key={step.num} className="flex gap-6 md:gap-10 group">
                    <span className="text-5xl md:text-7xl font-black text-rose-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500 shrink-0 px-3">{step.num}</span>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black mb-3 md:mb-4">{step.title}</h4>
                      <p className="text-stone-400 font-bold text-lg md:text-xl leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 md:mb-12 tracking-tighter text-stone-900 leading-[1.05]">Prenez de l'avance <br /><span className="text-creator-gradient">maintenant.</span></h2>
          <p className="text-stone-500 font-bold mb-16 md:mb-24 max-w-3xl mx-auto text-lg md:text-2xl leading-relaxed px-4">Prix fixe. Résultats garantis. Formation action immédiate.</p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-5xl mx-auto">
            <div className="p-8 md:p-12 bg-stone-50 border-2 border-stone-100 rounded-[3rem] md:rounded-[4rem] flex flex-col items-center group hover:border-indigo-400 transition-all shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-stone-400 mb-8 md:mb-10">Accès par atelier pratique</p>
              <div className="mb-8 md:mb-10 flex flex-col items-center">
                <span className="text-6xl sm:text-7xl md:text-8xl font-black text-stone-900 tracking-tighter">200€</span>
                <span className="text-lg text-stone-400 font-bold uppercase tracking-widest mt-1">/atelier</span>
              </div>
              <ul className="text-left space-y-4 md:space-y-6 mb-10 md:mb-12 text-base md:text-lg font-bold text-stone-600 w-full">
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div> 4h de Workshop Intensif</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div> Bibliothèque de Prompts Business</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div> Replay vidéo à vie</li>
              </ul>
              <a href={STRIPE_URL} className="w-full py-3.5 btn-creator font-black uppercase text-xs tracking-widest shadow-xl text-center">Réserver mon atelier</a>
            </div>

            <div className="p-8 md:p-12 bg-creator-gradient rounded-[3rem] md:rounded-[4rem] flex flex-col items-center text-white shadow-3xl shadow-rose-200/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none group-hover:bg-white/10 transition-colors"></div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-white/60 mb-8 md:mb-10">Solutions entreprise sur-mesure</p>
              <div className="mb-8 md:mb-10 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight px-3">Accélération <br />d'équipe</div>
              <ul className="text-left space-y-4 md:space-y-6 mb-10 md:mb-12 text-base md:text-lg font-bold text-white/90 w-full">
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-white shrink-0"></div> Audit de productivité d'équipe</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-white shrink-0"></div> Formation intra-entreprise</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-white shrink-0"></div> Support post-formation dédié</li>
              </ul>
              <a href={`mailto:${EMAIL_CONTACT}`} className="w-full py-3.5 bg-white text-rose-600 font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-all shadow-2xl text-center">Obtenir un devis</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 md:mb-16 text-center tracking-tight text-stone-900 px-3">Questions fréquentes</h2>
          <div className="space-y-4 md:space-y-6">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm transition-all hover:border-rose-200">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-left p-6 md:p-8 flex justify-between items-center group">
                  <span className="font-bold text-xl md:text-2xl text-stone-900 group-hover:text-rose-500 transition-colors pr-8">{item.question}</span>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${openFaq === idx ? 'bg-rose-500 text-white rotate-180' : 'bg-stone-50 text-stone-300'}`}><svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg></div>
                </button>
                {openFaq === idx && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-stone-500 font-bold text-lg md:text-xl leading-relaxed bg-white border-t border-stone-50 pt-6 md:pt-8 animate-in fade-in slide-in-from-top-4 duration-500">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 md:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14 mb-16">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-creator-gradient rounded-xl rotate-12 flex items-center justify-center text-white text-xs font-black shadow-lg">AX</div>
              <div className="flex flex-col">
                <span className="text-xl font-black uppercase tracking-widest">AXIA <span className="text-rose-500">Académie</span></span>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Expertise IA & Automatisation</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center text-center">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <a href={`mailto:${EMAIL_CONTACT}`} className="text-xs md:text-sm font-black uppercase tracking-widest text-stone-300 hover:text-white transition-colors">{EMAIL_CONTACT}</a>
                <div className="hidden md:block w-px h-6 bg-stone-800"></div>
                <a href={`tel:${PHONE_CONTACT.replace(/\s/g, '')}`} className="text-xs md:text-sm font-black uppercase tracking-widest text-stone-300 hover:text-white transition-colors">{PHONE_CONTACT}</a>
              </div>
              <div className="hidden md:block w-px h-6 bg-stone-800"></div>
              <div className="flex flex-col items-center lg:items-end">
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Coordinateur des formations</span>
                <a href="https://www.linkedin.com/in/joelparfaitkuate/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white tracking-tight hover:text-rose-500 transition-colors">
                  KUATE JOEL PARFAIT
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8">
              <button onClick={() => setIsLegalOpen(true)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-white transition-colors">Mentions Légales</button>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-700 hidden sm:inline">•</span>
              <button onClick={() => setIsPrivacyOpen(true)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-white transition-colors">Politique de Confidentialité</button>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-600">© {new Date().getFullYear()} — BRUXELLES, BELGIQUE</span>
          </div>
        </div>
      </footer>

      <ChatBot />
      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
};

export default App;
