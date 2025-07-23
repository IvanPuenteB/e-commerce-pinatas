// src/pages/ContactUs.jsx
import img from '../assets/images/Stich3D.jpg';

export default function ContactUs() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Formulario */}
      <div>
        <p className="uppercase text-sm text-gray-500 mb-1">#Somos los mas chidos</p>
        <h2 className="text-3xl font-bold mb-2">Contacta con nosotros</h2>
        <p className="text-gray-600 mb-6">Si estás interesado en nuestros productos, no dudes en contactarnos.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input type="text" className="w-full border px-4 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full border px-4 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Mensaje</label>
            <textarea rows="5" className="w-full border px-4 py-2 rounded resize-none" placeholder="Escribe tu mensaje..." />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="text-sm">
              Acepto los <a href="#" className="underline">Términos</a>
            </label>
          </div>
          <button type="submit" className="bg-black text-white px-6 py-2 rounded">Enviar</button>
        </form>
      </div>

      {/* Imagen o mapa */}
      <div className="bg-gray-200 flex items-center  rounded-2xl justify-center shadow-lg">
        <div className="text-center rounded-2xl overflow-hidden">
          <img src={img} alt="Contact Us" className="w-full h-auto rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
