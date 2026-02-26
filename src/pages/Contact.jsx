// src/pages/Contact.jsx
import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Phone, Mail, MapPin, Send, MessageSquare, User, Smartphone, Tag, Clock } from 'lucide-react';
import imgContact from '../assets/contact-hero.jpg'; 

export default function Contact() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    
    const { error } = await supabase.from('messages').insert([{
      nom: formData.get('nom'),
      telephone: formData.get('telephone'),
      sujet: formData.get('sujet'),
      message: formData.get('message')
    }]);

    setLoading(false);
    if (!error) {
      setStatus('Message envoyé avec succès !');
      e.target.reset();
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-12 md:pb-32">
      
      {/* --- PANNEAU D'ACCUEIL --- */}
      <section className="relative h-auto min-h-[350px] md:h-[450px] flex items-center bg-green-950 overflow-hidden py-12 md:py-0">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
          
          {/* TEXTE ANIMÉ */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Clock size={12} /> Réponse sous 24h
            </div>
            
            <h1 className="opacity-0 animate-fade-in-up animation-delay-200 text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">
              Parlons de votre <br />
              <span className="text-green-500 italic font-serif">projet.</span>
            </h1>
            
            <p className="opacity-0 animate-fade-in-up animation-delay-400 text-gray-300 text-sm md:text-lg font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
              Une question sur nos serres ou nos formations ? <br className="hidden md:block"/>
              L'équipe <span className="font-bold text-white border-b border-green-500 pb-0.5">Badouha</span> vous répond.
            </p>
          </div>

          {/* IMAGE ANIMÉE */}
          <div className="hidden lg:block opacity-0 animate-fade-in-up animation-delay-400 relative h-[300px] xl:h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
            <img 
              src={imgContact} 
              alt="Badouha Installations" 
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 10%' }} 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-green-950/40 to-transparent"></div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/4 h-full bg-green-900/10 -skew-x-12 translate-x-10 z-0"></div>
      </section>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* COLONNE GAUCHE (INFOS) - APPARAÎT EN PREMIER */}
          <div className="w-full lg:w-1/3 space-y-4 md:space-y-6 h-fit opacity-0 animate-fade-in-up animation-delay-200">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-gray-100">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 text-center lg:text-left">Contact Direct</h3>
              
              <div className="space-y-6 md:space-y-8">
                <a href="https://wa.me/22670180330" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-700 group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">WhatsApp</p>
                    <p className="text-gray-800 font-bold text-sm md:text-base">+226 70 18 03 30</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-gray-800 font-bold text-sm md:text-base">contact@badouha.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Siège</p>
                    <p className="text-gray-800 font-bold text-sm md:text-base">Ouagadougou, BF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MESSAGE CITATION ANIMÉ */}
            <div className="bg-green-950 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white relative overflow-hidden group">
                <p className="text-base md:text-lg font-medium leading-snug italic relative z-10">
                  "Rendre l'agriculture accessible à tous, partout au Burkina."
                </p>
                <p className="mt-4 text-green-500 font-bold text-[9px] uppercase tracking-widest relative z-10">— Adja Badouha</p>
                <MessageSquare className="absolute -right-4 -bottom-4 text-white/5 opacity-20" size={80} />
            </div>
          </div>

          {/* COLONNE DROITE (FORMULAIRE) - APPARAÎT AVEC UN LÉGER DÉCALAGE */}
          <div className="w-full lg:w-2/3 opacity-0 animate-fade-in-up animation-delay-400">
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-50 space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nom Complet</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input name="nom" type="text" placeholder="Jean Traoré" className="w-full pl-12 pr-6 py-4 md:py-5 bg-gray-50 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-green-500 outline-none border-none text-gray-700 font-medium text-sm md:text-base" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Téléphone</label>
                  <div className="relative">
                    <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input name="telephone" type="tel" placeholder="70 18 03 30" className="w-full pl-12 pr-6 py-4 md:py-5 bg-gray-50 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-green-500 outline-none border-none text-gray-700 font-medium text-sm md:text-base" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Sujet de la demande</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <select name="sujet" className="w-full pl-12 pr-10 py-4 md:py-5 bg-gray-50 rounded-xl md:rounded-2xl outline-none border-none text-gray-700 font-medium appearance-none focus:ring-2 focus:ring-green-500 cursor-pointer text-sm md:text-base">
                    <option>Formation Culture Hors-Sol</option>
                    <option>Installation de Serre Pro</option>
                    <option>Achat de Matériel & Kits</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Votre Message</label>
                <textarea name="message" rows="4" placeholder="Dites-nous tout..." className="w-full p-5 md:p-6 bg-gray-50 rounded-[1.5rem] md:rounded-3xl outline-none border-none text-gray-700 font-medium focus:ring-2 focus:ring-green-500 resize-none text-sm md:text-base"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-950 text-green-400 font-black py-5 md:py-6 rounded-xl md:rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 md:gap-4 group disabled:opacity-50 uppercase tracking-[0.2em] text-[10px] md:text-[11px]"
              >
                {loading ? "Traitement..." : "Envoyer ma demande"}
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              {status && (
                <div className="p-4 rounded-xl text-center font-bold text-xs md:text-sm bg-green-50 text-green-700 border border-green-100 animate-in fade-in zoom-in-95">
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}