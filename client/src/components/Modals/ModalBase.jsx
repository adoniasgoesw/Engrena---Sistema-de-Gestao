import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const ModalBase = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative rounded-2xl shadow-2xl bg-[#f8fbff] p-8 w-full max-w-lg border border-[#d6dfeb]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full bg-[#275b9d] p-1.5 text-white hover:bg-[#093a69] transition"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalBase;