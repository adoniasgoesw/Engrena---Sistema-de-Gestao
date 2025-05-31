import React from 'react';
import { createPortal } from 'react-dom';

const ModalBasePadrao = ({ isOpen, onClose, onSave, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl relative mx-auto">
        {children}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#cceabe] text-[#007883] rounded-lg font-semibold hover:bg-[#b1d9c0] transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 bg-[#74a9ee] text-white rounded-lg font-semibold hover:bg-[#275b9d] transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalBasePadrao;
