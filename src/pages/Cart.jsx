import { useCart } from "../context/useCart";
import { useState } from "react";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

export default function Cart() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [_, setWhatsappMessage] = useState("");

  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const notifyViaWhatsApp = () => {
    const message = `🎉 Nueva compra 🎉

Nombre: ${contactInfo.name}
Email: ${contactInfo.email}
WhatsApp: ${contactInfo.phone}
Mensaje: ${contactInfo.message}
Total: $${total.toFixed(2)}

Productos:
${cartItems.map((item) => `- ${item.title} x${item.quantity}`).join("\n")}`;

    const whatsappNumber = "528128928238";
    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
    window.open(url, "_blank");
    clearCart();
    setShowConfirmButton(false);
  };

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Columna izquierda */}
      <div className="md:col-span-2">
        <CartList
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </div>

      {/* Columna derecha */}
      <CartSummary
        total={total}
        contactInfo={contactInfo}
        handleChange={handleChange}
        setShowConfirmButton={setShowConfirmButton}
        setWhatsappMessage={setWhatsappMessage}
        cartItems={cartItems}
        showConfirmButton={showConfirmButton}
        notifyViaWhatsApp={notifyViaWhatsApp}
      />
    </div>
  );
}
