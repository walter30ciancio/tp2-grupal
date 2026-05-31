import React, { useState } from 'react';
import ProgressBar from '../components/profile/ProgressBar';
import ProjectCarousel from '../components/profile/ProjectCarousel';
import '../assets/JulioProfile.css';

export default function PerfilJulio() {
  const [showSkills, setShowSkills] = useState(true);

  const misPeliculas = [
    { titulo: "300", img: "/img/integrantes/julio/peliculas/300.png" },
    { titulo: "Vampiros", img: "/img/integrantes/julio/peliculas/vampiros.png" },
    { titulo: "El Señor de los Anillos", img: "/img/integrantes/julio/peliculas/el_señor_de_los_anillos.png" }
  ];

  const misAlbumes = [
    { titulo: "Iron Maiden", img: "/img/integrantes/julio/canciones/Powerslave.png", url: "https://www.youtube.com/watch?v=Mw-o_cSdqmI" },
    { titulo: "Nightwish", img: "/img/integrantes/julio/canciones/Nightwish.png", url: "https://www.youtube.com/watch?v=n1G5WiMoRjw" },
    { titulo: "Deep Purple", img: "/img/integrantes/julio/canciones/Deep Purple.png", url: "https://www.youtube.com/watch?v=G7GERh0sQzY" }
  ];

const techStack = [
    { nombre: "HTML5/CSS3", icono: "fab fa-html5", color: "#e34f26" },
    { nombre: "JavaScript", icono: "fab fa-js", color: "#f7df1e" },
    { nombre: "React", icono: "fab fa-react", color: "#61dafb" },
    { nombre: "Node.js", icono: "fab fa-node-js", color: "#339933" },
    { nombre: "AWS Academy", icono: "fab fa-aws", color: "#ff9900" },
    { nombre: "Excel/VBA", icono: "fas fa-file-excel", color: "#1d6f42" }
  ];

  const misProyectos = [
    { 
      id: 1, 
      title: "Portfolio Profesional", 
      desc: "Sitio web responsive desarrollado en React y desplegado en Vercel con integración de Git.", 
      img: "🚀" 
    },
    { 
      id: 2, 
      title: "Automatización con VBA", 
      desc: "Desarrollo de macros en Excel para optimización de procesos y análisis de grandes volúmenes de datos.", 
      img: "📊" 
    },
    { 
      id: 3, 
      title: "Arquitectura Cloud", 
      desc: "Análisis de costos y diseño de infraestructura escalable siguiendo las mejores prácticas de AWS.", 
      img: "☁️" 
    }
  ];

  return (
    <div className="integrante-page">
      <header className="profile-header">
        <img src="/img/conocenos/julio.png" alt="Julio Alegre" className="profile-avatar" />
        <h1>Julio Alegre</h1>
        <h2>Estudiante de Desarrollo de Software | Grupo N°25</h2>
      </header>

      <section className="profile-section">
        <h2>Presentación Personal</h2>
        <div className="info-text">
          <p><strong>🎂 Edad:</strong> 56</p>
          <p><strong>📍 Ubicación:</strong> CABA</p>
          <p>👤 Actualmente cursando la Tecnicatura Superior en Desarrollo de Software en el IFTS N.°29. Enfoque en lógica y backend.</p>
        </div>
      </section>

      <section className="profile-section">
        <h2>Nivel de Habilidades</h2>
        <button className="toggle-btn" onClick={() => setShowSkills(!showSkills)}>
          {showSkills ? 'Ocultar Habilidades' : 'Mostrar Habilidades'}
        </button>
        
        {showSkills && (
          <div className="skills-list">
            <ProgressBar skill="HTML5 & CSS3" percentage="90%" />
            <ProgressBar skill="Excel & Macros (VBA)" percentage="85%" />
            <ProgressBar skill="Cloud Economics (AWS)" percentage="80%" />
            <ProgressBar skill="Análisis de Sistemas" percentage="95%" />
          </div>
        )}
      </section>

      <section className="profile-section tech-stack-section">
        <h2>Tech Stack</h2>
        <div className="tech-icons">
          {techStack.map((tech, index) => (
            <i
              key={index}
              className={`${tech.icono} tech-icon-julio`}
              title={tech.nombre}
              style={{ '--hover-color': tech.color }}
            ></i>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <h2>Proyectos Destacados</h2>
        <ProjectCarousel projects={misProyectos} />
      </section>

      <section className="profile-section">
        <h2>Intereses Personales</h2>
        <div className="intereses-grid" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <h3>Películas</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {misPeliculas.map((peli, index) => (
                <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={peli.img} alt={peli.titulo} style={{ width: '40px', height: '40px', borderRadius: '5px' }} />
                  <span>{peli.titulo}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Álbumes</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {misAlbumes.map((album, index) => (
                <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={album.img} alt={album.titulo} style={{ width: '40px', height: '40px', borderRadius: '5px' }} />
                  <span>{album.titulo}</span>
                  <a href={album.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#4d44df' }}>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

<section className="profile-section social-media-section">
  <h2>Conectemos</h2>
  <div className="social-buttons" style={{ display: 'flex', gap: '15px' }}>
    {/* Botón de GitHub (que ya funciona perfecto) */}
    <a 
      href="https://github.com/JulioAlegre-dev" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="social-btn github"
    >
      <i className="fab fa-github"></i> GitHub
    </a>

    <a 
      href="mailto:mario.julio.alegre.mja@gmail.com"
      className="social-btn email"
    >
      <i className="fas fa-envelope"></i> Contacto
    </a>
  </div>
</section>
    </div>
  );
}

