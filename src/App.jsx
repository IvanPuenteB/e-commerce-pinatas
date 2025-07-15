import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductGallery from './pages/ProductGallery';
import ProductDetail from './pages/ProductDetail';
import NuestrasPinatas from './pages/NuestrasPinatas';
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
            </Routes>
          </div>
        </Layout>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
