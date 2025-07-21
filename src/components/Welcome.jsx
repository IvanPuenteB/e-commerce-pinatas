import imageKitty from '../assets/images/kitty_flores.jpg';
import logo from '../assets/images/logo.png';

export default function Welcome() {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Texto */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <img 
            src={logo} 
            alt="Creaciones Axjey" 
            className="h-90 w-auto mb-6"
          />
          <h2 className="text-4xl font-extrabold mb-4">Creaciones Axjey</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Bienvenido a Creaciones Axjey, donde encontrarás las mejores piñatas y arreglos florales. Nos dedicamos a convertir tus celebraciones en momentos inolvidables.
          </p>
        </div>

        {/* Imagen */}
        <div className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-lg">
          <img
            src={imageKitty}
            alt="Kitty Flores Piñata"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
