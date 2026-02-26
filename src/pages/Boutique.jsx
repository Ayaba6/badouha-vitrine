// src/pages/Boutique.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Leaf, Package, Sparkles, Filter } from 'lucide-react';

export default function Boutique() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const { addToCart } = useCart();

  // Liste des catégories (doit correspondre à celles de ton AdminProduits)
  const categories = ['Tous', 'Kits Complets', 'Semences & Plants', 'Matériel Technique', 'Engrais Bio'];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('produits')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setProducts(data || []);
      setFilteredProducts(data || []);
    }
    setLoading(false);
  }

  // Logique de filtrage
  useEffect(() => {
    if (activeCategory === 'Tous') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.categorie === activeCategory));
    }
  }, [activeCategory, products]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      
      {/* --- BANNIÈRE --- */}
      <header className="relative pt-24 pb-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-600/10 text-green-700 text-[10px] font-black uppercase tracking-[0.2em]">
              <Sparkles size={12} /> Qualité Supérieure
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
              Le Marché <span className="text-green-600 italic font-serif">Badouha.</span>
            </h1>
          </div>

          {/* BARRE DE FILTRES STYLE LUXE */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                  ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-600/20' 
                  : 'bg-white border-gray-100 text-gray-400 hover:border-green-600 hover:text-green-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- GRILLE DE PRODUITS --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-10 h-10 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chargement...</p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                    Affichage de {filteredProducts.length} produit(s)
                </p>
                <div className="h-[1px] flex-1 bg-gray-50 mx-6 hidden md:block"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredProducts.map((product, i) => (
                <div 
                  key={product.id} 
                  className="opacity-0 animate-fade-in-up group"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link to={`/boutique/${product.id}`} className="block">
                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-green-900/10 group-hover:-translate-y-2">
                      <img src={product.image_url} alt={product.nom} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                        <p className="text-green-700 font-black text-sm">{product.prix?.toLocaleString()} <small className="text-[10px]">CFA</small></p>
                      </div>
                    </div>
                  </Link>

                  <div className="mt-6 px-2 space-y-3">
                    <span className="text-[9px] font-black text-green-600/50 uppercase tracking-widest">{product.categorie}</span>
                    <Link to={`/boutique/${product.id}`} className="block">
                        <h3 className="text-xl font-black text-gray-900 leading-tight hover:text-green-600 transition-colors">{product.nom}</h3>
                    </Link>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full mt-4 bg-gray-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 transition-all active:scale-95 shadow-lg"
                    >
                      <ShoppingBag size={14} /> Ajouter au panier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Aucun produit trouvé */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <Filter size={48} className="mx-auto text-gray-100 mb-4" />
            <p className="text-gray-400 font-medium italic">Aucun produit dans cette catégorie pour le moment.</p>
            <button onClick={() => setActiveCategory('Tous')} className="mt-4 text-green-600 font-black text-[10px] uppercase tracking-widest underline">Voir tout le catalogue</button>
          </div>
        )}
      </div>
    </div>
  );
}