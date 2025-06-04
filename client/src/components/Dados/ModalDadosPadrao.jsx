// ModalDadosPadrao.jsx
import React from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const ModalDadosPadrao = ({ onClose, onSave, onDelete, onEdit, isEditing, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-auto
                      sm:p-8
                      ">
        {/* Conteúdo do modal */}
        {children}

        {/* Botões de ação */}
        <div className="flex justify-end gap-3 mt-6 flex-wrap sm:gap-4">
          {!isEditing && (
            <>
              <button
                onClick={onDelete}
                className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                title="Excluir"
                aria-label="Excluir"
              >
                <FiTrash2 size={20} />
              </button>
              <button
                onClick={onEdit}
                className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2 bg-[#74a9ee] text-white rounded-lg font-semibold hover:bg-[#275b9d] transition"
                title="Editar"
                aria-label="Editar"
              >
                <FiEdit size={20} />
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#cceabe] text-[#007883] rounded-lg font-semibold hover:bg-[#b1d9c0] transition text-sm sm:text-base"
              >
                Cancelar
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#cceabe] text-[#007883] rounded-lg font-semibold hover:bg-[#b1d9c0] transition text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2 bg-[#74a9ee] text-white rounded-lg font-semibold hover:bg-[#275b9d] transition text-sm sm:text-base"
              >
                Salvar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalDadosPadrao;
