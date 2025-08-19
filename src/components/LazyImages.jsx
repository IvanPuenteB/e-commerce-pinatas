import { useEffect, useRef, useState } from 'react';

export default function LazyImage({ src, alt, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // deja de observar
          }
        });
      },
      { rootMargin: '100px' } // carga un poco antes de entrar
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : '/placeholder.jpg'}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}
