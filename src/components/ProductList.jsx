// src/components/ProductList.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduits();
  }, []);

  async function getProduits() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProduits(data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Notre Boutique</h2>
          <p className="text-gray-500 mt-2">Équipez-vous avec le meilleur matériel agro-écologique.</p>
        </div>
        <span className="text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-full">
          {produits.length} articles disponibles
        </span>
      </div>

      {produits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {produits.map(produit => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl shadow-inner text-gray-500 italic">
          Bientôt de nouveaux accessoires en stock...
        </div>
      )}
    </section>
  );
}