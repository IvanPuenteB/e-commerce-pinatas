import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductGallery from './pages/ProductGallery';
import ProductDetail from './pages/ProductDetail';
import NuestrasPinatas from './pages/NuestrasPinatas';
import ArreglosFlorales from './pages/ArreglosFlorales';
import ContactUs from './pages/ContactUs';
import Cart from './pages/Cart';  
import Layout from './layout/Layout';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "MXN"
};

function App() {
   return (
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <Layout>
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<ProductGallery />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/nuestras-pinatas" element={<NuestrasPinatas />} />  
              <Route path="/arreglos-florales" element={<ArreglosFlorales />} />
              <Route path="/contacto" element={<ContactUs />} />
            </Routes>
          </div>
        </Layout>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
