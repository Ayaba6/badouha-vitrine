// src/components/FormationCard.jsx
export default function FormationCard({ formation }) {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="md:w-1/3 h-48 md:h-auto bg-green-100">
        <img 
          src={formation.image_url || 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80'} 
          className="w-full h-full object-cover"
          alt={formation.titre}
        />
      </div>
      
      <div className="p-6 md:w-2/3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-green-900">{formation.titre}</h3>
          <span className="bg-agro-lime text-green-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {formation.duree}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {formation.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-green-700">Prochaine session :</span> 
            {new Date(formation.date_debut).toLocaleDateString('fr-FR')}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-green-700">Prix :</span> {formation.prix.toLocaleString()} FCFA
          </div>
        </div>
        
        <button className="w-full md:w-auto bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-100">
          S'inscrire à la formation
        </button>
      </div>
    </div>
  );
}