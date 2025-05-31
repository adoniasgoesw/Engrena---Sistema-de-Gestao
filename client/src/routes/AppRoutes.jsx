import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import Clientes from '../pages/Clientes';
import Veiculos from '../pages/Veiculos';
import OrdensServico from '../pages/OrdensServico';
import Categorias from '../pages/Categorias';
import ProdutosServicos from '../pages/ProdutosServicos';
import Colaboradores from '../pages/Colaboradores.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/veiculos" element={<Veiculos />} />
      <Route path="/ordens-servico" element={<OrdensServico />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/produtos-servicos" element={<ProdutosServicos />} />
      <Route path="/colaboradores" element={<Colaboradores />} />
    </Routes>
  );
};

export default AppRoutes;
