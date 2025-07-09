import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductGallery from './pages/ProductGallery';
import ProductDetail from './pages/ProductDetail';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<ProductGallery />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
