import imageKitty from '../assets/images/kitty_flores.jpg';
export default function Welcome() {
  return (
    <section className="bg-gray-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Texto */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Creaciones Axje</h2>
          <p className="text-gray-300">
            Bienvenido a Creaciones Axje, donde encontrarás las mejores piñatas y arreglos florales. Nos dedicamos a convertir tus celebraciones en momentos inolvidables.
          </p>
        </div>

        {/* Imagen representativa (opcional o temporal) */}
        <div className="md:w-1/2">
          <div className="w-full h-90 bg-gray-700 rounded-lg flex items-center justify-center">
            <img
              src={imageKitty}
              alt="Kitty Flores Piñata"
              className="w-full h-full object-cover object-top rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
