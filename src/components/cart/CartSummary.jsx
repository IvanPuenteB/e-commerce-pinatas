import { PayPalButtons } from "@paypal/react-paypal-js";
import ContactForm from "./ContactForm";
import { useState } from "react";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [buyerName, setBuyerName] = useState("");

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
              return Promise.reject(
                new Error("Campos de contacto incompletos")
              );
            }
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total.toFixed(2),
                    breakdown: {
                      item_total: {
                        value: total.toFixed(2),
                        currency_code: "MXN",
                      },
                    },
                  },
                  items: cartItems.map((item) => ({
                    name: item.title,
                    unit_amount: {
                      value: item.price.toFixed(2),
                      currency_code: "MXN",
                    },
                    quantity: item.quantity.toString(),
                  })),
                },
              ],
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
              setBuyerName(details.payer.name.given_name);
              setShowSuccess(true); // mostramos modal en vez de alert
            });
          }}
          onCancel={() => alert("Pago cancelado")}
          onError={(err) => {
            console.error("Error en el pago:", err);
            alert("Ocurrió un error procesando el pago. Intenta de nuevo.");
          }}
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

      {/* Modal de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-xl font-bold text-green-600 mb-2">
              ¡Gracias por tu compra 🎉
            </h2>
            <p className="text-gray-700 mb-4">
              {buyerName}, tu pago ha sido procesado con éxito.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
