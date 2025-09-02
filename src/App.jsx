import './App.css';
// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "MXN",
  intent: "capture",
  components: "buttons",
  locale: "es_MX"
};

// Lazy loading normal
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const NuestrasPinatas = lazy(() => import('./pages/NuestrasPinatas'));
const ArreglosFlorales = lazy(() => import('./pages/ArreglosFlorales'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Terminos = lazy(() => import('./pages/Terminos'));
const NotFound = lazy(() => import('./pages/404NotFound'));

// Lazy loading con preloading para páginas críticas
const ProductGallery = lazy(() => import('./pages/ProductGallery'));
const Cart = lazy(() => import('./pages/Cart'));

// Función para pre-cargar componentes en segundo plano
function preloadComponents() {
  import('./pages/ProductGallery');
  import('./pages/Cart');
}

function App() {
  // Pre-cargamos componentes críticos después del primer render
  React.useEffect(() => {
    preloadComponents();
  }, []);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <Layout>
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={<div className="text-center p-10">⏳ Cargando página...</div>}>
              <Routes>
                <Route path="/" element={<ProductGallery />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/nuestras-pinatas" element={<NuestrasPinatas />} />
                <Route path="/arreglos-florales" element={<ArreglosFlorales />} />
                <Route path="/contacto" element={<ContactUs />} />
                <Route path="/Terminos" element={<Terminos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </Layout>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
