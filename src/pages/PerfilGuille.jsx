import React, { useState } from 'react';
import ProgressBar from '../components/profile/ProgressBar';
import ProjectCarousel from '../components/profile/ProjectCarousel';
import '../assets/GuilleProfile.css';

export default function PerfilGuille() {
  const [showSkills, setShowSkills] = useState(true);

  const proyectosGuille = [
    {
      id: 1,
      title: 'Página Web con HTML y JavaScript',
      desc: 'Sitio web estático con maquetado semántico en HTML5, estilos en CSS3 e interactividad con JavaScript vanilla.',
      img: '🌐',
    },
    {
      id: 2,
      title: 'Sistema para Clínica',
      desc: 'Aplicación de gestión de pacientes y médicos con base de datos relacional. Permite registrar turnos e historial clínico.',
      img: '🏥',
    },
    {
      id: 3,
      title: 'App Móvil para Club Deportivo',
      desc: 'Aplicación móvil para la gestión de socios, eventos y actividades de un club deportivo.',
      img: '⚽',
    },
  ];

  return (
    <div className="integrante-page">
      <header className="profile-header">
        <img src="public/img/conocenos/guillermina.png" alt="Guillermina Zen Cáffaro" className="profile-avatar" />
        <h1>Guillermina Zen Cáffaro</h1>
        <h2>Estudiante | Grupo N°25</h2>
      </header>

      <section className="profile-section">
        <h2>Presentación Personal</h2>
        <div className="info-text">
          <p><strong>🎂 Edad:</strong> 27 años</p>
          <p><strong>📍 Ubicación:</strong> Salta</p>
          <p>Soy estudiante de la Tecnicatura en Desarrollo de Software, con especial interés en el desarrollo web y la ciberseguridad. Busco seguir formándome y adquiriendo experiencia para desarrollar soluciones que aporten valor, mientras continúo creciendo tanto profesional como personalmente.</p>
        </div>
      </section>

      <section className="profile-section tech-stack-section">
        <h2>Tech Stack</h2>
        <div className="tech-icons">
          <i className="fab fa-html5 tech-icon html" title="HTML5"></i>
          <i className="fab fa-css3-alt tech-icon css" title="CSS3"></i>
          <i className="fab fa-js tech-icon js" title="JavaScript"></i>
          <i className="fas fa-database tech-icon db" title="Bases de Datos / SQL"></i>
          <i className="fab fa-react tech-icon react" title="React"></i>
          <i className="fas fa-shield-alt tech-icon security" title="Ciberseguridad"></i>
        </div>
      </section>

      <section className="profile-section">
        <h2>Nivel de Habilidades</h2>
        <button className="toggle-btn" onClick={() => setShowSkills(!showSkills)}>
          {showSkills ? 'Ocultar Habilidades' : 'Mostrar Habilidades'}
        </button>

        {showSkills && (
          <div className="skills-list">
            <ProgressBar skill="HTML" percentage="80%" />
            <ProgressBar skill="Bases de Datos / SQL" percentage="70%" />
            <ProgressBar skill="JavaScript" percentage="60%" />
            <ProgressBar skill="MongoDB" percentage="60%" />
          </div>
        )}
      </section>

      <section className="profile-section">
        <h2>Proyectos Destacados</h2>
        <ProjectCarousel projects={proyectosGuille} />
      </section>

      <section className="profile-section social-media-section">
        <h2>Conectemos</h2>
        <div className="social-buttons">
          <a href="https://github.com/guillecaffaro" target="_blank" rel="noopener noreferrer" className="social-btn github">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href="#" className="social-btn linkedin">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}