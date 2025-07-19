import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from '../cms/client';
import ItemCard from '../components/ItemCard';

export default function NuestrasPinatas() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const itemsPerPage = 9;
  const prevInView = useRef(false);

  // Incrementa la página cuando el sentinel pasa de fuera a dentro de vista
  useEffect(() => {
    console.log('📍useEffect - inView:', inView, 'prevInView:', prevInView.current, 'isLoading:', isLoading);
    if (inView && !prevInView.current && !isLoading) {
      setPage((prev) => {
        console.log('🔼 Incrementando página a', prev + 1);
        return prev + 1;
      });
    }
    prevInView.current = inView;
  }, [inView, isLoading]);

  // Fetch de datos cuando cambia la página
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log('📦 Fetching data for page:', page);

      const query = `*[_type == "product" && category == "Piñata"] | order(_createdAt desc) [${(page - 1) * itemsPerPage}...${page * itemsPerPage}] {
        _id,
        title,
        slug,
        "imageUrl": image.asset->url
      }`;

      try {
        const newItems = await client.fetch(query);
        console.log('✅ Items recibidos:', newItems.length);
        setItems((prev) => [...prev, ...newItems]);
      } catch (err) {
        console.error('❌ Error fetching items:', err);
      } finally {
        setIsLoading(false);
        console.log('🔚 Finalizó fetch de datos');
      }
    };

    if (page > 0) {
      fetchData();
    }
  }, [page]);

  // Carga inicial
  useEffect(() => {
    console.log('🔄 Carga inicial, seteando página 1');
    setPage(1);
  }, []);

  // Parallax effect para columnas
  useEffect(() => {
    const handleScroll = () => {
      const columns = document.querySelectorAll('[data-speed]');
      const scrollTop = window.scrollY;

      columns.forEach((col) => {
        const speed = parseFloat(col.getAttribute('data-speed')) || 0;
        col.style.transform = `translateY(${scrollTop * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    console.log('🌀 Parallax scroll handler añadido');
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('🧹 Parallax scroll handler eliminado');
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Galería de Piñatas</h1>
      <p className="text-center text-gray-600 mb-8">Descubre nuestras piñatas personalizadas únicas</p>

      <div className="grid grid-cols-3 gap-6 relative overflow-hidden">
        {/* Columna izquierda con parallax */}
        <div className="flex flex-col gap-6" data-speed="0.3">
          {items.filter((_, i) => i % 3 === 0).map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>

        {/* Columna central sin movimiento */}
        <div className="flex flex-col gap-6">
          {items.filter((_, i) => i % 3 === 1).map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>

        {/* Columna derecha con parallax */}
        <div className="flex flex-col gap-6" data-speed="0.2">
          {items.filter((_, i) => i % 3 === 2).map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      <div ref={ref} className="h-10 mt-10 text-center text-gray-400">
        {isLoading ? 'Cargando más piñatas...' : ''}
      </div>
    </div>
  );
}
