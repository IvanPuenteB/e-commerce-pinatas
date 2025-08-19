import { useCart } from '../context/useCart';
import { Link } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';

export default function Cart() {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [_, setWhatsappMessage] = useState('');

  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
Mensaje: ${contactInfo.message}
Total: $${total.toFixed(2)}

Productos:
${cartItems.map(item => `- ${item.title} x${item.quantity}`).join('\n')}`;

    const whatsappNumber = '528128928238';
    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
    window.open(url, '_blank');
    clearCart();
    setShowConfirmButton(false);
  };

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
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Columna izquierda - Lista de productos */}
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold mb-4">
          CARRITO <span className="text-gray-500 text-lg">[{cartItems.length} {cartItems.length === 1 ? 'Producto' : 'Productos'}]</span>
        </h2>

        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl || item.image?.asset?.url}
                  alt={item.title}
                  className="w-50 h-50 object-cover rounded"
                />
                <div className='flex flex-col gap-2'>
                  <h3 className="font-semibold text-2xl">{item.title}</h3>
                  <p className="text-gray-500 text-xl">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => decreaseQuantity(item._id)} className="px-3 py-1 text-xl bg-gray-200 hover:bg-gray-300 rounded cursor-pointer">-</button>
                <span className='text-xl'>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item._id)} className="px-3 py-1 text-xl bg-gray-200 hover:bg-gray-300 rounded cursor-pointer">+</button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-gray-500 hover:text-red-500 cursor-pointer"
              >
                <FiTrash size={20} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={clearCart}
          className="mt-6 bg-red-600 p-3 rounded-2xl text-amber-50 hover:bg-red-700 transition-colors flex items-center gap-2 cursor-pointer mx-auto my-"
        >
          Vaciar carrito
        </button>
      </div>

      {/* Columna derecha - Resumen */}
      <div className="bg-gray-50 p-6 rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4">RESUMEN DEL PEDIDO</h3>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
       
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>${(total).toFixed(2)}</span>
        </div>
{/* 
        // Código promocional
        // <div className="mb-4">
        //   <input
        //     type="text"
        //     placeholder="Código promocional"
        //     className="w-full border p-2 rounded mb-2"
        //   />
        //   <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        //     Aplicar
        //   </button>
        // </div> //

        {/* Campos de contacto */}
        <div className="space-y-3 mb-4 flex flex-col mt-8">
          <input type="text" name="name" placeholder="Tu nombre" className="w-full border p-2 rounded" value={contactInfo.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Tu correo" className="w-full border p-2 rounded" value={contactInfo.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Tu WhatsApp" className="w-full border p-2 rounded" value={contactInfo.phone} onChange={handleChange} />
          <textarea name="message" placeholder="Mensaje personalizado" className="w-full border p-2 rounded resize-none" value={contactInfo.message} onChange={handleChange}></textarea>
        </div>

        {/* Botón de PayPal */}
        <div className="mt-6">
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            if (!contactInfo.name.trim() || !contactInfo.email.trim() || !contactInfo.phone.trim()) {
              alert("Por favor completa todos los campos de contacto.");
              return;
            }
            return actions.order.create({
              purchase_units: [{ amount: { value: (total).toFixed(2) } }],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const message = `🎉 Nueva compra 🎉\n\nNombre: ${contactInfo.name}\nEmail: ${contactInfo.email}\nWhatsApp: ${contactInfo.phone}\nTotal: $${total.toFixed(2)}\n\nProductos:\n${cartItems.map(item => `- ${item.title} x${item.quantity}`).join('\n')}`;
              setWhatsappMessage(message);
              setShowConfirmButton(true);
              alert(`¡Gracias por tu compra, ${details.payer.name.given_name}!`);
            });
          }}
          onCancel={() => alert("Pago cancelado")}
          onError={(err) => console.error("Error en el pago:", err)}
        />
        </div>

        {showConfirmButton && (
          <button onClick={notifyViaWhatsApp} className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer">
            Enviar resumen por WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
