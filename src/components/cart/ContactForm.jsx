export default function ContactForm({ contactInfo, handleChange }) {
  return (
    <div className="space-y-2 sm:space-y-3 mb-4">
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
        placeholder="Tu correo"
        className="w-full border p-2 rounded"
        value={contactInfo.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Tu WhatsApp"
        className="w-full border p-2 rounded"
        value={contactInfo.phone}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Mensaje personalizado"
        className="w-full border p-2 rounded resize-none"
        value={contactInfo.message}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
