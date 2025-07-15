// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Creaciones Axjey
        </Link>

        {/* Navegación */}
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Inicio Rápido</Link>
          <Link to="/nuestras-pinatas" className="hover:underline">Nuestras Piñatas</Link>
          <Link to="/" className="hover:underline">Arreglos Florales</Link>
        </nav>

        {/* Carrito + Botón Comprar */}
        <div className="flex items-center gap-4">
         
          

          {/* Carrito con contador */}
          <Link to="/cart" className="relative text-xl hover:opacity-80">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
