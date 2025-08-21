// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import logo from "../assets/images/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Creaciones Axjey"
            className="h-16 sm:h-20 md:h-24 hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Menú de escritorio */}
        <nav className="hidden md:flex space-x-8 lg:space-x-12 text-lg lg:text-2xl font-semibold text-gray-800 items-center">
          <Link
            to="/"
            className="hover:scale-105 hover:text-yellow-500 transition"
          >
            Inicio
          </Link>
          <Link
            to="/nuestras-pinatas"
            className="hover:scale-105 hover:text-yellow-500 transition"
          >
            Galeria de Piñatas
          </Link>
          <Link
            to="/arreglos-florales"
            className="hover:scale-105 hover:text-yellow-500 transition"
          >
            Galeria de Flores
          </Link>
          <Link
            to="/contacto"
            className="hover:scale-105 hover:text-yellow-500 transition"
          >
            Contacto
          </Link>
        </nav>

        {/* Carrito + Botón menú móvil */}
        <div className="flex items-center gap-4">
          {/* Carrito con contador */}
          <Link
            to="/cart"
            className="relative text-2xl hover:opacity-80 hover:scale-110 transition-transform duration-300"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Botón hamburguesa solo en móvil */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-6 text-lg font-semibold text-gray-800">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-500 transition"
            >
              Inicio
            </Link>
            <Link
              to="/nuestras-pinatas"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-500 transition"
            >
              Galeria de Piñatas
            </Link>
            <Link
              to="/arreglos-florales"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-500 transition"
            >
              Galeria de Flores
            </Link>
            <Link
              to="/contacto"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-500 transition"
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
