import React from "react";


const Terminos = () => (
    <><div style={{ maxWidth: 800, margin: "40px auto", padding: "24px" }}>
        <h1 className="text-2xl font-bold mb-4">Términos y Condiciones</h1>
        <p className="text-gray-700 mb-4">
            Bienvenido a nuestra tienda de piñatas en línea. Al acceder y utilizar este sitio web, aceptas los siguientes términos y condiciones:
        </p>
        <ol className="list-decimal pl-6 mb-4">
            <li>
                <strong>Uso del sitio:</strong> El contenido de este sitio es solo para fines informativos y de compra de productos.
            </li>
            <li>
                <strong>Propiedad intelectual:</strong> Todos los textos, imágenes y diseños son propiedad de la tienda y no pueden ser utilizados sin autorización.
            </li>
            <li>
                <strong>Precios y pagos:</strong> Los precios están sujetos a cambios sin previo aviso. Los pagos se procesan de manera segura.
            </li>
            <li>
                <strong>Envíos y devoluciones:</strong> Consulta nuestra política de envíos y devoluciones para más información.
            </li>
            <li>
                <strong>Privacidad:</strong> Tu información personal será tratada de acuerdo con nuestra política de privacidad.
            </li>
            <li>
                <strong>Modificaciones:</strong> Nos reservamos el derecho de modificar estos términos en cualquier momento.
            </li>
        </ol>
        <p>
            Si tienes alguna pregunta, contáctanos a través de nuestro formulario de contacto.
        </p>
    </div>
        <div className="max-w-6xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} CreacionesAxJey. Todos los derechos reservados.</p>
        </div>
</>
);

export default Terminos;