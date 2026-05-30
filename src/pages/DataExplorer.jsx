import React, { useState } from 'react';
import datosLocales from '../data/localData.json';
import './DataExplorer.css'; // <--- ¡Importamos tus nuevos estilos!

export default function DataExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // Lógica de filtrado
  const elementosFiltrados = datosLocales.filter((elemento) => {
    const coincideTexto = elemento.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideCategoria = selectedCategory === "Todas" || elemento.categoria === selectedCategory;
    return coincideTexto && coincideCategoria;
  });

  return (
    <div className="explorer-container">
      <h2>Explorador de Datos Locales</h2>
      <p className="explorer-subtitle">Gestión de inventario tecnológico en tiempo real.</p>

      {/* --- PANEL DE BUSQUEDA --- */}
      <div className="search-controls">
        <input 
          type="text" 
          placeholder="Buscar tecnología (ej: React)..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select 
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Bases de Datos">Bases de Datos</option>
          <option value="Herramientas Dev & Cloud">Herramientas Dev & Cloud</option>
        </select>
      </div>

      {/* --- GRILLA DE RESULTADOS --- */}
      <div className="results-grid">
        {elementosFiltrados.length > 0 ? (
          elementosFiltrados.map((item) => (
            <div key={item.id} className="tech-card">
              <div className="card-image-container">
                <img src={item.imagen} alt={item.nombre} className="card-img" />
              </div>
              <div className="card-content">
                <span className="category-tag">{item.categoria}</span>
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron resultados para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}