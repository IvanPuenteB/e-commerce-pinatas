import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

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
            <h3 className="font-semibold mb-4">Contacto</h3>
          <p className="text-sm mb-1">Tel: 1800-123-4567</p>
          <p className="text-sm mb-4">info@creacionesaxje.com</p>
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
            <a
              href="https://instagram.com/creacionesaxjey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-pink-600 transition-colors"
            >
              <FaInstagram className="text-white" size={20} />
            </a>
            <a
              href="https://twitter.com/creacionesaxjey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-400 transition-colors"
            >
              <FaTwitter className="text-white" size={20} />
            </a>
            <a
              href="https://linkedin.com/company/creacionesaxjey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-700 transition-colors"
            >
              <FaLinkedinIn className="text-white" size={20} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Legal</h3>
          <p className="text-sm">Política de privacidad</p>
          <p className="text-sm">Términos de servicio</p>
        </div>
      </div>
    </footer>
  );
}
