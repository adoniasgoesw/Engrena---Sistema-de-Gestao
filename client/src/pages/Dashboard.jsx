import React, { useState } from 'react';
import Sidebar from '../components/Layouts/SideBar';
import CardsDashboard from '../components/Cards/CardsDashboard';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-[#d6dfeb] overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 w-full overflow-auto p-4 sm:p-6 md:p-8">
        {/* Linha com botão e título */}
        <div className="flex items-center gap-4 mb-6">
          {/* Botão hambúrguer só no mobile */}
          <button
            className="md:hidden text-white bg-[#275b9d] p-2 rounded-md"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#093a69] ml-2 md:ml-0">
            Dashboard
          </h1>
        </div>

        <CardsDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
