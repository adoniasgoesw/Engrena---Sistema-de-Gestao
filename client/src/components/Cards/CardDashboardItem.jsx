import React from 'react';
import { IconContext } from 'react-icons';

const CardDashboardItem = ({ title, value, color, icon: Icon }) => {
  return (
    <div
      className="relative flex flex-col justify-between p-6 rounded-2xl shadow-md text-white w-full min-w-[150px] overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Ícone decorativo no fundo à direita */}
      <div className="absolute right-4 bottom-4 opacity-10 text-6xl pointer-events-none">
        <IconContext.Provider value={{ size: '3.5rem' }}>
          <Icon />
        </IconContext.Provider>
      </div>

      {/* Conteúdo principal */}
      <div className="z-10">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    </div>
  );
};

export default CardDashboardItem;
