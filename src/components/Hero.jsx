// src/components/Hero.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

import img1 from '../assets/slider/image1.jpg'; 
import img2 from '../assets/slider/image2.jpg';
import img3 from '../assets/slider/image3.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: "L'Agriculture Hors-Sol",
    subtitle: "Révolution au Burkina",
    desc: "Produisez en abondance, toute l'année, grâce à nos systèmes hydroponiques innovants.",
    image: img1,
    color: "#052e16"
  },
  {
    title: "Devenez Entrepreneur",
    subtitle: "Formation avec Adja",
    desc: "Rejoignez plus de 500 diplômés formés aux techniques de l'agro-écologie moderne.",
    image: img2,
    color: "#022c22"
  },
  {
    title: "Matériel Professionnel",
    subtitle: "Équipez votre exploitation",
    desc: "Serres haute performance, bâches thermiques et systèmes d'irrigation. Tout pour réussir.",
    image: img3,
    color: "#064e3b"
  }
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={'fade'}
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-[80vh] md:h-[65vh] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Ajout de bg-current pour s'assurer que le fond matche la couleur de la slide */}
            <div 
              className="relative h-full w-full flex flex-col md:flex-row overflow-hidden" 
              style={{ backgroundColor: slide.color }}
            >
              
              {/* ZONE TEXTE */}
              <div className="absolute inset-0 md:relative md:w-1/2 flex items-center justify-center p-6 md:p-16 z-30">
                <div className="max-w-xl text-center md:text-left">
                  <h2 className="text-agro-lime font-bold tracking-[0.2em] uppercase mb-2 text-[10px] md:text-sm">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-4italic">
                    {slide.title}
                  </h1>
                  <p className="text-green-50/90 text-sm md:text-lg mb-8 font-light max-w-sm mx-auto md:mx-0 hidden md:block">
                    {slide.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link to="/boutique" className="bg-agro-lime text-green-950 px-8 py-3 rounded-full font-black text-sm md:text-base hover:scale-105 transition-transform shadow-lg">
                      BOUTIQUE
                    </Link>
                    <Link to="/contact" className="border-2 border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm md:text-base hover:bg-white hover:text-green-900 transition-all">
                      CONTACT
                    </Link>
                  </div>
                </div>
              </div>

              {/* ZONE IMAGE */}
              <div className="w-full h-full md:w-1/2 relative overflow-hidden group">
                
                {/* DÉGRADÉ DESKTOP CORRIGÉ : On recule le volet sombre */}
                <div 
                  className="absolute inset-0 z-10 hidden md:block" 
                  style={{ 
                    /* Changement ici : le dégradé devient transparent beaucoup plus vite (dès 10% au lieu de 30%) */
                    background: `linear-gradient(to right, ${slide.color} 0%, ${slide.color}AA 10%, transparent 60%)` 
                  }}
                ></div>

                {/* Dégradé Mobile (inchangé) */}
                <div 
                  className="absolute inset-0 z-10 block md:hidden" 
                  style={{ 
                    background: `linear-gradient(to top, ${slide.color} 20%, ${slide.color}99 60%, ${slide.color}66 100%)` 
                  }}
                ></div>
                
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  /* CORRECTION DU TRAIT BLANC : scale-[1.03] force l'image à dépasser légèrement */
                  className="h-full w-full object-cover object-center scale-[1.03] transform-gpu"
                  onError={(e) => console.error("Image non trouvée :", slide.image)}
                />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet { background: white !important; }
        .swiper-pagination-bullet-active { background: #A3E635 !important; width: 25px !important; border-radius: 4px !important; }
      `}</style>
    </section>
  );
}