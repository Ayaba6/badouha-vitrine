import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ShoppingBag, Leaf, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .eq('id', id)
        .single();

      if (error) navigate('/boutique');
      else setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* BOUTON RETOUR */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-400 hover:text-green-600 transition-colors mb-8"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Retour à la boutique</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* SECTION IMAGE - ANIMÉE */}
          <div className="opacity-0 animate-fade-in-up relative aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl">
            <img 
              src={product.image_url} 
              alt={product.nom} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-green-600 font-black text-[10px] uppercase tracking-widest">
                    <Leaf size={14} /> 100% Bio
                </div>
            </div>
          </div>

          {/* SECTION INFOS */}
          <div className="space-y-8">
            <div className="opacity-0 animate-fade-in-up animation-delay-200 space-y-4">
              <span className="text-green-600 font-black text-[10px] uppercase tracking-[0.3em]">
                {product.categorie || 'Équipement Pro'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                {product.nom}
              </h1>
              <p className="text-3xl font-serif italic text-gray-900">
                {product.prix?.toLocaleString()} <small className="text-lg not-italic font-sans font-bold text-gray-400">FCFA</small>
              </p>
            </div>

            <div className="opacity-0 animate-fade-in-up animation-delay-400 h-[1px] bg-gray-100 w-full"></div>

            <div className="opacity-0 animate-fade-in-up animation-delay-400 space-y-6">
              <p className="text-gray-500 leading-relaxed text-lg font-light">
                {product.description || "Ce produit a été rigoureusement sélectionné par l'équipe d'Adja Badouha pour sa durabilité et son efficacité dans les conditions climatiques du Burkina Faso."}
              </p>

              {/* POINTS FORTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                    <ShieldCheck className="text-green-600" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-600">Qualité Testée</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                    <Truck className="text-green-600" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-600">Livraison Partout</span>
                </div>
              </div>
            </div>

            <div className="opacity-0 animate-fade-in-up animation-delay-400 pt-8">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-green-950 text-green-400 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-4 hover:bg-black hover:text-white transition-all shadow-2xl active:scale-[0.98] group"
              >
                <ShoppingBag size={18} />
                Ajouter au panier
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}