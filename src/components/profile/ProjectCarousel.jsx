import React, { useState } from 'react';

export default function ProjectCarousel() {
  const projects = [
    { id: 1, title: "E-Commerce React", desc: "Plataforma de ventas con carrito y pasarela de pagos.", img: "🛒" },
    { id: 2, title: "API REST Node.js", desc: "Backend escalable para gestión de usuarios.", img: "⚙️" },
    { id: 3, title: "Dashboard AWS", desc: "Panel de control para monitorear métricas en la nube.", img: "☁️" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  return (
    <div className="carousel-container">
      <button className="carousel-btn" onClick={prevSlide}>◀</button>
      <div className="carousel-slide">
        <div className="carousel-icon">{projects[currentIndex].img}</div>
        <h3>{projects[currentIndex].title}</h3>
        <p>{projects[currentIndex].desc}</p>
      </div>
      <button className="carousel-btn" onClick={nextSlide}>▶</button>
    </div>
  );
}