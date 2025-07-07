import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductGallery from './pages/ProductGallery';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mt-6">Nuestras Piñatas</h1>
        <Routes>
          <Route path="/" element={<ProductGallery />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
