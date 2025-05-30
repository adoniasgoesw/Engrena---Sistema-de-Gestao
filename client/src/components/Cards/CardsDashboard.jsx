import React from 'react';
import { FaCheckCircle, FaSpinner, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const CardsDashboard = () => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-6">
      {/* Card 1: Finalizadas */}
      <div className="relative flex-1 bg-[#275b9d] rounded-xl shadow-lg p-6 text-white font-bold min-h-[120px] flex flex-col justify-center items-start overflow-hidden">
        <div className="text-lg mb-2 z-10">OS finalizadas</div>
        <div className="text-3xl font-bold text-white z-10">45</div>
        <FaCheckCircle className="absolute right-4 bottom-2 text-[90px] text-white/20" />
      </div>

      {/* Card 2: Em andamento */}
      <div className="relative flex-1 bg-[#74a9ee] rounded-xl shadow-lg p-6 text-white font-bold min-h-[120px] flex flex-col justify-center items-start overflow-hidden">
        <div className="text-lg mb-2 z-10">OS em andamento</div>
        <div className="text-3xl font-bold text-white z-10">17</div>
        <FaSpinner className="absolute right-4 bottom-2 text-[90px] text-white/20" />
      </div>

      {/* Card 3: Faturamento mensal */}
      <div className="relative flex-1 bg-[#007883] rounded-xl shadow-lg p-6 text-white font-bold min-h-[120px] flex flex-col justify-center items-start overflow-hidden">
        <div className="text-lg mb-2 z-10">Faturamento mensal</div>
        <div className="text-3xl font-bold text-white z-10">R$ 38.500,00</div>
        <FaMoneyBillWave className="absolute right-4 bottom-2 text-[90px] text-white/20" />
      </div>

      {/* Card 4: Clientes */}
      <div className="relative flex-1 bg-[#4a90e2] rounded-xl shadow-lg p-6 text-white font-bold min-h-[120px] flex flex-col justify-center items-start overflow-hidden">
        <div className="text-lg mb-2 z-10">Clientes</div>
        <div className="text-3xl font-bold text-white z-10">120</div>
        <FaUsers className="absolute right-4 bottom-2 text-[90px] text-white/20" />
      </div>
    </div>
  );
};

export default CardsDashboard;
