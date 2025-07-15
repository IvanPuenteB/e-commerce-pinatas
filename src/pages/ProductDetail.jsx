// src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../cms/client';
import { useCart } from '../context/useCart';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    client
      .fetch(`*[_type == "product" && slug.current == $slug][0]{
        _id,
        title,
        price,
        image,
        description,
        "imageUrl": image.asset->url
      }`, { slug })
      .then((data) => {
        console.log("Producto recibido:", data);
        setProduct(data);
      });
  }, [slug]);

  if (!product) return <p className="text-center p-10">Cargando producto...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-auto object-contain rounded-xl shadow mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 text-lg mb-4">{product.description}</p>
      <p className="text-2xl font-semibold text-green-600">${product.price}</p>
      <button
        className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito 🛒
      </button>
    </div>
  );
}
