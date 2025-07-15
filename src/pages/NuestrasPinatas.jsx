import { useEffect, useState } from 'react';
import { useInView, InView } from 'react-intersection-observer';

export default function NuestrasPinatas() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMore = () => {
    if (isLoading) return;

    setIsLoading(true);
    const newItems = Array.from({ length: 9 }, (_, i) => ({
      id: page * 9 + i + 1,
      title: `Piñata #${page * 9 + i + 1}`,
      imageUrl: `https://picsum.photos/300/300?random=${page * 9 + i}`,
    }));
    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && !isLoading) {
      loadMore();
    }
  }, [inView]);

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Galería de Piñatas</h1>
      <p className="text-center text-gray-600 mb-8">
        Descubre nuestras piñatas personalizadas únicas
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
        {items.map((item, index) => (
          <InView triggerOnce threshold={0.2} key={item.id}>
            {({ ref: inViewRef, inView: isVisible }) => {
              const initialTranslate =
                index % 3 === 1 ? '-translate-y-12' : 'translate-y-12';

              return (
                <div
                  ref={inViewRef}
                  className={`rounded-xl shadow overflow-hidden transform transition-all duration-700 ease-out 
                    ${isVisible ? 'translate-y-0 opacity-100' : `${initialTranslate} opacity-0`}
                  `}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-2 text-center font-medium">{item.title}</div>
                </div>
              );
            }}
          </InView>
        ))}
      </div>

      <div ref={ref} className="h-10 mt-10 text-center text-gray-400">
        {isLoading ? 'Cargando más piñatas...' : ''}
      </div>
    </div>
  );
}
