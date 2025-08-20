import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
        <div>
          <h2 className="font-bold text-lg">Creaciones Axjey</h2>
          <p className="text-sm mt-2">Los mejores arreglos y piñatas para tu celebración.</p>
        </div>
        <div>
          <div className="mb-4 place-items-center">
            <h2 className="font-bold text-lg">Contacto</h2>
          </div>
          
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/invitacionesaxjey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 transition-colors"
            >
              <FaFacebookF className="text-white" size={20} />
            </a>
            {/* <a
              href="https://instagram.com/creacionesaxjey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-pink-600 transition-colors"
            >
              <FaInstagram className="text-white" size={20} />
            </a> */}
            {/* <a
              href="https://X.com/creacionesaxjey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-900 transition-colors"
            >
              <FaXTwitter className="text-white" size={20} />
            </a> */}
            <a
              href="https://www.tiktok.com/@nallelypuente17?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gradient-to-r from-red-600 to-blue-800 transition-colors"
            >
              <FaTiktok className="text-white" size={20} />
            </a>

            <a
              href="https://wa.me/528186038837"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gradient-to-r from-green-600 to-green-800 transition-colors"
            >
              <FaWhatsapp className="text-white text-center" size={25} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Legal</h3>
          <p className="text-sm hover:underline"><a href="/Terminos">Términos y Condiciones</a></p>
        </div>
      </div>
    </footer>
  );
}
