// src/pages/Cart.jsx
import { useCart } from '../context/useCart';
import { Link } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';

export default function Cart() {

  const [contactInfo, setContactInfo] = useState({
  name: '',
  email: '',
  phone: ''
});

const [showConfirmButton, setShowConfirmButton] = useState(false);
const [_, setWhatsappMessage] = useState('');

const handleChange = (e) => {
  setContactInfo({
    ...contactInfo,
    [e.target.name]: e.target.value
  });
};

const notifyViaWhatsApp = () => {
  const message = `🎉 Nueva compra 🎉

Nombre: ${contactInfo.name}
Email: ${contactInfo.email}
WhatsApp: ${contactInfo.phone}
Total: $${total.toFixed(2)}

Productos:
${cartItems.map(item => `- ${item.title} x${item.quantity}`).join('\n')}`;

  const whatsappNumber = '528128928238'; // ← Pon tu número real aquí
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
  window.open(url, '_blank');
  clearCart(); // ← Solo aquí lo vacías
  setShowConfirmButton(false);
};

  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío 🛍️</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Volver a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Carrito de compras</h2>

      <ul className="divide-y">
        {cartItems.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  item.imageUrl ||
                  item.image?.asset?.url
                }
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
  <button
    onClick={() => decreaseQuantity(item._id)}
    className="px-2 bg-gray-200 rounded"
  >
    -
  </button>
  <span>{item.quantity}</span>
  <button
    onClick={() => increaseQuantity(item._id)}
    className="px-2 bg-gray-200 rounded"
  >
    +
  </button>
</div>

            
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
            
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <button
          onClick={clearCart}
          className="text-red-500 hover:underline"
        >
          Vaciar carrito
        </button>
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>

      
<div className="mb-6 space-y-4">
  <input
  type="text"
  name="name"
  placeholder="Tu nombre"
  className="w-full border p-2 rounded"
  value={contactInfo.name}
  onChange={handleChange}
/>
<input
  type="email"
  name="email"
  placeholder="Tu correo electrónico"
  className="w-full border p-2 rounded"
  value={contactInfo.email}
  onChange={handleChange}
/>
<input
  type="tel"
  name="phone"
  placeholder="Tu número de WhatsApp"
  className="w-full border p-2 rounded"
  value={contactInfo.phone}
  onChange={handleChange}
/>

</div>


      <div className="mt-8">
  <PayPalButtons
    style={{ layout: "horizontal" }}
    createOrder={(data, actions) => {
      // ✅ Validar que los datos estén completos
      if (
        !contactInfo.name.trim() ||
        !contactInfo.email.trim() ||
        !contactInfo.phone.trim()
      ) {
        alert("Por favor completa todos los campos de contacto.");
        return;
      }

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: total.toFixed(2),
            },
          },
        ],
      });
    }}
    onApprove={(data, actions) => {
  return actions.order.capture().then((details) => {
    const message = `🎉 Nueva compra 🎉

Nombre: ${contactInfo.name}
Email: ${contactInfo.email}
WhatsApp: ${contactInfo.phone}
Total: $${total.toFixed(2)}

Productos:
${cartItems.map(item => `- ${item.title} x${item.quantity}`).join('\n')}`;

    setWhatsappMessage(message); // <- Guarda el mensaje
    setShowConfirmButton(true);  // <- Muestra el botón
    alert(`¡Gracias por tu compra, ${details.payer.name.given_name}!`);
  });
}}



    onCancel={() => {
      alert("Pago cancelado");
    }}
    onError={(err) => {
      console.error("Error en el pago:", err);
    }}
  />
  
</div>

{showConfirmButton && (
  <div className="mt-4">
    <h3 className="text-lg font-bold">¿Quieres recibir un resumen por WhatsApp?</h3>
    <button
      onClick={notifyViaWhatsApp}
      className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
    >
      Enviar WhatsApp
    </button>
  </div>
)}

    </div>
  );
}
