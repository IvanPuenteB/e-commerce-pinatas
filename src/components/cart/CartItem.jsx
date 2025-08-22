import { FiTrash } from "react-icons/fi";

export default function CartItem({ item, increaseQuantity, decreaseQuantity, removeFromCart }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
      {/* Imagen + Info */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <img
          src={item.imageUrl || item.image?.asset?.url}
          alt={item.title}
          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded"
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg sm:text-2xl">{item.title}</h3>
          <p className="text-gray-500 text-base sm:text-xl">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Cantidad */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => decreaseQuantity(item._id)}
          className="px-2 sm:px-3 py-1 text-lg sm:text-xl bg-gray-200 hover:bg-gray-300 rounded"
        >
          -
        </button>
        <span className="text-lg sm:text-xl">{item.quantity}</span>
        <button
          onClick={() => increaseQuantity(item._id)}
          className="px-2 sm:px-3 py-1 text-lg sm:text-xl bg-gray-200 hover:bg-gray-300 rounded"
        >
          +
        </button>
      </div>

      {/* Eliminar */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="text-gray-500 hover:text-red-500"
      >
        <FiTrash size={20} />
      </button>
    </div>
  );
}
