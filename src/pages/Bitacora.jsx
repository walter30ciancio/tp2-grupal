import React, { useState } from 'react';
import './Bitacora.css';

// ─────────────────────────────────────────────
// Componente: TimelineItem
// Reutilizable para cada hito de la cronología
// ─────────────────────────────────────────────
const TimelineItem = ({ numero, title, date, icon, children }) => (
  <div className="timeline-item">
    <div className="timeline-marker">
      <span className="timeline-icon">{icon}</span>
    </div>
    <div className="timeline-content">
      <div className="timeline-header">
        <h3>{numero}. {title}</h3>
        <span className="timeline-date">{date}</span>
      </div>
      <div className="timeline-body">{children}</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Componente: RolCard
// Muestra el rol y tareas de cada integrante
// ─────────────────────────────────────────────
const RolCard = ({ nombre, rol, rama, tareas, color }) => (
  <div className="rol-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="rol-header">
      <span className="rol-avatar" style={{ background: color }}>
        {nombre.charAt(0)}
      </span>
      <div>
        <h3>{nombre}</h3>
        <p className="rol-titulo">{rol}</p>
      </div>
    </div>
    <div className="rol-rama">
      <i className="fas fa-code-branch"></i>
      <code>{rama}</code>
    </div>
    <ul className="rol-tareas">
      {tareas.map((t, i) => (
        <li key={i}><i className="fas fa-check"></i> {t}</li>
      ))}
    </ul>
  </div>
);

// ─────────────────────────────────────────────
// Componente Principal: Bitacora
// ─────────────────────────────────────────────
export default function Bitacora() {
  const [seccionActiva, setSeccionActiva] = useState('cronologia');

  const secciones = [
    { id: 'cronologia', label: 'Cronología', icon: '📅' },
    { id: 'migracion',  label: 'Migración a React', icon: '⚛️' },
    { id: 'roles',      label: 'Roles del Equipo', icon: '👥' },
    { id: 'arbol',      label: 'Árbol de Renderizado', icon: '🌳' },
  ];

  return (
    <div className="bitacora-page">

      {/* ── Encabezado ── */}
      <header className="bitacora-hero">
        <h1><i className="fas fa-book-open"></i> Bitácora de Proyecto</h1>
        <p>Documentación técnica del proceso de desarrollo — Grupo N°25 · IFTS N°29</p>
      </header>

      {/* ── Tabs de navegación interna ── */}
      <div className="bitacora-tabs">
        {secciones.map((s) => (
          <button
            key={s.id}
            className={`tab-btn ${seccionActiva === s.id ? 'active' : ''}`}
            onClick={() => setSeccionActiva(s.id)}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════
          SECCIÓN 1: CRONOLOGÍA
      ══════════════════════════════════ */}
      {seccionActiva === 'cronologia' && (
        <div className="bitacora-section">
          <h2>Cronología de Trabajo</h2>
          <div className="timeline">

            <TimelineItem numero="1" title="Análisis del TP1 y Planificación" date="Semana 3 — Mayo 2026" icon="🎯">
              <p>El equipo analizó el Trabajo Práctico 1 (desarrollado en HTML, CSS y JavaScript puro) para identificar qué partes migrar y cómo dividir las responsabilidades.</p>
              <p>Se realizó una reunión grupal por mensaje donde se acordó la división de tareas, los nombres de las ramas de Git y los lineamientos visuales generales del proyecto.</p>
            </TimelineItem>

            <TimelineItem numero="2" title="Configuración del Repositorio" date="Semana 3 — Mayo 2026" icon="🗂️">
              <p>Walter creó el repositorio en GitHub y configuró el proyecto base con Vite + React. Se estableció la estructura de carpetas y se instalaron las dependencias principales (React Router, Font Awesome).</p>
              <p>Cada integrante fue invitado al repositorio y creó su rama de trabajo siguiendo la convención <code>feature/nombre-tarea</code>.</p>
            </TimelineItem>

            <TimelineItem numero="3" title="Desarrollo del Layout y Sidebar" date="Semana 3 — Mayo 2026" icon="🧱">
              <p>Walter desarrolló el componente <code>Layout.jsx</code> y la <code>Sidebar</code> fija con estética de dashboard, que sirve como eje de navegación de toda la aplicación. También configuró React Router con las rutas principales.</p>
              <p>Se definió la paleta de colores (<strong>#4d44df</strong> como color principal) y la tipografía Poppins como estándar visual del grupo.</p>
            </TimelineItem>

            <TimelineItem numero="4" title="Desarrollo en paralelo — Ramas individuales" date="Semana 4 — Mayo 2026" icon="⚙️">
              <p>Los tres integrantes comenzaron el desarrollo en paralelo sobre sus ramas:</p>
              <ul>
                <li><strong>Walter:</strong> Dashboard Home, componentes reutilizables (<code>ProgressBar</code>, <code>ProjectCarousel</code>) y su perfil individual.</li>
                <li><strong>Julio:</strong> Explorador de datos JSON con búsqueda en tiempo real y su perfil individual.</li>
                <li><strong>Guillermina:</strong> Integración de API de GitHub con paginación, Galería Interactiva con Lightbox y su perfil individual.</li>
              </ul>
            </TimelineItem>

            <TimelineItem numero="5" title="Integración y revisión final" date="Semana 4 — Mayo 2026" icon="🔗">
              <p>Una vez completadas las ramas individuales, se realizarán Pull Requests hacia la rama <code>dev</code> para integrar todos los módulos. Se verificará que las rutas, estilos y componentes compartidos funcionen correctamente en conjunto.</p>
              <p>Finalmente se hará el merge a <code>main</code> y el deploy en Vercel para la entrega del 01/06/2026.</p>
            </TimelineItem>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          SECCIÓN 2: MIGRACIÓN A REACT
      ══════════════════════════════════ */}
      {seccionActiva === 'migracion' && (
        <div className="bitacora-section">
          <h2>Justificación de Migración a React</h2>

          <div className="migracion-intro">
            <p>El Trabajo Práctico 1 fue desarrollado íntegramente con <strong>HTML, CSS y JavaScript vanilla</strong>. Si bien cumplió su propósito, presentó limitaciones claras al escalar el proyecto. La migración a React no fue arbitraria: responde a necesidades concretas que surgieron durante el desarrollo.</p>
          </div>

          <div className="comparativa-grid">
            <div className="comparativa-card problema">
              <h3><i className="fas fa-times-circle"></i> Problemas con HTML/CSS/JS</h3>
              <ul>
                <li>Código duplicado: el menú de navegación se repetía en cada archivo HTML</li>
                <li>Sin reutilización: cada sección era independiente y no compartía componentes</li>
                <li>Manejo de estado complejo con variables globales y manipulación directa del DOM</li>
                <li>Difícil de mantener en equipo: los cambios en un archivo afectaban a otros sin control</li>
                <li>Sin sistema de rutas: la navegación requería recargar la página completa</li>
              </ul>
            </div>

            <div className="comparativa-card solucion">
              <h3><i className="fas fa-check-circle"></i> Soluciones con React</h3>
              <ul>
                <li>Componentes reutilizables: <code>Sidebar</code>, <code>ProgressBar</code>, <code>Card</code> escritos una sola vez</li>
                <li>React Router: navegación entre páginas sin recarga (SPA)</li>
                <li>useState y useEffect: manejo de estado declarativo y predecible</li>
                <li>Trabajo en equipo ordenado: cada integrante trabaja en su rama sin conflictos</li>
                <li>Arquitectura escalable: fácil de agregar nuevas secciones o módulos</li>
              </ul>
            </div>
          </div>

          <div className="migracion-conclusion">
            <h3>📌 Conclusión</h3>
            <p>La migración a React permitió transformar un sitio estático de múltiples páginas en una <strong>Single Page Application (SPA)</strong> modular, mantenible y escalable. La curva de aprendizaje fue real, pero los beneficios en organización del código y experiencia de usuario justifican ampliamente la decisión.</p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          SECCIÓN 3: ROLES
      ══════════════════════════════════ */}
      {seccionActiva === 'roles' && (
        <div className="bitacora-section">
          <h2>Roles del Equipo — GitFlow</h2>
          <p className="roles-intro">El equipo aplicó una metodología basada en GitFlow: cada integrante trabajó en una rama propia (<code>feature/</code>) y al finalizar realizó un Pull Request hacia <code>dev</code> para revisión conjunta antes del merge a <code>main</code>.</p>

          <div className="roles-grid">
            <RolCard
              nombre="Walter"
              rol="Arquitectura Base & Perfil 1"
              rama="feature/sidebar-perfil-walter"
              color="#4d44df"
              tareas={[
                'Configuración del proyecto con Vite + React',
                'Creación del repositorio en GitHub',
                'Layout principal y Sidebar fija',
                'Configuración de React Router',
                'Dashboard Home con grilla de tarjetas',
                'Componentes reutilizables: ProgressBar, ProjectCarousel',
                'Perfil individual Walter',
                'Deploy en Vercel',
              ]}
            />
            <RolCard
              nombre="Julio"
              rol="Datos Locales & Perfil 2"
              rama="feature/datos-perfil-julio"
              color="#10b981"
              tareas={[
                'Explorador de datos con archivo JSON (20+ objetos)',
                'Búsqueda y filtrado en tiempo real',
                'Componente dinámico Card con animaciones',
                'Carrusel de proyectos interactivo',
                'Perfil individual Julio',
              ]}
            />
            <RolCard
              nombre="Guillermina"
              rol="API Externa & Perfil 3"
              rama="feature/api-y-galeria"
              color="#f59e0b"
              tareas={[
                'Integración con API pública de GitHub',
                'Estados de carga y error',
                'Sistema de paginación (Anterior/Siguiente)',
                'Galería interactiva con Lightbox y tecla ESC',
                'Filtros por categoría en la galería',
                'Perfil individual Guillermina',
                'Bitácora y Árbol de Renderizado',
              ]}
            />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          SECCIÓN 4: ÁRBOL DE RENDERIZADO
      ══════════════════════════════════ */}
      {seccionActiva === 'arbol' && (
        <div className="bitacora-section">
          <h2>Árbol de Renderizado — Arquitectura de Componentes</h2>
          <p className="arbol-intro">El siguiente diagrama muestra la jerarquía de componentes de la aplicación, desde el componente raíz <code>App</code> hasta los componentes hoja.</p>

          <div className="arbol-container">

            {/* Nivel 0: App */}
            <div className="arbol-nivel">
              <div className="arbol-nodo raiz">
                <i className="fab fa-react"></i> App.jsx
                <span className="nodo-badge">Raíz</span>
              </div>
            </div>

            <div className="arbol-linea-v"></div>

            {/* Nivel 1: BrowserRouter → Layout */}
            <div className="arbol-nivel">
              <div className="arbol-nodo router">
                <i className="fas fa-route"></i> BrowserRouter
              </div>
            </div>

            <div className="arbol-linea-v"></div>

            {/* Nivel 2: Layout */}
            <div className="arbol-nivel">
              <div className="arbol-nodo layout">
                <i className="fas fa-th-large"></i> Layout.jsx
                <span className="nodo-badge">Layout</span>
              </div>
            </div>

            <div className="arbol-linea-v"></div>

            {/* Nivel 3: Sidebar + Pages */}
            <div className="arbol-nivel arbol-fila">
              <div className="arbol-nodo sidebar">
                <i className="fas fa-bars"></i> Sidebar.jsx
              </div>
              <div className="arbol-nodo pages">
                <i className="fas fa-file-code"></i> {'<Outlet />'} (Páginas)
              </div>
            </div>

            <div className="arbol-linea-v"></div>

            {/* Nivel 4: Páginas */}
            <div className="arbol-nivel arbol-fila flex-wrap">
              {[
                { icon: 'fa-home', label: 'DashboardHome' },
                { icon: 'fa-user', label: 'PerfilWalter' },
                { icon: 'fa-user', label: 'PerfilJulio' },
                { icon: 'fa-user', label: 'PerfilGuille' },
                { icon: 'fa-database', label: 'DataExplorer' },
                { icon: 'fa-cloud', label: 'ApiIntegration' },
                { icon: 'fa-images', label: 'Galeria' },
                { icon: 'fa-book', label: 'Bitacora' },
              ].map((p) => (
                <div key={p.label} className="arbol-nodo pagina">
                  <i className={`fas ${p.icon}`}></i> {p.label}
                </div>
              ))}
            </div>

            <div className="arbol-linea-v"></div>

            {/* Nivel 5: Componentes hijos */}
            <div className="arbol-nivel arbol-fila flex-wrap">
              {[
                { icon: 'fa-id-card', label: 'Card', desc: 'Dashboard' },
                { icon: 'fa-chart-bar', label: 'ProgressBar', desc: 'Perfiles' },
                { icon: 'fa-film', label: 'ProjectCarousel', desc: 'Perfiles' },
                { icon: 'fa-share-alt', label: 'SocialButton', desc: 'Perfiles' },
                { icon: 'fa-search', label: 'SearchBar', desc: 'DataExplorer' },
                { icon: 'fa-expand', label: 'Lightbox', desc: 'Galería' },
                { icon: 'fa-chevron-right', label: 'Pagination', desc: 'API' },
                { icon: 'fa-code', label: 'RepoCard', desc: 'API' },
              ].map((c) => (
                <div key={c.label} className="arbol-nodo componente">
                  <i className={`fas ${c.icon}`}></i> {c.label}
                  <span className="nodo-desc">{c.desc}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Leyenda */}
          <div className="arbol-leyenda">
            <h3>Referencias del diagrama</h3>
            <div className="leyenda-items">
              <span className="leyenda-item raiz">Raíz</span>
              <span className="leyenda-item router">Router</span>
              <span className="leyenda-item layout">Layout</span>
              <span className="leyenda-item sidebar">Sidebar</span>
              <span className="leyenda-item pagina">Página</span>
              <span className="leyenda-item componente">Componente hijo</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}