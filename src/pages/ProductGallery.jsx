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
      {/* Sección: Nuestaras piñatas de productos */}
   <section className="py-10 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Nuestras Piñatas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 6).map((product) =>
          product.slug?.current && (
            <Link to={`/product/${product.slug.current}`} key={product._id}>
              <div className="flex flex-col h-full border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src={urlFor(product.image).width(600).height(300).url()}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
                    <p className="text-gray-600 font-medium mb-2">${product.price}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  </div>
                </div>
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
