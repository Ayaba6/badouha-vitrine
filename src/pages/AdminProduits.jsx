import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { 
  PackagePlus, Image as ImageIcon, Tag, DollarSign, Send, 
  CheckCircle, Upload, Trash2, LayoutGrid, Images, Lock 
} from 'lucide-react';

export default function AdminProduits() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [preview, setPreview] = useState('');
  const [existingProducts, setExistingProducts] = useState([]);
  
  // --- SYSTÈME D'ACCÈS ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const ADMIN_PASSWORD = "Badouha2026"; // Remplace par ton code (ex: "1234")

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  async function fetchProducts() {
    const { data } = await supabase.from('produits').select('*').order('created_at', { ascending: false });
    setExistingProducts(data || []);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Code incorrect");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Supprimer ce produit définitivement ?")) {
      const { error } = await supabase.from('produits').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    const formData = new FormData(e.target);
    const file = formData.get('image_file');
    let imageUrl = '';

    try {
      if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('produits')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('produits').getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('produits').insert([{
        nom: formData.get('nom'),
        prix: parseInt(formData.get('prix')),
        image_url: imageUrl,
        categorie: formData.get('categorie'),
        description: formData.get('description')
      }]);

      if (insertError) throw insertError;

      setStatus('Produit ajouté avec succès !');
      e.target.reset();
      setPreview('');
      fetchProducts();
      
    } catch (error) {
      alert("Erreur : " + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  // --- ÉCRAN DE VERROUILLAGE ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 text-center">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-green-600/20">
            <Lock size={30} />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Accès Restreint</h1>
          <p className="text-gray-400 text-sm mb-8 font-medium">Administration de la Boutique</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le code d'accès"
              className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-white text-center focus:ring-2 focus:ring-green-600 outline-none transition-all font-bold"
            />
            <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-green-600 hover:text-white transition-all">
              Déverrouiller
            </button>
          </form>
          <Link to="/" className="inline-block mt-8 text-[10px] text-gray-500 font-black uppercase tracking-widest hover:text-white transition-colors">
            Retour au site
          </Link>
        </div>
      </div>
    );
  }

  // --- INTERFACE ADMIN (Si authentifié) ---
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* BARRE DE NAVIGATION ADMIN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 px-2">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-black">
              <LayoutGrid size={20} />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-tighter">Tableau de bord</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Espace Privé Badouha</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl font-black">
            <Link to="/admin-boutique-prive" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white shadow-sm text-green-600 text-[10px] uppercase tracking-widest transition-all">
              <PackagePlus size={14} /> Boutique
            </Link>
            <Link to="/admin-badouha-prive" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-gray-400 hover:text-gray-600 text-[10px] uppercase tracking-widest transition-all">
              <Images size={14} /> Médiathèque
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Gestion Stock</h1>
            <p className="text-gray-400 text-sm mt-2">Gérez les articles du Marché Badouha</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Désignation</label>
              <input name="nom" type="text" placeholder="Ex: Kit Solaire Pro" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 outline-none font-medium" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Prix (CFA)</label>
                <div className="relative">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <input name="prix" type="number" className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 outline-none font-medium text-gray-700" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Catégorie</label>
                <select name="categorie" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 outline-none font-medium appearance-none">
                  <option>Kits Complets</option>
                  <option>Semences & Plants</option>
                  <option>Matériel Technique</option>
                  <option>Engrais Bio</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Photo du produit</label>
              <div className="relative group">
                <input type="file" name="image_file" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" required />
                <div className="w-full py-10 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50 group-hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-3 text-center">
                  {preview ? <img src={preview} className="w-20 h-20 object-cover rounded-xl shadow-md" /> : <Upload className="text-gray-300" />}
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cliquez pour ajouter une photo</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Description</label>
              <textarea name="description" rows="3" className="w-full p-6 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-green-600 outline-none font-medium text-gray-700 resize-none"></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-xl disabled:opacity-50">
              {loading ? "Chargement..." : "Publier l'article"} <Send size={16} />
            </button>
            {status && <div className="text-center text-green-600 font-black text-sm uppercase tracking-widest animate-pulse">{status}</div>}
          </form>

          {/* LISTE DES PRODUITS */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 max-h-[600px] overflow-y-auto">
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] mb-6 px-2">En ligne ({existingProducts.length})</h3>
                <div className="space-y-4">
                  {existingProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-50 transition-all group">
                      <img src={p.image_url} className="w-12 h-12 rounded-xl object-cover" alt="" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-gray-900 truncate uppercase">{p.nom}</p>
                        <p className="text-[9px] text-green-600 font-bold">{p.prix?.toLocaleString()} CFA</p>
                      </div>
                      <button onClick={() => deleteProduct(p.id)} className="p-2 text-gray-200 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}