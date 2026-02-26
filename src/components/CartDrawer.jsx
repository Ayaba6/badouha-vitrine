import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-green-950 text-white">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-green-400" />
              <h2 className="text-sm font-black uppercase tracking-widest">Votre Panier</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                <ShoppingBag size={60} strokeWidth={1} />
                <p className="text-sm font-black uppercase tracking-widest">Le panier est vide</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.image_url} alt={item.nom} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-black text-gray-900 leading-tight mb-1">{item.nom}</h3>
                    <p className="text-green-600 font-bold text-xs mb-3">{item.prix.toLocaleString()} FCFA</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-green-600"><Minus size={14} /></button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-green-600"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Estimé</span>
                <span className="text-2xl font-black text-gray-900">{cartTotal.toLocaleString()} <small className="text-xs">FCFA</small></span>
              </div>
              <button className="w-full bg-green-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 group">
                Commander sur WhatsApp <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}