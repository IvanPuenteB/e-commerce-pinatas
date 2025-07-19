import { useEffect, useState, useRef } from 'react';
import { useInView, InView } from 'react-intersection-observer';
import { client } from '../cms/client';

export default function NuestrasFlores() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const prevInView = useRef(false);
  const itemsPerPage = 9;

  // Scroll infinito controlado
  useEffect(() => {
    if (inView && !prevInView.current && !isLoading) {
      setPage((prev) => prev + 1);
    }
    prevInView.current = inView;
  }, [inView, isLoading]);

  // Carga desde Sanity por página
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const query = `*[_type == "product" && category == "Flores"] | order(_createdAt desc) [${(page - 1) * itemsPerPage}...${page * itemsPerPage}] {
        _id,
        title,
        slug,
        "imageUrl": image.asset->url
      }`;

      try {
        const newItems = await client.fetch(query);
        setItems((prev) => [...prev, ...newItems]);
      } catch (err) {
        console.error('Error fetching items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (page > 0) fetchData();
  }, [page]);

  // Carga inicial
  useEffect(() => {
    setPage(1);
  }, []);

  // Parallax effect para columnas
  useEffect(() => {
    const handleScroll = () => {
      const cols = document.querySelectorAll('[data-speed]');
      const scrollTop = window.scrollY;
      cols.forEach((col) => {
        const speed = parseFloat(col.getAttribute('data-speed')) || 0;
        col.style.transform = `translateY(${scrollTop * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Galería de Flores</h1>
      <p className="text-center text-gray-600 mb-8">
        Descubre nuestras flores decorativas únicas
      </p>

      <div className="grid grid-cols-3 gap-6 relative overflow-hidden">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6" data-speed={colIndex === 0 ? '0.3' : colIndex === 2 ? '0.2' : undefined}>
            {items.filter((_, i) => i % 3 === colIndex).map((item) => (
              <InView triggerOnce threshold={0.15} key={item._id}>
                {({ ref: inViewRef, inView: isVisible }) => (
                  <div
                    ref={inViewRef}
                    className={`rounded-xl shadow overflow-hidden transform transition-all duration-700 ease-out
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                    `}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-2 text-center font-medium">{item.title}</div>
                  </div>
                )}
              </InView>
            ))}
          </div>
        ))}
      </div>

      {/* Sentinel para infinite scroll */}
      <div ref={ref} className="h-10 mt-10 text-center text-gray-400">
        {isLoading ? 'Cargando más flores...' : ''}
      </div>
    </div>
  );
}
