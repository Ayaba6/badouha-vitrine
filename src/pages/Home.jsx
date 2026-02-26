import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { Leaf, Users, Calendar, MapPin, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

// Import de tes images locales (Vérifie bien les noms de fichiers dans ton dossier assets)
import imgHorsSol1 from '../assets/hors-sol-1.jpg'; 
import imgHorsSol2 from '../assets/hors-sol-2.jpg';

export default function Home() {
  const stats = [
    {
      icon: <Leaf size={24} strokeWidth={1.5} />,
      value: "100%",
      label: "Bio & Naturel",
    },
    {
      icon: <Users size={24} strokeWidth={1.5} />,
      value: "500+",
      label: "Entrepreneurs Formés",
    },
    {
      icon: <Calendar size={24} strokeWidth={1.5} />,
      value: "365j",
      label: "Production par an",
    },
    {
      icon: <MapPin size={24} strokeWidth={1.5} />,
      value: "Ouaga",
      label: "Siège Social",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* 1. SECTION HERO */}
      <Hero />

      {/* 2. SECTION STATISTIQUES */}
      <section className="relative z-40 -mt-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-green-900/5 border border-gray-100 py-6 px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-gray-100">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center px-2">
                <div className="mb-2 text-green-600 opacity-80">{stat.icon}</div>
                <span className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">{stat.value}</span>
                <span className="text-[11px] md:text-xs font-medium text-gray-500 mt-1 text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION SERVICES */}
      <Services />

      {/* 4. SECTION "POURQUOI L'HORS-SOL ?" */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-green-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="md:w-1/2 z-10">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest">
              Innovation Agricole
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-8 leading-[1.15]">
              Révolutionnez votre culture avec <span className="text-green-600 italic font-serif">Badouha</span>
            </h2>
            <div className="grid gap-6">
              {[
                { t: "Économie d'eau", d: "Réduisez votre consommation jusqu'à 80% grâce au circuit fermé." },
                { t: "Production 365j", d: "Affranchissez-vous des saisons, même pendant la canicule." },
                { t: "Qualité Supérieure", d: "Des nutriments contrôlés pour des produits 100% sains." },
                { t: "Espace Optimisé", d: "Produisez en abondance, du balcon à la grande exploitation." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group text-left">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm border border-green-100 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-300 text-green-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-1">{item.t}</h4>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 relative mt-12 md:mt-0">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-agro-lime/20 rounded-full blur-3xl opacity-60"></div>
            <div className="relative flex gap-4 md:gap-6">
              <div className="w-3/5">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img src={imgHorsSol1} className="h-[350px] md:h-[450px] w-full object-cover" alt="Culture hors-sol" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
              <div className="w-2/5 pt-12 text-left">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img src={imgHorsSol2} className="h-[250px] md:h-[350px] w-full object-cover" alt="Détail système" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="mt-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 hidden md:block">
                  <p className="text-green-700 font-black text-xl leading-none">80%</p>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Moins d'eau</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* 5. CTA FINAL - Version Affinée */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto"> {/* Réduction de max-w-6xl à 4xl pour plus de finesse */}
          <div className="relative bg-green-950 rounded-[2.5rem] p-8 md:p-16 text-center overflow-hidden shadow-2xl shadow-green-900/20">
            
            {/* EFFETS DE LUMIÈRE DISCRETS */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-agro-lime/10 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Prêt à lancer votre <br />
                <span className="text-agro-lime italic font-serif tracking-wide">exploitation ?</span>
              </h2>
              
              <p className="text-green-100/60 mb-10 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                Adja Badouha vous accompagne pas à pas pour transformer votre vision en une réalité rentable et durable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Bouton Principal */}
                <Link 
                  to="/contact" 
                  className="group bg-agro-lime text-green-950 px-8 py-4 rounded-xl font-black text-base flex items-center gap-2 hover:bg-white transition-all duration-300 shadow-lg"
                >
                  Demander un devis
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Nouveau Bouton Contact (remplace le numéro) */}
                <Link 
                  to="/contact" 
                  className="group flex items-center gap-2 text-white font-bold text-base px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 transition-all"
                >
                  Nous contacter
                  <div className="w-2 h-2 rounded-full bg-agro-lime group-hover:animate-ping"></div>
                </Link>
              </div>

              <p className="mt-8 text-green-500/40 text-[10px] uppercase font-bold tracking-[0.3em]">
                Expertise & Accompagnement
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}