// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Boutique', path: '/boutique' },
    { name: 'Médiathèque', path: '/mediatheque' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* SECTION LOGO SEUL */}
          <div className="flex items-center py-2">
            <Link to="/" className="flex items-center group">
              <img 
                src={logo} 
                alt="Logo Agro Business Badouha" 
                className="h-20 w-auto md:h-27 transition-all duration-300 group-hover:scale-105" 
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-gray-700 hover:text-green-600 font-semibold transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            {/* LIEN MODIFIÉ CI-DESSOUS */}
            <a 
              href="https://app.badouha.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-700 text-white px-5 py-2.5 rounded-xl hover:bg-green-800 transition shadow-lg shadow-green-100 font-bold text-sm"
            >
              Espace Gestion
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-800 focus:outline-none p-2"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white border-t border-gray-100 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-bold text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-4">
            {/* LIEN MODIFIÉ CI-DESSOUS */}
            <a 
              href="https://app.badouha.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-700 text-white py-4 rounded-2xl font-black shadow-lg"
            >
              ESPACE GESTION
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}