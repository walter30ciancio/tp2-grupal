import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import DashboardHome from './pages/DashboardHome';
import PerfilWalter from './pages/PerfilWalter';
import PerfilJulio from './pages/PerfilJulio';
import DataExplorer from './pages/DataExplorer';
import ApiIntegration from './pages/ApiIntegration';
import Bitacora from './pages/Bitacora';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          
          <Route path="perfil-walter" element={<PerfilWalter />} />
          <Route path="perfil-julio" element={<PerfilJulio />} />
          
          <Route path="explorador-datos" element={<DataExplorer />} />
          <Route path="api-externa" element={<ApiIntegration />} />
          <Route path="bitacora" element={<Bitacora />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;