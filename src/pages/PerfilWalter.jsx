import React, { useState } from 'react';
import ProgressBar from '../components/profile/ProgressBar';
import ProjectCarousel from '../components/profile/ProjectCarousel';
import '../assets/WalterProfile.css';

export default function PerfilWalter() {
  const [showSkills, setShowSkills] = useState(true);

  return (
    <div className="integrante-page">
      <header className="profile-header">
        <img src="/img/conocenos/walter.png" alt="Walter Ciancio" className="profile-avatar" />
        <h1>Walter David Ciancio</h1>
        <h2>Full-Stack Developer | Grupo N°25</h2>
      </header>

      <section className="profile-section">
        <h2>Presentación Personal</h2>
        <div className="info-text">
          <p><strong>🎂 Edad:</strong> 44</p>
          <p><strong>📍 Ubicación:</strong> Ciudad Autónoma de Buenos Aires</p>
          <p>👤 Me interesa especialmente el desarrollo de aplicaciones web escalables. Mi misión como desarrollador es escribir código limpio que resuelva problemas complejos y ofrezca la mejor experiencia de usuario posible.</p>
        </div>
      </section>

      <section className="profile-section tech-stack-section">
        <h2>Tech Stack</h2>
        <div className="tech-icons">
          <i className="fab fa-html5 tech-icon html" title="HTML5"></i>
          <i className="fab fa-css3-alt tech-icon css" title="CSS3"></i>
          <i className="fab fa-js tech-icon js" title="JavaScript"></i>
          <i className="fab fa-react tech-icon react" title="React"></i>
          <i className="fab fa-node-js tech-icon node" title="Node.js"></i>
          <i className="fab fa-aws tech-icon aws" title="AWS"></i>
        </div>
      </section>

      <section className="profile-section">
        <h2>Nivel de Habilidades</h2>
        <button className="toggle-btn" onClick={() => setShowSkills(!showSkills)}>
          {showSkills ? 'Ocultar Habilidades' : 'Mostrar Habilidades'}
        </button>
        
        {showSkills && (
          <div className="skills-list">
            <ProgressBar skill="React & Frontend" percentage="85%" />
            <ProgressBar skill="Node.js & Backend" percentage="70%" />
            <ProgressBar skill="Bases de Datos (SQL)" percentage="80%" />
            <ProgressBar skill="Infraestructura (Docker/AWS)" percentage="60%" />
          </div>
        )}
      </section>

      <section className="profile-section">
        <h2>Proyectos Destacados</h2>
        <ProjectCarousel />
      </section>

      <section className="profile-section social-media-section">
        <h2>Conectemos</h2>
        <div className="social-buttons">
          <a href="https://github.com/walter30ciancio" target="_blank" rel="noopener noreferrer" className="social-btn github">
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