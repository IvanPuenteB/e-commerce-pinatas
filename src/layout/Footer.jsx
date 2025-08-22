import { FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl">Creaciones Axjey</h2>
          <p className="text-sm mt-2">Los mejores arreglos y piñatas para tu celebración.</p>
        </div>

        {/* Redes sociales */}
        <div className="text-center">
          <h3 className="font-bold text-lg mb-3">Contacto</h3>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.facebook.com/invitacionesaxjey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 transition-colors"
            >
              <FaFacebookF size={22} />
            </a>

            <a
              href="https://www.tiktok.com/@nallelypuente17?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gradient-to-r from-red-600 to-blue-800 transition-colors"
            >
              <FaTiktok size={22} />
            </a>

            <a
              href="https://wa.me/528186038837"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gradient-to-r from-green-600 to-green-800 transition-colors"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2">Legal</h3>
          <p className="text-sm">
            <a href="/Terminos" className="hover:underline">
              Términos y Condiciones
            </a>
          </p>
        </div>

      </div>

      {/* Copy */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Creaciones Axjey. Todos los derechos reservados.
      </div>
    </footer>
  );
}
