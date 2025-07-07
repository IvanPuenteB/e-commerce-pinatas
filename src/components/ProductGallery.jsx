import { useEffect, useState } from 'react';
import { client } from '../cms/client';
import { urlFor } from '../cms/imageBuilder';

export default function ProductGallery() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        _id,
        title,
        price,
        description,
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
    <div className="p-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border rounded-xl shadow-md p-4 hover:shadow-lg transition">
          <img
            src={urlFor(product.image).width(400).url()}
            alt={product.title}
            className="h-48 w-full object-cover rounded mb-4"
          />
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <p className="text-sm mt-2">{product.description}</p>
        </div>
      ))}
    </div>
  );
}
