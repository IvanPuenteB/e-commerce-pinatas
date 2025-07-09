import { Link } from 'react-router-dom';
import imageOnePiece from '../assets/images/Onepice.jpg';

export default function Hero() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
        {/* Texto */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ¡Descubre la magia de nuestras piñatas!
          </h1>
          <p className="text-gray-600 mb-6">
            En Creaciones Axje, cada piñata es una obra de arte diseñada para hacer tus celebraciones inolvidables. Elige entre una variedad de estilos y personalizaciones que se adaptan a tus necesidades.
          </p>
          <div className="flex gap-4">
            <Link
              to="/"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Comprar
            </Link>
            <Link
              to="/"
              className="border border-black text-black px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Explorar
            </Link>
          </div>
        </div>

        {/* Imagen destacada (puedes poner la real después) */}
        <div className="md:w-1/2">
          {/* Imagen de ejemplo, reemplaza con la imagen real de tu piñata */}
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={imageOnePiece} alt="One Piece Piñata" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section> 
  );
}
