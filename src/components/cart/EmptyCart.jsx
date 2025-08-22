import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Tu carrito está vacío 🛍️
      </h2>
      <Link to="/" className="text-blue-600 hover:underline">
        Volver a comprar
      </Link>
    </div>
  );
}
