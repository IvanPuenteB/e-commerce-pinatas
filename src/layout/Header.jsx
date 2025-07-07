import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Creaciones Axje</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Inicio Rápido</Link>
          <Link to="/" className="hover:underline">Nuestras Piñatas</Link>
          <Link to="/" className="hover:underline">Arreglos Florales</Link>
        </nav>
        <button className="border px-4 py-1 rounded hover:bg-gray-100">Comprar</button>
      </div>
    </header>
  );
}
