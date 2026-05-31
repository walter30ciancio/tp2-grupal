import React, { useState, useEffect, useCallback } from 'react';
import './Galeria.css';

// ─────────────────────────────────────────────────────────
// DATOS: las imágenes de la galería
// Usamos la API pública de Unsplash (no requiere clave)
// El parámetro sig= es solo para que cada URL sea única
// ─────────────────────────────────────────────────────────
const IMAGES = [
  { id: 1,  src: '/img/galeria/dev1.jpg',   thumb: '/img/galeria/dev1.jpg',   title: 'Desarrollador',       category: 'Desarrollo' },
  { id: 2,  src: '/img/galeria/design1.jpg', thumb: '/img/galeria/design1.jpg', title: 'Prototipado',           category: 'Diseño UX/UI' },
  { id: 3,  src: '/img/galeria/project1.jpg',   thumb: '/img/galeria/project1.jpg',   title: 'Página Web de Pagos',   category: 'Proyectos' },
  { id: 4,  src: '/img/galeria/dev2.jpg', thumb: '/img/galeria/dev2.jpg', title: 'Arquitectura',     category: 'Desarrollo' },
  { id: 5,  src: '/img/galeria/design2.jpg', thumb: '/img/galeria/design2.jpg', title: 'Diseño Mobile First',        category: 'Diseño UX/UI' },
  { id: 6,  src: '/img/galeria/dev3.jpg',    thumb: '/img/galeria/dev3.jpg',    title: 'Código',category: 'Desarrollo' },
  { id: 7,  src: '/img/galeria/design3.jpg',     thumb: '/img/galeria/design3.jpg',     title: 'Maquetado Responsivo',      category: 'Diseño UX/UI' },
  { id: 8,  src: '/img/galeria/dev4.jpg',  thumb: '/img/galeria/dev4.jpg',  title: 'Inteligencia Artificial',   category: 'Desarrollo' },
  { id: 9,  src: '/img/galeria/project2.jpg',   thumb: '/img/galeria/project2.jpg',   title: 'Panel de Administración',       category: 'Proyectos' },
  { id: 10, src: '/img/galeria/dev5.jpg',   thumb: '/img/galeria/dev5.jpg',   title: 'Equipo de Trabajo', category: 'Desarrollo' },
  { id: 11, src: '/img/galeria/project3.jpg',thumb: '/img/galeria/project3.jpg',title: 'Agenda de Actividades',     category: 'Proyectos' },
  { id: 12, src: '/img/galeria/design4.jpg', thumb: '/img/galeria/design4.jpg', title: 'Diseño de Interfaces',         category: 'Diseño UX/UI' },
];

const CATEGORIES = ['Todas', 'Desarrollo', 'Diseño UX/UI', 'Proyectos'];

// ─────────────────────────────────────────────────────────
// Componente: Lightbox
// Recibe: la imagen activa, funciones para navegar y cerrar
// Se muestra encima de todo cuando hay una imagen seleccionada
// ─────────────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext, current, total }) {

  // useEffect para escuchar teclas del teclado
  // useCallback evita que la función se recree en cada render
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')    onClose();   // ESC → cerrar
    if (e.key === 'ArrowLeft') onPrev();    // ← → anterior
    if (e.key === 'ArrowRight') onNext();   // → → siguiente
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    // Registramos el listener cuando el Lightbox aparece
    document.addEventListener('keydown', handleKey);
    // Importante: lo removemos cuando el Lightbox desaparece
    // Esto se llama "cleanup" del useEffect
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    // El fondo oscuro (overlay): clic afuera cierra el lightbox
    <div className="lightbox-overlay" onClick={onClose}>

      {/* Contenedor de la imagen: stopPropagation evita que el clic
          en la imagen también cierre el lightbox */}
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>

        {/* Botón cerrar */}
        <button className="lightbox-close" onClick={onClose} title="Cerrar (ESC)">
          <i className="fas fa-times"></i>
        </button>

        {/* Botón anterior */}
        <button className="lightbox-nav prev" onClick={onPrev} title="Anterior (←)">
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Imagen principal */}
        <img src={image.src} alt={image.title} className="lightbox-image" />

        {/* Botón siguiente */}
        <button className="lightbox-nav next" onClick={onNext} title="Siguiente (→)">
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Pie: título y contador */}
        <div className="lightbox-footer">
          <h3>{image.title}</h3>
          <span className="lightbox-counter">{current} / {total}</span>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Componente Principal: Galeria
// ─────────────────────────────────────────────────────────
export default function Galeria() {
  // Índice de la imagen abierta en el lightbox (-1 = cerrado)
  const [activeIndex, setActiveIndex] = useState(-1);

  // Categoría seleccionada para filtrar
  const [activeCategory, setActiveCategory] = useState('Todas');

  // Imágenes filtradas según la categoría seleccionada
  const filteredImages = activeCategory === 'Todas'
    ? IMAGES
    : IMAGES.filter((img) => img.category === activeCategory);

  // Abre el lightbox en el índice indicado
  const openLightbox = (index) => setActiveIndex(index);

  // Cierra el lightbox
  const closeLightbox = () => setActiveIndex(-1);

  // Navega a la imagen anterior (con loop al final)
  const prevImage = useCallback(() => {
    setActiveIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  // Navega a la imagen siguiente (con loop al principio)
  const nextImage = useCallback(() => {
    setActiveIndex((i) => (i + 1) % filteredImages.length);
  }, [filteredImages.length]);

  return (
    <div className="galeria-page">

      {/* ── Encabezado ── */}
      <header className="api-hero">
        <div className="api-hero-content">
          <h1><i className="fas fa-images"></i> Galería Interactiva</h1>
          <p>Explorá nuestra colección de imágenes. Hacé clic para verlas en detalle.</p>
        </div>
      </header>

      {/* ── Filtros por categoría ── */}
      <div className="galeria-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat);
              setActiveIndex(-1); // Cerramos lightbox al cambiar categoría
            }}
          >
            {cat}
          </button>
        ))}
        <span className="filter-count">{filteredImages.length} imágenes</span>
      </div>

      {/* ── Grilla de imágenes ── */}
      <div className="galeria-grid">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="galeria-item"
            onClick={() => openLightbox(index)}
            title="Clic para ampliar"
          >
            <img src={image.thumb} alt={image.title} loading="lazy" />

            {/* Overlay con título que aparece al hacer hover */}
            <div className="galeria-item-overlay">
              <span className="galeria-item-title">{image.title}</span>
              <span className="galeria-item-category">{image.category}</span>
              <i className="fas fa-search-plus galeria-zoom-icon"></i>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox (solo se renderiza si hay una imagen activa) ── */}
      {activeIndex !== -1 && (
        <Lightbox
          image={filteredImages[activeIndex]}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          current={activeIndex + 1}
          total={filteredImages.length}
        />
      )}

    </div>
  );
}