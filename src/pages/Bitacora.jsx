import React from 'react';

// Componente reutilizable que creamos en el mismo archivo (o en otro separado)
const TimelineItem = ({ title, description, animation, children }) => (
  <div className="timeline-item" data-aos={animation}>
    <div className="timeline-content">
      <h3>{title}</h3>
      <p>{description}</p>
      {/* children permite insertar párrafos adicionales si es necesario */}
      {children} 
    </div>
  </div>
);

export default function Bitacora() {
  return (
    <main className="bitacora-page">
      <header>
        <h1>Bitácora de Desarrollo</h1>
        <h2>Proceso y Evolución del Proyecto</h2>
      </header>

      <div className="timeline-container">
        <h2>Cronología de Trabajo</h2>
        <div className="timeline">
          
          <TimelineItem 
            title="1- Planificación y Estructura" 
            description="Diseñamos una arquitectura de carpetas modular para organizar el código..."
            animation="fade-right"
          />

          <TimelineItem 
            title="2- Identidad Visual y Estructura Flexbox" 
            description="Seleccionamos una estética limpia con la fuente Poppins..."
            animation="fade-left"
          >
            {/* Párrafos extra para el hito 2 */}
            <p>Maquetación con Flexbox: Implementamos el modelo de caja flexible...</p>
            <p>Priorizamos la navegación mediante un menú fijo...</p>
          </TimelineItem>

          {/* ... Aquí continuarían agregando los otros 4 hitos ... */}

        </div>
      </div>
    </main>
  );
}