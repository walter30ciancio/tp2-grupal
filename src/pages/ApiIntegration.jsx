import React, { useState, useEffect } from 'react';
import './ApiIntegration.css';

// ─────────────────────────────────────────────
// Componente: QuestionCard
// Muestra una pregunta de StackOverflow
// ─────────────────────────────────────────────
function QuestionCard({ question }) {
  // La API devuelve la fecha en formato Unix timestamp (segundos)
  // lo convertimos a fecha legible
  const fecha = new Date(question.creation_date * 1000).toLocaleDateString('es-AR', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <article className={`repo-card ${question.is_answered ? 'answered' : ''}`}>

      {/* Badge: respondida o sin respuesta */}
      <div className="question-badge">
        {question.is_answered
          ? <span className="badge-answered"><i className="fas fa-check"></i> Respondida</span>
          : <span className="badge-unanswered"><i className="fas fa-clock"></i> Sin respuesta</span>
        }
      </div>

      {/* Título de la pregunta */}
      <h3 className="question-title">
        {/* La API devuelve HTML entities, dangerouslySetInnerHTML las renderiza bien */}
        <span dangerouslySetInnerHTML={{ __html: question.title }} />
      </h3>

      {/* Tags */}
      <div className="question-tags">
        {question.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="question-tag">{tag}</span>
        ))}
      </div>

      {/* Estadísticas */}
      <div className="repo-stats">
        <span title="Votos">
          <i className="fas fa-arrow-up"></i> {question.score}
        </span>
        <span title="Respuestas">
          <i className="fas fa-comments"></i> {question.answer_count}
        </span>
        <span title="Vistas">
          <i className="fas fa-eye"></i> {question.view_count.toLocaleString()}
        </span>
      </div>

      {/* Footer: usuario y fecha */}
      <div className="question-footer">
        <div className="question-user">
          <img
            src={question.owner.profile_image}
            alt={question.owner.display_name}
            className="user-avatar"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span>{question.owner.display_name}</span>
        </div>
        <span className="question-date">{fecha}</span>
      </div>

      {/* Link */}
      <a
        href={question.link}
        target="_blank"
        rel="noopener noreferrer"
        className="repo-link"
      >
        Ver en StackOverflow <i className="fas fa-external-link-alt"></i>
      </a>

    </article>
  );
}

// ─────────────────────────────────────────────
// Componente Principal: ApiIntegration
// ─────────────────────────────────────────────
export default function ApiIntegration() {
  const [questions, setQuestions]   = useState([]);
  const [query, setQuery]           = useState('react');
  const [inputValue, setInputValue] = useState('react');
  const [page, setPage]             = useState(1);
  const [hasMore, setHasMore]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  const PER_PAGE = 9;

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        // La API de StackExchange permite buscar por tag o por texto libre
        // Usamos /search/advanced para buscar por título (q=) o tag (tagged=)
        const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&q=${encodeURIComponent(query)}&site=stackoverflow&pagesize=${PER_PAGE}&page=${page}&filter=!nNPvSNdWme`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        setQuestions(data.items || []);
        // La API devuelve has_more para saber si hay más páginas
        setHasMore(data.has_more);

      } catch (err) {
        setError(err.message);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [query, page]);

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    setPage(1);
    setQuery(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="api-page">

      {/* ── Hero ── */}
      <header className="api-hero">
        <div className="api-hero-content">
          <h1>
            <i className="fas fa-stack-overflow"></i> Explorador de StackOverflow
          </h1>
          <p>Buscá preguntas de programación en tiempo real usando la API de StackExchange</p>
        </div>
      </header>

      {/* ── Buscador ── */}
      <div className="search-bar">
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Buscar preguntas... (ej: react hooks, python list, css flexbox)"
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

      {/* ── Info ── */}
      {!loading && !error && questions.length > 0 && (
        <div className="results-info">
          <span>
            Mostrando resultados para <em>"{query}"</em> en StackOverflow
          </span>
          <span>Página <strong>{page}</strong></span>
        </div>
      )}

      {/* ── Cargando ── */}
      {loading && (
        <div className="api-status loading">
          <div className="spinner"></div>
          <p>Buscando preguntas...</p>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="api-status error">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Ocurrió un error: <strong>{error}</strong></p>
          <p className="error-hint">La API de StackExchange tiene un límite de solicitudes. Intentá de nuevo en unos minutos.</p>
        </div>
      )}

      {/* ── Sin resultados ── */}
      {!loading && !error && questions.length === 0 && (
        <div className="api-status loading">
          <i className="fas fa-search" style={{ fontSize: '2rem', color: '#9ca3af' }}></i>
          <p>No se encontraron preguntas para "<strong>{query}</strong>".</p>
        </div>
      )}

      {/* ── Grilla ── */}
      {!loading && !error && (
        <div className="repos-grid">
          {questions.map((q) => (
            <QuestionCard key={q.question_id} question={q} />
          ))}
        </div>
      )}

      {/* ── Paginación ── */}
      {!loading && !error && questions.length > 0 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            <i className="fas fa-chevron-left"></i> Anterior
          </button>

          <span className="page-indicator">Página {page}</span>

          <button
            className="page-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
          >
            Siguiente <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

    </div>
  );
}