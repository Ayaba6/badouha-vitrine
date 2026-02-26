import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Upload, CheckCircle, Loader2, ImagePlus, Lock, Eye, EyeOff, X } from 'lucide-react';

export default function AdminMediatheque() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const ADMIN_PASSWORD = "Badouha2026"; 

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [imageFiles, setImageFiles] = useState([]); // Tableau pour plusieurs fichiers
  const [formData, setFormData] = useState({
    titre: '',
    annee: new Date().getFullYear(),
    description: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
    else alert("Mot de passe incorrect");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
  };

  const removeFile = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) return alert("Choisis au moins une image !");
    
    setLoading(true);
    setStatus(`Envoi de ${imageFiles.length} photo(s)...`);

    try {
      // On traite tous les fichiers en parallèle
      await Promise.all(imageFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `cohortes/${fileName}`;

        // 1. Upload vers Storage
        const { error: uploadError } = await supabase.storage
          .from('photos-cohortes')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 2. Récupérer l'URL
        const { data: { publicUrl } } = supabase.storage
          .from('photos-cohortes')
          .getPublicUrl(filePath);

        // 3. Insérer dans la table
        const { error: dbError } = await supabase
          .from('mediatheque')
          .insert([{
            titre_cohorte: formData.titre,
            annee: formData.annee,
            description: formData.description,
            image_url: publicUrl
          }]);

        if (dbError) throw dbError;
      }));

      setStatus('success');
      setFormData({ titre: '', annee: 2026, description: '' });
      setImageFiles([]);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      alert("Erreur lors de l'envoi : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-green-950 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={30} />
          </div>
          <h1 className="text-2xl font-black text-center text-gray-900 mb-2">Espace Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">Déverrouiller</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Médiathèque Multi-Upload</h1>
            <p className="text-gray-500 font-light italic text-sm">Chaque photo sera publiée comme une entrée séparée.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-xs font-bold text-red-500 hover:underline">Déconnexion</button>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center py-10 text-green-600 animate-pulse text-center">
            <CheckCircle size={64} />
            <p className="mt-4 font-bold text-xl">Album publié !</p>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Nom commun pour ces photos</label>
              <input 
                type="text" required
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Ex: Formation Loumbila - Cohorte 2"
                value={formData.titre}
                onChange={(e) => setFormData({...formData, titre: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Année</label>
                <input 
                  type="number" required
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.annee}
                  onChange={(e) => setFormData({...formData, annee: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Ajouter des photos</label>
                <label className="flex items-center justify-center w-full px-4 py-4 bg-green-50 text-green-600 rounded-2xl cursor-pointer hover:bg-green-100 border-2 border-dashed border-green-200">
                  <ImagePlus size={20} className="mr-2" />
                  <span className="text-xs font-bold">Sélectionner</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            {/* Preview des fichiers sélectionnés */}
            {imageFiles.length > 0 && (
              <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 rounded-3xl border border-gray-100">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="preview" />
                    <button 
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Description commune</label>
              <textarea 
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 outline-none h-24"
                placeholder="Décrivez cet événement..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-5 bg-green-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all flex items-center justify-center gap-3 disabled:bg-gray-300"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Upload size={20} />}
              {loading ? status : `Publier ${imageFiles.length} photos`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}