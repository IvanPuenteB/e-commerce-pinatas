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
  const [isLoading, setIsLoading] = useState(false);

  const { ref: inViewRef, inView } = useInView({
    rootMargin: '200px',
    threshold: 0,
  });

  const loadingPagesRef = useRef(new Set()); // evita doble fetch de la misma página
  const prevInView = useRef(false);
  const mountedRef = useRef(false);

  // Persistir en sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ items, page }));
    } catch (err) {
      console.error('Error saving state to sessionStorage:', err);
    }
  }, [items, page]);

  // Función para traer una página concreta
  // Cambia tu fetchPage para que cuando ya no haya más productos
// vuelva a traer desde el inicio
  const fetchPage = async (pageToFetch) => {
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
    let newItems = await client.fetch(query);

   if (!newItems || newItems.length === 0) {
  setPage(1);
  return;
}

if (pageToFetch === 1 && items.length > 0) {
  // 👉 Barajar la primera página para que se vea diferente al ciclar
  newItems = [...newItems].sort(() => Math.random() - 0.5);
}


    // Concatenar items normalmente
    setItems((prev) => [...prev, ...newItems]);
  } catch (err) {
    console.error('Error fetching items:', err);
  } finally {
    loadingPagesRef.current.delete(pageToFetch);
    setIsLoading(false);
  }
};



  // Cuando cambia "page", pedimos esa página (si no hay ya suficientes items)
 useEffect(() => {
  fetchPage(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page]);


  // Observer: solo incrementa page cuando hay una transición fuera->dentro
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      prevInView.current = inView;
      return;
    }
    if (inView && !prevInView.current && !isLoading ) {
      setPage((p) => p + 1);
    }
    prevInView.current = inView;
  }, [inView, isLoading]);

  // Si la página es muy corta (no alcanza la ventana), cargar más automáticamente
  useEffect(() => {
    if (isLoading) return;

    const ensureContent = () => {
      if (document.body.scrollHeight <= window.innerHeight  && !loadingPagesRef.current.has(page)) {
        setPage((p) => p + 1);
      }
    };

    ensureContent();
    const t = setTimeout(ensureContent, 600);
    return () => clearTimeout(t);
  }, [items, isLoading, page]);

  // Parallax efecto
useEffect(() => {
 const handleScroll = () => {
  const scrollTop = window.scrollY;
  document.querySelectorAll('[data-speed]').forEach((el) => {
    const rect = el.getBoundingClientRect();
    const offsetTop = rect.top + scrollTop;
    const speed = parseFloat(el.getAttribute('data-speed')) || 0;

    let y = (scrollTop - offsetTop) * speed;

    // limitar el desplazamiento para que no se rompa la estética
    y = Math.max(-40, Math.min(40, y));

    el.firstElementChild.style.transform = `translateY(${y}px)`; // 👉 mueve solo el hijo absoluto
  });
};

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      <h1 className="text-3xl font-bold mb-2 text-center">Galería de Piñatas</h1>
      <p className="text-center text-gray-600 mb-8">
        Descubre nuestras piñatas personalizadas únicas
      </p>

      {/* Vista móvil: 1 columna */}
      <div className="sm:hidden flex flex-col gap-6 relative ">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>

      {/* Vista desktop/tablet: 3 columnas */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-6 relative">
        {/* Columna 1 (normal) */}
        <div className="flex flex-col gap-6">
          {items.filter((_, i) => i % 3 === 0).map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>

      {/* Columna 2 (parallax invertido en los items) */}
{/* Columna 2 (parallax individual sin romper el flujo) */}
<div className="flex flex-col gap-6">
  {items.filter((_, i) => i % 3 === 1).map((item) => (
    <div key={item._id} className="relative h-full" data-speed="-0.3">
      <div className="absolute inset-0">
        <ItemCard item={item} />
      </div>
    </div>
  ))}
</div>



        {/* Columna 3 (normal) */}
        <div className="flex flex-col gap-6">
          {items.filter((_, i) => i % 3 === 2).map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      

      {/* sentinel para disparar la carga de la siguiente página cuando entra en vista */}
      <div ref={inViewRef} aria-hidden="true" style={{ height: 1 }} />
    </div>
  );
}
