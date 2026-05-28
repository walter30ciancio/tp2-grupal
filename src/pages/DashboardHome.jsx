import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardHome.css'; // ¡Importante para que tome los nuevos estilos!

export default function DashboardHome() {
  const teamMembers = [
    { id: 'julio', name: 'Mario Julio Alegre', role: 'Desarrollador Frontend', img: '/img/conocenos/julio.png' },
    { id: 'walter', name: 'Walter David Ciancio', role: 'Desarrollador Full-Stack', img: '/img/conocenos/walter.png' },
    { id: 'guillermina', name: 'Guillermina Zen Cáffaro', role: 'Desarrolladora Frontend', img: '/img/conocenos/guillermina.png' }
  ];

  return (
    <div className="dashboard-home">
      {/* Banner Superior (Hero) */}
      <header className="hero-banner">
        <div className="hero-content">
          <h1>Bienvenido al Workspace</h1>
          <p>Grupo N° 25 | Desarrollo de Sistemas Web Front End</p>
        </div>
        <div className="hero-icon">
          <i className="fas fa-rocket"></i>
        </div>
      </header>

      {/* Grilla de Contenido Principal */}
      <div className="dashboard-grid">
        
        {/* Tarjeta de Enfoque del Proyecto */}
        <section className="dashboard-card info-panel">
          <div className="card-header">
            <i className="fas fa-bullseye"></i>
            <h2>Enfoque del Proyecto</h2>
          </div>
          <div className="card-body">
            <p>
              Somos un equipo de estudiantes de la <strong>Tecnicatura en Desarrollo de Software</strong> trabajando de forma colaborativa. 
              El propósito de este sitio es integrar los conocimientos adquiridos sobre estructura web modular, estado y enrutamiento en una Single Page Application (SPA).
            </p>
            <p>
              Nuestro objetivo es construir interfaces funcionales que ofrezcan una excelente experiencia de usuario (UX), asegurando la escalabilidad del código.
            </p>
            <Link to="/bitacora" className="action-link">
              Leer la Bitácora de Desarrollo <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </section>

        {/* Tarjeta del Equipo de Trabajo */}
        <section className="dashboard-card team-panel">
          <div className="card-header">
            <i className="fas fa-users"></i>
            <h2>Equipo de Trabajo</h2>
          </div>
          
          <div className="team-cards-container">
            {teamMembers.map((member) => (
              <div className="team-profile-card" key={member.id}>
                <div className="avatar-wrapper">
                  {/* Se asume que las imágenes están en la carpeta public/img/conocenos/ */}
                  <img src={member.img} alt={member.name} className="avatar-img" />
                </div>
                <h3>{member.name}</h3>
                <span className="role-badge">{member.role}</span>
                <Link to={`/perfil-${member.id}`} className="profile-btn">
                  Ver Perfil <i className="fas fa-user-circle"></i>
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}