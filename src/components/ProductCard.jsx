// src/components/ProductCard.jsx
export default function ProductCard({ produit }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative h-52 overflow-hidden bg-gray-200">
        <img 
          src={produit.image_url || 'https://via.placeholder.com/400x300?text=Agro+Badouha'} 
          alt={produit.nom}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {produit.categorie}
        </span>
      </div>
      
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{produit.nom}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{produit.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-green-700">
            {produit.prix.toLocaleString()} <span className="text-sm font-normal text-gray-500">FCFA</span>
          </span>
          <button className="bg-gray-900 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}