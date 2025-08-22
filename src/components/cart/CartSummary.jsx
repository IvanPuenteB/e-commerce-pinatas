import { PayPalButtons } from "@paypal/react-paypal-js";
import ContactForm from "./ContactForm";

export default function CartSummary({
  total,
  contactInfo,
  handleChange,
  setShowConfirmButton,
  setWhatsappMessage,
  cartItems,
  showConfirmButton,
  notifyViaWhatsApp,
}) {
  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-md shadow-md">
      <h3 className="text-lg sm:text-xl font-bold mb-4">RESUMEN DEL PEDIDO</h3>

      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-base sm:text-lg font-bold mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Campos de contacto */}
      <ContactForm contactInfo={contactInfo} handleChange={handleChange} />

      {/* Botón de PayPal */}
      <div className="mt-4 sm:mt-6">
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            if (
              !contactInfo.name.trim() ||
              !contactInfo.email.trim() ||
              !contactInfo.phone.trim()
            ) {
              alert("Por favor completa todos los campos de contacto.");
              return;
            }
            return actions.order.create({
              purchase_units: [{ amount: { value: total.toFixed(2) } }],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const message = `🎉 Nueva compra 🎉\n\nNombre: ${
                contactInfo.name
              }\nEmail: ${contactInfo.email}\nWhatsApp: ${
                contactInfo.phone
              }\nTotal: $${total.toFixed(2)}\n\nProductos:\n${cartItems
                .map((item) => `- ${item.title} x${item.quantity}`)
                .join("\n")}`;
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
        <button
          onClick={notifyViaWhatsApp}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Enviar resumen por WhatsApp
        </button>
      )}
    </div>
  );
}
