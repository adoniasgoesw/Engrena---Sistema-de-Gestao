import React from 'react';
import { FaHome, FaUsers, FaCar, FaTools, FaBoxOpen, FaMoneyBillWave, FaCog, FaLifeRing, FaChartLine } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-[#093a69] text-white flex flex-col py-6 px-4 fixed">
      <h2 className="text-2xl font-extrabold mb-10 text-center">Engrena</h2>
      <nav className="space-y-4">
        <MenuItem icon={<FaHome />} label="Dashboard" />
        <MenuItem icon={<FaUsers />} label="Clientes" />
        <MenuItem icon={<FaCar />} label="Veículos" />
        <MenuItem icon={<FaTools />} label="Ordens de Serviço" />
        <MenuItem icon={<FaBoxOpen />} label="Categorias" />
        <MenuItem icon={<FaBoxOpen />} label="Serviços e Produtos" />
        <MenuItem icon={<FaMoneyBillWave />} label="Pagamentos" />
        <MenuItem icon={<FaChartLine />} label="Financeiro" />
        <MenuItem icon={<FaCog />} label="Configurações" />
        <MenuItem icon={<FaLifeRing />} label="Suporte" />
        <MenuItem icon={<FaBoxOpen />} label="Relatórios" />
      </nav>
    </aside>
  );
};

const MenuItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#0e4a7a] rounded-md cursor-pointer transition-all">
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </div>
);

export default Sidebar;
