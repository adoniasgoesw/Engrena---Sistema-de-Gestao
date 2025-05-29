import React from 'react';
import { CheckCircle } from 'lucide-react'; // Você pode usar outro ícone se quiser

const ModalSucesso = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm  flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center border-2 border-[#cceabe]">
        <CheckCircle size={60} className="mx-auto text-[#00b37e]" />
        <h2 className="text-2xl font-bold text-[#093a69] mt-4">Conta criada com sucesso!</h2>
        <p className="text-sm text-[#555] mt-2 mb-6">Agora você pode fazer login normalmente.</p>
        <button
          onClick={() => {
            onClose();
            onSwitchToLogin();
          }}
          className="px-6 py-3 bg-[#00b37e] text-white font-semibold rounded-xl hover:bg-[#007a59] transition-colors"
        >
          Fazer login
        </button>
      </div>
    </div>
  );
};

export default ModalSucesso;
