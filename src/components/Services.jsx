import { Sprout, GraduationCap, ShoppingBag, Microscope } from 'lucide-react';

const services = [
  { 
    title: "Installation de Serres", 
    desc: "Conception et montage de structures modernes adaptées aux réalités du climat sahélien.",
    icon: <Sprout size={32} strokeWidth={1.5} />,
    hoverColor: "hover:bg-emerald-50", // Couleur au survol
    iconColor: "text-emerald-600"
  },
  { 
    title: "Formation Hydroponique", 
    desc: "Maîtrisez les secrets de la culture hors-sol pour une production bio et rentable toute l'année.",
    icon: <GraduationCap size={32} strokeWidth={1.5} />,
    hoverColor: "hover:bg-blue-50",
    iconColor: "text-blue-600"
  },
  { 
    title: "Vente de Matériel", 
    desc: "Équipements professionnels : irrigation, bâches thermiques et intrants biologiques certifiés.",
    icon: <ShoppingBag size={32} strokeWidth={1.5} />,
    hoverColor: "hover:bg-orange-50",
    iconColor: "text-orange-600"
  },
  { 
    title: "Suivi Technique", 
    desc: "Un accompagnement personnalisé de A à Z pour garantir la réussite de vos projets agricoles.",
    icon: <Microscope size={32} strokeWidth={1.5} />,
    hoverColor: "hover:bg-purple-50",
    iconColor: "text-purple-600"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-green-600 uppercase tracking-[0.3em] mb-4">
            Notre Savoir-Faire
          </h2>
          <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Des solutions innovantes pour une agriculture <span className="text-green-600 italic font-serif">durable</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div 
              key={i} 
              className={`group relative bg-white p-10 rounded-[2.5rem] border border-gray-100 
                          transition-all duration-500 ease-out
                          hover:scale-105 hover:shadow-2xl hover:shadow-gray-200/50
                          ${s.hoverColor} cursor-default`}
            >
              {/* Icône avec effet de rebond au survol */}
              <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 
                              group-hover:rotate-6 transition-transform duration-300 ${s.iconColor}`}>
                {s.icon}
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800 transition-colors duration-300">
                {s.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
                {s.desc}
              </p>

              {/* Barre décorative qui s'élargit au survol */}
              <div className="mt-8 w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full w-0 group-hover:w-full transition-all duration-500 bg-current ${s.iconColor}`}></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}