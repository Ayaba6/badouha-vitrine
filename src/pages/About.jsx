// src/pages/About.jsx
import { MapPin, Award, Leaf, Users, ChevronRight, GraduationCap } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* --- SECTION HERO / HISTOIRE --- */}
      <section className="relative py-20 md:py-28 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Texte à gauche */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-600 text-[10px] font-black uppercase tracking-[0.3em]">
              <Leaf size={14} /> Notre Essence
            </div>
            
            <h1 className="opacity-0 animate-fade-in-up animation-delay-200 text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
              Agro Business Badouha : <br />
              <span className="text-green-600 italic font-serif">Référence</span> de l'Agro-écologie.
            </h1>
            
            <div className="opacity-0 animate-fade-in-up animation-delay-400 space-y-6 text-gray-600 text-lg leading-relaxed font-light">
              <p>
                Dirigée par l'emblématique <span className="font-bold text-gray-900">Adiaratou Sanogo</span>, plus connue sous le nom de <span className="text-green-700 font-bold italic">Adja Badouha</span>, notre structure incarne la résilience et l'innovation au cœur du Burkina Faso.
              </p>
              <p>
                Nous ne nous contentons pas de cultiver ; nous réinventons l'agriculture moderne pour la rendre <span className="text-gray-900 font-medium">accessible, durable et rentable</span>, en mettant un point d'honneur à l'autonomisation des femmes.
              </p>
            </div>

            <div className="opacity-0 animate-fade-in-up animation-delay-400 bg-gray-50 p-8 rounded-[2.5rem] border-l-8 border-green-600 shadow-sm relative group hover:shadow-md transition-all">
              <p className="italic text-gray-700 text-lg leading-relaxed relative z-10">
                "Notre objectif est de promouvoir l'agriculture hors-sol pour une production continue, peu importe la rudesse de la saison."
              </p>
              <span className="block mt-4 font-black text-green-700 uppercase tracking-widest text-[10px]">— Adja Badouha</span>
            </div>
          </div>

          {/* Image à droite avec effets */}
          <div className="order-1 lg:order-2 relative group opacity-0 animate-fade-in-up animation-delay-200">
            <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
              <img 
                src={logo} 
                alt="Adja Badouha" 
                className="w-full h-[450px] md:h-[650px] object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 via-transparent to-transparent"></div>
            </div>
            
            {/* Badge flottant Bio */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-gray-50 hidden md:block group-hover:-translate-y-2 transition-transform duration-500">
              <p className="text-3xl font-black text-green-600">100%</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Bio & Local</p>
            </div>

            {/* Badge flottant Expertise */}
            <div className="absolute top-10 -right-6 bg-green-600 text-white p-5 rounded-3xl shadow-xl z-20 hidden md:block hover:rotate-6 transition-transform">
              <Award size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION NOS VALEURS --- */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4 opacity-0 animate-fade-in-up">
            <h2 className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em]">Engagement</h2>
            <p className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Ce qui nous définit</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Leaf />, title: "Agro-écologie", desc: "Respect total des cycles naturels sans pesticides chimiques." },
              { icon: <Users />, title: "Autonomisation", desc: "Formations dédiées aux femmes et aux jeunes entrepreneurs." },
              { icon: <Award />, title: "Qualité Pro", desc: "Accompagnement technique rigoureux pour chaque projet." }
            ].map((val, i) => (
              <div 
                key={i} 
                style={{ animationDelay: `${(i + 1) * 200}ms` }}
                className="opacity-0 animate-fade-in-up bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-green-100 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{val.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION LOCALISATION --- */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6 opacity-0 animate-fade-in-up">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter text-center md:text-left">
              Où nous <span className="text-green-600 italic font-serif">trouver ?</span>
            </h2>
            <div className="h-[1px] flex-1 bg-gray-100 mx-8 hidden md:block"></div>
            <MapPin className="text-green-600" size={32} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            
            {/* SIÈGE SOCIAL - OUAGA */}
            <div className="group relative opacity-0 animate-fade-in-up animation-delay-200">
              <div className="absolute inset-0 bg-green-600 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform opacity-5"></div>
              <div className="relative bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em] mb-6">Siège Social</h3>
                  <p className="text-2xl font-black text-gray-900 mb-4">Ouagadougou</p>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Situé à <span className="text-gray-900 font-medium">Pagalayiri</span>, à proximité immédiate de la Caisse Populaire de Cissin.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-green-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                  Nous localiser <ChevronRight size={14} />
                </div>
              </div>
            </div>

            {/* CENTRE D'INCUBATION - LOUMBILA */}
            <div className="group relative opacity-0 animate-fade-in-up animation-delay-400">
              <div className="absolute inset-0 bg-green-950 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform opacity-10"></div>
              <div className="relative bg-green-950 p-10 rounded-[3rem] shadow-xl border border-green-900/50 transition-all h-full flex flex-col justify-between overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 text-green-400 mb-6">
                     <GraduationCap size={20} />
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Pôle d'Excellence</h3>
                  </div>
                  <p className="text-2xl font-black text-white mb-4">Loumbila</p>
                  <p className="text-green-100/70 font-light leading-relaxed">
                    Abritant le <span className="text-white font-bold italic">Centre International d'Incubation d'Agriculture Nouvelle Vision</span>. Un hub technologique dédié à la formation et à l'innovation agricole.
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex items-center gap-2 text-green-400 font-black text-[10px] uppercase tracking-widest group-hover:text-white transition-all">
                  Découvrir le centre <ChevronRight size={14} />
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-green-900/20 rounded-full blur-2xl"></div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}