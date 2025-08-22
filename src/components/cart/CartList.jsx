import CartItem from "./CartItem";

export default function CartList({ cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
        CARRITO{" "}
        <span className="text-gray-500 text-base sm:text-lg">
          [{cartItems.length} {cartItems.length === 1 ? "Producto" : "Productos"}]
        </span>
      </h2>

      <div className="divide-y">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <button
        onClick={clearCart}
        className="mt-6 bg-red-600 px-4 py-2 rounded-xl text-white hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
      >
        Vaciar carrito
      </button>
    </div>
  );
}
