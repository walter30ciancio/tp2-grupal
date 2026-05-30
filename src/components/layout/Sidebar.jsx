import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  // Aquí declaramos el estado que controla si la barra está abierta o cerrada
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      
      {/* Cabecera con Logo y Botón de Colapsar */}
      <div className="sidebar-header">
        <div className="header-brand">
          <i className="fas fa-laptop-code brand-icon"></i>
          {!isCollapsed && (
            <div className="brand-text">
              <h2>Grupo 25</h2>
              <span className="subtitle">IFTS N.°29</span>
            </div>
          )}
        </div>
        
        {/* Botón que invierte el valor de isCollapsed */}
        <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      {/* Navegación */}
      <nav className="sidebar-nav">
        
        {!isCollapsed && <p className="nav-label">Principal</p>}
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
          <i className="fas fa-home"></i>
          {!isCollapsed && <span>Dashboard Home</span>}
        </NavLink>

        {!isCollapsed && <p className="nav-label">Equipo</p>}
        <NavLink to="/perfil-walter" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="fas fa-user-astronaut"></i>
          {!isCollapsed && <span>Perfil Walter</span>}
        </NavLink>
        
<NavLink 
          to="/perfil-julio" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <i className="fas fa-user"></i>
          {!isCollapsed && <span>Perfil Julio</span>}
        </NavLink>

        <NavLink 
          to="/perfil-guillermina" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <i className="fas fa-user-astronaut"></i>
          {!isCollapsed && <span>Perfil Guillermina</span>}
        </NavLink>

        {!isCollapsed && <p className="nav-label">Módulos TP2</p>}
        <NavLink to="/explorador-datos" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="fas fa-database"></i>
          {!isCollapsed && <span>Datos Locales (JSON)</span>}
        </NavLink>
        <NavLink to="/api-externa" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="fas fa-cloud-download-alt"></i>
          {!isCollapsed && <span>API Externa</span>}
        </NavLink>
        <NavLink to="/galeria" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="fas fa-images"></i>
          {!isCollapsed && <span>Galería</span>}
        </NavLink>

        {!isCollapsed && <p className="nav-label">Documentación</p>}
        <NavLink to="/bitacora" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="fas fa-book"></i>
          {!isCollapsed && <span>Bitácora</span>}
        </NavLink>

      </nav>
    </aside>
  );
}