import React, { useState } from 'react';
import Paginator from '../Layouts/Pagination.jsx';
import { FaCog } from 'react-icons/fa';
import ModalDadosPadrao from '../Modals/ModalDadosPadrao'; // novo import

const ListagemPadrao = ({ colunas, chaves, dados }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dados.slice(startIndex, startIndex + itemsPerPage);

  const getResponsiveClass = (index) => {
    if (index === 0) return '';
    if (index === 1) return 'sm:table-cell hidden';
    if (index === 2) return 'md:table-cell hidden';
    if (index === 3) return 'lg:table-cell hidden';
    return 'xl:table-cell hidden';
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md p-4 w-full" style={{ height: 500 }}>
      <table className="w-full table-auto border-separate border-spacing-y-3">
        <thead style={{ backgroundColor: '#d6dfeb' }}>
          <tr style={{ height: 56 }}>
            {colunas.map((coluna, index) => (
              <th key={index} className={`px-5 text-left text-sm font-semibold text-gray-800 uppercase tracking-wide whitespace-nowrap ${getResponsiveClass(index)}`}>
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td className="px-5 py-8 text-center text-gray-500" colSpan={colunas.length}>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FaCog className="text-gray-400 animate-spin" size={28} />
                  <span>Nenhum dado disponível</span>
                </div>
              </td>
            </tr>
          ) : (
            currentItems.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => setItemSelecionado(item)}
                className="hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out"
              >
                {chaves.map((chave, index) => (
                  <td key={index} className={`px-5 py-4 text-gray-700 whitespace-nowrap truncate max-w-[160px] ${getResponsiveClass(index)}`}>
                    {item[chave] || '-'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="absolute bottom-3 right-4">
        <Paginator
          totalItems={dados.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {itemSelecionado && (
        <ModalDadosPadrao
          dados={itemSelecionado}
          onClose={() => setItemSelecionado(null)}
        />
      )}
    </div>
  );
};

export default ListagemPadrao;
