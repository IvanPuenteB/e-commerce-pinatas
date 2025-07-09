// src/pages/ProductGallery.jsx
import { useEffect, useState } from 'react';
import { client } from '../cms/client';
import { urlFor } from '../cms/imageBuilder';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';

export default function ProductGallery() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        _id,
        title,
        price,
        description,
        slug,
        "image": image{
          asset->
        }
      }`)
      .then((data) => {
        console.log("Productos cargados desde Sanity:", data);
        setProducts(data);
      });
  }, []);

  return (
  <>
    <Hero />
      {/* Sección: Galería de productos */}
  <section className="py-10">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Nuestras Piñatas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) =>
          product.slug?.current && (
            <Link to={`/product/${product.slug.current}`} key={product._id}>
              <div className="border rounded-xl shadow-md p-4 hover:shadow-lg transition">
                <img
                  src={urlFor(product.image).width(400).url()}
                  alt={product.title}
                  className="h-48 w-full object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-sm mt-2">{product.description}</p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  </section>

    <Welcome />
  </>
  );
}
