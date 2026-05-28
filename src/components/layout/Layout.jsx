import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Importamos tu menú lateral

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* 1. Acá va la barra lateral fija */}
      <Sidebar />

      {/* 2. Acá va el panel central dinámico */}
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f9' }}>
        {/* MAGIA: Acá es donde React va a escupir DashboardHome, PerfilWalter, etc. */}
        <Outlet /> 
      </main>
    </div>
  );
}