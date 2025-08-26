// src/pages/ContactUs.jsx
import { useState } from "react";
import img from '../assets/images/Stich3D.jpg';

export default function ContactUs() {
  const [confirmation, setConfirmation] = useState("");

  const sendWhatsApp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const phoneNumber = "528128928238"; // 
    const url = `https://wa.me/${phoneNumber}?text=👋 Hola, te estoy contactando a través de la página de contacto. Soy ${name} (${email}).%0A${message}`;

    // Abrir WhatsApp
    window.open(url, "_blank");

    // Mostrar mensaje de confirmación
    setConfirmation("✅ Se abrió WhatsApp para enviar tu mensaje.");
    
    // Limpiar formulario
    e.target.reset();
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Formulario */}
      <div>
        <p className="uppercase text-sm text-gray-500 mb-1">#Somos los más chidos</p>
        <h2 className="text-3xl font-bold mb-2">Contacta con nosotros</h2>
        <p className="text-gray-600 mb-6">Si estás interesado en nuestros productos, no dudes en contactarnos.</p>

        <form onSubmit={sendWhatsApp} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input 
              type="text" 
              name="name" 
              className="w-full border px-4 py-2 rounded" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              className="w-full border px-4 py-2 rounded" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Mensaje</label>
            <textarea 
              name="message" 
              rows="5" 
              className="w-full border px-4 py-2 rounded resize-none" 
              placeholder="Escribe tu mensaje..." 
              required 
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms" className="text-sm">
              Acepto los <a href="/Terminos" className="underline">Términos</a>
            </label>
          </div>
          <button 
            type="submit" 
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Enviar por WhatsApp
          </button>
        </form>

        {/* Mensaje de confirmación */}
        {confirmation && (
          <p className="mt-4 text-green-700 font-medium">{confirmation}</p>
        )}
      </div>

      {/* Imagen */}
      <div className="bg-gray-200 flex items-center rounded-2xl justify-center shadow-lg">
        <div className="text-center rounded-2xl overflow-hidden">
          <img src={img} alt="Contact Us" className="w-full h-auto rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
