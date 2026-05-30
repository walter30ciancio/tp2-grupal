import React, { useState, useEffect } from 'react';
import './ApiIntegration.css';
 
// ─────────────────────────────────────────────

function RepoCard({ repo }) {
  return (
    <article className="repo-card">
      {/* Encabezado: avatar del dueño + nombre del repo */}
      <div className="repo-card-header">
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="repo-avatar"
        />
        <div>
          <p className="repo-owner">{repo.owner.login}</p>
          <h3 className="repo-name">{repo.name}</h3>
        </div>
      </div>
 
      {/* Descripción del repo (puede venir vacía de la API) */}
      <p className="repo-description">
        {repo.description || 'Sin descripción disponible.'}
      </p>
 
      {/* Estadísticas: estrellas, forks, lenguaje */}
      <div className="repo-stats">
        <span title="Estrellas">
          <i className="fas fa-star"></i> {repo.stargazers_count.toLocaleString()}
        </span>
        <span title="Forks">
          <i className="fas fa-code-branch"></i> {repo.forks_count.toLocaleString()}
        </span>
        {repo.language && (
          <span title="Lenguaje principal">
            <i className="fas fa-circle language-dot"></i> {repo.language}
          </span>
        )}
      </div>
 
      {/* Link al repositorio en GitHub */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="repo-link"
      >
        Ver en GitHub <i className="fas fa-external-link-alt"></i>
      </a>
    </article>
  );
}
 
// ─────────────────────────────────────────────
// Componente Principal: ApiIntegration

export default function ApiIntegration() {
  // ── Estados ──────────────────────────────────
  // repos: la lista de repositorios que devuelve la API
  const [repos, setRepos] = useState([]);
 
  // query: el texto que el usuario escribe para buscar
  const [query, setQuery] = useState('react');
 
  // inputValue: el valor del input (se separa de query para
  // que la búsqueda solo se lance al hacer clic en Buscar)
  const [inputValue, setInputValue] = useState('react');
 
  // page: la página actual de resultados (empieza en 1)
  const [page, setPage] = useState(1);
 
  // totalCount: cuántos resultados totales encontró la API
  const [totalCount, setTotalCount] = useState(0);
 
  // loading: true mientras esperamos la respuesta de la API
  const [loading, setLoading] = useState(false);
 
  // error: guarda el mensaje de error si algo falla
  const [error, setError] = useState(null);
 
  // Cuántos repos mostramos por página
  const PER_PAGE = 9;
 
  // ── Efecto: se ejecuta cada vez que cambian "query" o "page" ──
  // useEffect es como decirle a React: "cuando esto cambie, hacé esto"
  useEffect(() => {
    // Función async adentro del useEffect (no podés poner async directamente)
    const fetchRepos = async () => {
      setLoading(true);   // Activamos el estado de carga
      setError(null);     // Limpiamos errores anteriores
 
      try {
        // Construimos la URL con los parámetros de búsqueda y paginación
        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${PER_PAGE}&page=${page}`;
 
        const response = await fetch(url);
 
        // Si la respuesta no es exitosa (ej: rate limit), tiramos error
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
 
        const data = await response.json();
 
        setRepos(data.items);                    // Guardamos los repos
        setTotalCount(data.total_count);         // Guardamos el total
      } catch (err) {
        // Si algo falla, guardamos el mensaje de error
        setError(err.message);
        setRepos([]);
      } finally {
        // Se ejecuta siempre, haya error o no
        setLoading(false);
      }
    };
 
    fetchRepos();
  }, [query, page]); // ← El efecto se re-ejecuta cuando query o page cambian
 
  // ── Manejadores de eventos ────────────────────
  // Se ejecuta cuando el usuario hace clic en "Buscar"
  const handleSearch = () => {
    if (!inputValue.trim()) return; // Ignoramos búsquedas vacías
    setPage(1);          // Volvemos a la página 1
    setQuery(inputValue); // Actualizamos la query → dispara el useEffect
  };
 
  // También buscamos si el usuario presiona Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };
 
  // Calculamos cuántas páginas hay en total
  // (la API de GitHub limita a 1000 resultados máximo)
  const totalPages = Math.min(Math.ceil(totalCount / PER_PAGE), 111);
 
  // ── Render ────────────────────────────────────
  return (
    <div className="api-page">
 
      {/* ── Encabezado ── */}
      <header className="api-hero">
        <div className="api-hero-content">
          <h1>
            <i className="fab fa-github"></i> Explorador de GitHub
          </h1>
          <p>Buscá repositorios públicos en tiempo real usando la API de GitHub</p>
        </div>
      </header>
 
      {/* ── Buscador ── */}
      <div className="search-bar">
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Buscar repositorios... (ej: python, machine-learning)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
        </div>
        <button onClick={handleSearch} className="search-btn">
          Buscar
        </button>
      </div>
 
      {/* ── Resultados: info de cantidad y página ── */}
      {!loading && !error && totalCount > 0 && (
        <div className="results-info">
          <span>
            <strong>{totalCount.toLocaleString()}</strong> resultados para{' '}
            <em>"{query}"</em>
          </span>
          <span>
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
          </span>
        </div>
      )}
 
      {/* ── Estado: Cargando ── */}
      {loading && (
        <div className="api-status loading">
          <div className="spinner"></div>
          <p>Buscando repositorios...</p>
        </div>
      )}
 
      {/* ── Estado: Error ── */}
      {error && (
        <div className="api-status error">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Ocurrió un error: <strong>{error}</strong></p>
          <p className="error-hint">La API de GitHub tiene un límite de solicitudes. Intentá de nuevo en unos minutos.</p>
        </div>
      )}
 
      {/* ── Grilla de Repositorios ── */}
      {!loading && !error && (
        <div className="repos-grid">
          {repos.map((repo) => (
            // Le pasamos cada repo al componente RepoCard
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
 
      {/* ── Paginación ── */}
      {!loading && !error && totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            <i className="fas fa-chevron-left"></i> Anterior
          </button>
 
          <span className="page-indicator">
            {page} / {totalPages}
          </span>
 
          <button
            className="page-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Siguiente <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
 
    </div>
  );
}