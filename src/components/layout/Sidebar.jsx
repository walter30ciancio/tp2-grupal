import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside style={{ width: '250px', backgroundColor: '#1d273b', color: 'white', padding: '20px' }}>
      <h2 style={{ borderBottom: '1px solid #4d44df', paddingBottom: '10px' }}>Grupo 25</h2>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>🏠 Dashboard</Link>
        <Link to="/perfil-guille" style={{ color: '#fff', textDecoration: 'none' }}>👨‍💻 Perfil Guillermina</Link>
        <Link to="/perfil-walter" style={{ color: '#fff', textDecoration: 'none' }}>👨‍💻 Perfil Walter</Link>
        <Link to="/perfil-julio" style={{ color: '#fff', textDecoration: 'none' }}>👨‍💻 Perfil Julio</Link>
        <Link to="/bitacora" style={{ color: '#fff', textDecoration: 'none' }}>📝 Bitácora</Link>
      </nav>
    </aside>
  );
}