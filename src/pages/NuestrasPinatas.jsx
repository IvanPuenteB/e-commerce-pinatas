import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from '../cms/client'; // asegura que esta ruta es la tuya
import ItemCard from '../components/ItemCard';

export default function NuestrasPiñatas() {
  const itemsPerPage = 9;
  const storageKey = 'pinatas_state_v1';

  // Restaurar estado desde sessionStorage si existe
  const saved = (() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [items, setItems] = useState(saved?.items || []);
  // "page" representa la página siguiente a solicitar (1 = primer lote)
  const [page, setPage] = useState(saved?.page || 1);
  const [hasMore, setHasMore] = useState(saved?.hasMore ?? true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    rootMargin: '200px',
    threshold: 0,
  });

  const loadingPagesRef = useRef(new Set()); // evita doble fetch de la misma página
  const prevInView = useRef(false);
  const mountedRef = useRef(false);

  // Persistir en sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ items, page, hasMore }));
    } catch (err) {
      console.error('Error saving state to sessionStorage:', err);
    }
  }, [items, page, hasMore]);

  // Función para traer una página concreta
  const fetchPage = async (pageToFetch) => {
    if (!hasMore) return;
    if (loadingPagesRef.current.has(pageToFetch)) return;

    loadingPagesRef.current.add(pageToFetch);
    setIsLoading(true);

    const start = (pageToFetch - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const query = `*[_type == "product" && category == "Piñata"]
      | order(_createdAt desc) [${start}...${end}] {
        _id,
        title,
        slug,
        "imageUrl": image.asset->url
      }`;

    try {
      const newItems = await client.fetch(query);

      if (!newItems || newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => {
          const ids = new Set(prev.map((i) => i._id));
          const filtered = newItems.filter((i) => !ids.has(i._id));
          return [...prev, ...filtered];
        });
      }
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      loadingPagesRef.current.delete(pageToFetch);
      setIsLoading(false);
    }
  };

  // Cuando cambia "page", pedimos esa página (si no hay ya suficientes items)
  useEffect(() => {
    // si ya tenemos suficientes items para cubrir hasta page, no pedir
    if (items.length >= page * itemsPerPage) return;
    fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Observer: solo incrementa page cuando hay una transición fuera->dentro
  // ignorando la primera detección justo después del montaje
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      prevInView.current = inView;
      return;
    }
    if (inView && !prevInView.current && !isLoading && hasMore) {
      setPage((p) => p + 1);
    }
    prevInView.current = inView;
  }, [inView, isLoading, hasMore]);

  // Si la página es muy corta (no alcanza la ventana), cargar más automáticamente
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const ensureContent = () => {
      if (document.body.scrollHeight <= window.innerHeight && hasMore && !loadingPagesRef.current.has(page)) {
        setPage((p) => p + 1);
      }
    };

    // check inmediato y después de un pequeño delay (para cuando imágenes carguen)
    ensureContent();
    const t = setTimeout(ensureContent, 600);
    return () => clearTimeout(t);
  }, [items, isLoading, hasMore, page]);

  // Parallax (igual que lo tenías)
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Galería de Piñatas</h1>
      <p className="text-center text-gray-600 mb-8">
        Descubre nuestras piñatas personalizadas únicas
      </p>

     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative overflow-hidden">
  {/* Vista 1 columna (móvil) */}
  <div className="flex flex-col gap-6 sm:hidden">
    {items.map((item) => (
      <ItemCard key={item._id} item={item} />
    ))}
  </div>

  {/* Vista 3 columnas (desktop/tablet) */}
  <div className="hidden sm:flex flex-col gap-6" data-speed="0.3">
    {items.filter((_, i) => i % 3 === 0).map((item) => (
      <ItemCard key={item._id} item={item} />
    ))}
  </div>

  <div className="hidden sm:flex flex-col gap-6">
    {items.filter((_, i) => i % 3 === 1).map((item) => (
      <ItemCard key={item._id} item={item} />
    ))}
  </div>

  <div className="hidden sm:flex flex-col gap-6" data-speed="0.2">
    {items.filter((_, i) => i % 3 === 2).map((item) => (
      <ItemCard key={item._id} item={item} />
    ))}
  </div>
</div>


      {/* Sentinel */}
      <div ref={ref} className="h-10 mt-10 text-center text-gray-400">
        {isLoading && hasMore && 'Cargando más piñatas...'}
        {!hasMore && 'No hay más piñatas para mostrar'}
      </div>
    </div>
  );
}
