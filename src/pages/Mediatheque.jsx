// src/pages/Mediatheque.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Image as ImageIcon, Calendar, MapPin, Search, Filter, ChevronDown } from 'lucide-react';

export default function Mediatheque() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState('Toutes les années');

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    const { data, error } = await supabase
      .from('mediatheque')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setPhotos(data || []);
      setFilteredPhotos(data || []);
    }
    setLoading(false);
  }

  const years = ['Toutes les années', ...new Set(photos.map(p => p.annee))].sort((a, b) => b - a);

  const handleFilter = (year) => {
    setSelectedYear(year);
    setShowFilters(false);
    if (year === 'Toutes les années') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(p => p.annee === year));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      {/* --- HEADER --- */}
      <header className="relative pt-20 pb-20 px-6 bg-green-950 text-white text-center z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto relative isolate">
          
          {/* Badge Animé */}
          <div className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-green-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <ImageIcon size={14} /> Archives Visuelles
          </div>
          
          {/* Titre Animé (Délai 200ms) */}
          <h1 className="opacity-0 animate-fade-in-up animation-delay-200 text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-tight">
            L'Album des <span className="text-green-500 italic font-serif text-5xl md:text-7xl block md:inline mt-2 md:mt-0">Cohortes.</span>
          </h1>
          
          {/* Description Animée (Délai 400ms) */}
          <p className="opacity-0 animate-fade-in-up animation-delay-400 max-w-xl mx-auto text-green-100/60 text-base font-light leading-relaxed mb-8">
            Revivez les moments forts des formations de l'incubation de Loumbila.
          </p>

          {/* Filtre Animé (Délai 400ms) */}
          <div className="opacity-0 animate-fade-in-up animation-delay-400 relative inline-block overflow-visible z-[100]">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-4 bg-white text-green-900 px-6 py-3.5 rounded-2xl font-black text-xs shadow-2xl transition-all hover:scale-105 active:scale-95 relative z-[110]"
            >
              <Filter size={16} />
              <span>{selectedYear}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {showFilters && (
              <>
                <div 
                  className="fixed inset-0 z-[105] bg-black/10 backdrop-blur-[2px]" 
                  onClick={() => setShowFilters(false)}
                ></div>

                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/40 overflow-hidden z-[120] animate-in fade-in zoom-in-95 duration-200">
                  <div className="max-h-60 overflow-y-auto">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleFilter(year)}
                        className={`w-full text-center px-6 py-4 text-xs font-black transition-all hover:bg-green-600 hover:text-white border-b border-gray-100/10 last:border-none ${
                          selectedYear === year ? 'text-green-700 bg-green-600/10' : 'text-gray-800'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Déco */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-10 w-64 h-64 bg-green-500 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-green-400 rounded-full blur-[150px]"></div>
        </div>
      </header>

      {/* --- GRILLE D'IMAGES --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12 relative z-10"> 
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
             <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em]">Chargement des archives...</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 animate-in fade-in duration-1000">
            {filteredPhotos.map((item) => (
              <div 
                key={item.id} 
                className="break-inside-avoid group relative overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-gray-200/50 border border-gray-100 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img src={item.image_url} alt={item.titre_cohorte} className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center gap-2">
                      <Calendar size={14} className="text-green-600" />
                      <span className="text-xs font-black text-gray-900">{item.annee}</span>
                  </div>
                </div>
                <div className="p-8 text-left">
                  <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest mb-3">
                      <MapPin size={12} />
                      {item.description?.toLowerCase().includes('loumbila') ? 'Loumbila' : 'Ouagadougou'}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 leading-tight mb-4">{item.titre_cohorte}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}