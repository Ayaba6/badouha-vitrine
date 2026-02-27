import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowUpRight, MessageCircle, Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* GRILLE PRINCIPALE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne 1 : À propos */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-black tracking-tighter italic leading-tight uppercase">
              Centre Agro Business <br />
              <span className="text-agro-lime text-2xl md:text-3xl">Badouha</span>
            </h3>
            <p className="text-green-100/60 text-sm leading-relaxed max-w-xs font-light">
              Leader de l'agriculture hors-sol au Burkina Faso. Nous formons et équipons les entrepreneurs agricoles de demain pour une autonomie durable.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/agrobusinessbadouha" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 shadow-lg group"
                title="Suivez-nous sur Facebook"
              >
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-agro-lime hover:text-green-950 transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Navigation</h4>
            <ul className="space-y-4 text-green-100/60 text-sm">
              <li><Link to="/" className="hover:text-agro-lime transition-colors">Accueil</Link></li>
              <li><Link to="/boutique" className="hover:text-agro-lime transition-colors">Boutique Matériel</Link></li>
              <li><Link to="/mediatheque" className="hover:text-agro-lime transition-colors">Médiathèque</Link></li>
              <li><Link to="/contact" className="hover:text-agro-lime transition-colors">Contact & Devis</Link></li>
              <li className="pt-2 border-t border-white/5">
                {/* LIEN VERS L'APP DE GESTION */}
                <a 
                  href="https://app.badouha.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-agro-lime/80 hover:text-agro-lime transition-colors font-bold"
                >
                  <Lock size={12} /> Espace Gestion
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Expertise */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Expertise</h4>
            <ul className="space-y-4 text-green-100/60 text-sm">
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                Installation de Serres <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-agro-lime" />
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                Systèmes Hydroponiques <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-agro-lime" />
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                Vente d'Intrants Bio <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-agro-lime" />
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                Conseil en Agrobusiness <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-agro-lime" />
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact Direct */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Contact Direct</h4>
            <ul className="space-y-4 text-green-100/60 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-agro-lime shrink-0" />
                <span>Ouagadougou, Burkina Faso</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="text-green-500 group-hover:text-green-400 transition-colors">
                    <MessageCircle size={20} />
                </div>
                <a 
                  href="https://wa.me/22670180330" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium underline underline-offset-4 decoration-green-500/30"
                >
                  +226 70 18 03 30
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-agro-lime shrink-0" />
                <a href="mailto:contact@badouha.com" className="hover:text-white transition-colors">contact@badouha.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRE DE FIN */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-green-100/20 uppercase tracking-[0.2em]">
          <p>© {currentYear} Centre Agro Business Badouha. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}