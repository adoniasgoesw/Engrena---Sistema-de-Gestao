import React, { useState, useEffect } from 'react';

const ModalDadosPadrao = ({ dados, onClose, onSave, onDelete }) => {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [formDados, setFormDados] = useState({});

  // Inicializa form com dados do props ao abrir modal ou quando dados mudam
  useEffect(() => {
    setFormDados(dados || {});
    setModoEdicao(false);
  }, [dados]);

  // Atualiza o valor de um campo do form
  const handleChange = (key, value) => {
    setFormDados((prev) => ({ ...prev, [key]: value }));
  };

  // Salvar
  const handleSave = () => {
    if (onSave) onSave(formDados);
    setModoEdicao(false);
  };

  // Cancelar edição volta para dados originais ou fecha modal
  const handleCancel = () => {
    if (modoEdicao) {
      setFormDados(dados);
      setModoEdicao(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Detalhes</h2>

        <div className="space-y-4 text-gray-700">
          {formDados && Object.entries(formDados).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="font-semibold mb-1 capitalize">{key.replace(/_/g, ' ')}</label>

              {modoEdicao ? (
                <input
                  type="text"
                  value={formDados[key] ?? ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{value || '-'}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          {modoEdicao ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
              >
                Salvar
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md font-semibold transition"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onDelete && onDelete(formDados)}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition"
                title="Excluir"
              >
                🗑️
                <span className="ml-2">Excluir</span>
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => setModoEdicao(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition"
              >
                Editar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalDadosPadrao;
