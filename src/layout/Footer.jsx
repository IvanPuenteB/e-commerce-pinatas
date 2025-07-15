export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="font-bold text-lg">Creaciones Axjey</h2>
          <p className="text-sm mt-2">Los mejores arreglos y piñatas para tu celebración.</p>
        </div>
        <div>
          <h3 className="font-semibold">Contacto</h3>
          <p className="text-sm">Tel: 1800-123-4567</p>
          <p className="text-sm">info@creacionesaxje.com</p>
        </div>
        <div>
          <h3 className="font-semibold">Legal</h3>
          <p className="text-sm">Política de privacidad</p>
          <p className="text-sm">Términos de servicio</p>
        </div>
      </div>
    </footer>
  );
}
