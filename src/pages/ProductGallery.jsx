// src/pages/ProductGallery.jsx
import { useEffect, useState } from 'react';
import { client } from '../cms/client';
import { urlFor } from '../cms/imageBuilder';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import { motion as Motion } from 'framer-motion'; // ✅ Importa motion

export default function ProductGallery() {
  const [pinatas, setPinatas] = useState([]);
  const [flores, setFlores] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "product" && category == "Piñata"]{
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
        console.log("Piñatas cargadas:", data);
        setPinatas(data);
      });

    client
      .fetch(`*[_type == "product" && category == "Flores"]{
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
        console.log("Flores cargadas:", data);
        setFlores(data);
      });
  }, []);

  return (
    <>
      <Hero />

      

  
        
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestras Piñatas</h2>
          <div className="flex justify-end items-center mb-6">
            <Link to="/nuestras-pinatas" className="text-pink-600 hover:underline text-sm font-medium">
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinatas.slice(0, 6).map((product, index) =>
              product.slug?.current && (
                <Link to={`/product/${product.slug.current}`} key={product._id}>
                  <Motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col h-full border rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
                  >
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
                  </Motion.div>
                </Link>
              )
            )}
          </div>
        </div>
 


      {/* Sección: Nuestras Flores */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestras Flores</h2>
          <div className="flex justify-end items-center mb-6">
            <Link to="/arreglos-florales" className="text-pink-600 hover:underline text-sm font-medium">
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flores.slice(0, 6).map((product, index) =>
              product.slug?.current && (
                <Link to={`/product/${product.slug.current}`} key={product._id}>
                  <Motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col h-full border rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
                  >
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
                  </Motion.div>
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
