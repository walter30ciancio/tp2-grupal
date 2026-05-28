import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  // En lugar de repetir HTML, creamos los datos de Julio, Walter y Guillermina
  const teamMembers = [
    { id: 'julio', name: 'Mario Julio Alegre', img: '/img/conocenos/julio.png' },
    { id: 'walter', name: 'Walter David Ciancio', img: '/img/conocenos/walter.png' },
    { id: 'guillermina', name: 'Guillermina Zen Cáffaro', img: '/img/conocenos/guillermina.png' }
  ];

  return (
    <div className="dashboard-home">
      {/* Sección Cabecera */}
      <header className="home-header">
        <h1>Proyecto Web</h1>
        <h2>Grupo N° 25 - Segundo Trabajo Práctico Grupal</h2>
      </header>

      {/* Sección Proyecto */}
      <section className="contenido-proyecto">
        <div className="textos-proyecto">
          <h2>Enfoque del proyecto</h2>
          <p>Somos un equipo de estudiantes trabajando de forma colaborativa...</p>
        </div>
      </section>

      {/* Sección Equipo (Mapeo dinámico) */}
      <section className="conocenos">
        <h2 className="titulo">Equipo de Trabajo</h2>
        <div className="contenedor-integrante">
          {teamMembers.map((member) => (
            <div className="integrante" key={member.id} data-aos="zoom-in-right">
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              {/* Usamos Link de React Router en lugar de etiquetas <a> */}
              <Link to={`/perfil-${member.id}`}>Perfil</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}