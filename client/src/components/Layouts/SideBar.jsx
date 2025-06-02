import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome, FaUsers, FaCar, FaTools, FaBoxOpen,
  FaMoneyBillWave, FaCog, FaLifeRing, FaChartLine
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const handleNavClick = () => {
    if (window.innerWidth <= 480) toggleSidebar();
  };

  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaUsers />, label: 'Clientes', path: '/clientes' },
    { icon: <FaCar />, label: 'Veículos', path: '/veiculos' },
    { icon: <FaTools />, label: 'Ordens de Serviço', path: '/ordens-servico' },
    { icon: <FaBoxOpen />, label: 'Categorias', path: '/categorias' },
    { icon: <FaBoxOpen />, label: 'Serviços e Produtos', path: '/produtos-servicos' },
    { icon: <FaMoneyBillWave />, label: 'Pagamentos', path: '/pagamentos' },
    { icon: <FaChartLine />, label: 'Financeiro', path: '/financeiro' },
    { icon: <FaCog />, label: 'Configurações', path: '/configuracoes' },
    { icon: <FaLifeRing />, label: 'Suporte', path: '/suporte' },
    { icon: <FaBoxOpen />, label: 'Relatórios', path: '/relatorios' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          bg-gradient-to-b from-[#093a69] to-[#275b9d] text-white w-64
          fixed md:relative z-50 md:z-0 top-0 bottom-0 h-full
          px-4 pt-6 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        <h2 className="text-2xl font-extrabold mb-8 text-center text-white">
          Engrena
        </h2>

        <nav className="flex flex-col justify-between h-full">
          <div className="space-y-2">
            {menuItems.map(({ icon, label, path }) => (
              <MenuItem
                key={path}
                icon={icon}
                label={label}
                to={path}
                active={location.pathname === path}
                onClick={handleNavClick}
              />
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

const MenuItem = ({ icon, label, to, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`
      flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer
      ${active ? 'bg-[#1a99ba] text-white' : 'hover:bg-[#1a99ba] hover:text-white'}
    `}
  >
    <span className="text-base">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export default Sidebar;
