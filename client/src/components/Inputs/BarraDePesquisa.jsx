import React from 'react';
import { FaFilter } from 'react-icons/fa';

const BarraDePesquisa = ({ value, onChange, placeholder = "Buscar...", onFiltroClick }) => {
  return (
    <div className="flex items-center gap-3 w-full mb-6">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-grow bg-white shadow-md rounded-xl px-4 py-3 text-[#275b9d] font-semibold placeholder-[#a1b5d8] outline-none border border-[#d6dfeb] focus:ring-2 focus:ring-[#74a9ee] transition-all duration-200"
      />
      <button
        type="button"
        className="flex items-center justify-center bg-[#2a5ba1] text-white text-lg p-3 rounded-xl shadow-md hover:opacity-90 transition w-[48px] h-[48px] min-w-[48px]"
        onClick={onFiltroClick}
      >
        <FaFilter />
      </button>
    </div>
  );
};

export default BarraDePesquisa;
