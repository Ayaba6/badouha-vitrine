// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Boutique from './pages/Boutique';
import ProductDetail from './pages/ProductDetail'; // <-- Importation
import About from './pages/About';
import Contact from './pages/Contact';
import Mediatheque from './pages/Mediatheque';
import AdminMediatheque from './pages/AdminMediatheque';
import AdminProduits from './pages/AdminProduits';

import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
          <CartDrawer />
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/boutique/:id" element={<ProductDetail />} /> {/* <-- Route dynamique */}
              <Route path="/mediatheque" element={<Mediatheque />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/admin-badouha-prive" element={<AdminMediatheque />} />
              <Route path="/admin-boutique-prive" element={<AdminProduits />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;