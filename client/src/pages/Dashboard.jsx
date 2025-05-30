import React from 'react';
import Sidebar from '../components/Layouts/SideBar';
import CardsDashboard from '../components/Cards/CardsDashboard'; // ajuste o caminho conforme seu projeto

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#d6dfeb]">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <h1 className="text-4xl font-bold text-[#093a69]">Dashboard</h1>

        <CardsDashboard className="w-[60%]" />

      </main>
    </div>
  );
};

export default Dashboard;
