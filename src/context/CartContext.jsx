import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Charger le panier au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('badouha_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Sauvegarder à chaque changement
  useEffect(() => {
    localStorage.setItem('badouha_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Ouvre le panier dès qu'on ajoute
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.prix * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);