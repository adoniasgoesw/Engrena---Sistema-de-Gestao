import React, { useState } from 'react';
import ModalDadosPadrao from './ModalDadosPadrao';

const DadosVeiculo = ({ dados, onClose, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    modelo: dados.modelo || '',
    marca: dados.marca || '',
    cor: dados.cor || '',
    ano: dados.ano || '',
    placa: dados.placa || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSaveClick = () => {
    onSave({ ...dados, ...formData });
    setIsEditing(false);
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setFormData({
      modelo: dados.modelo || '',
      marca: dados.marca || '',
      cor: dados.cor || '',
      ano: dados.ano || '',
      placa: dados.placa || '',
    });
    setIsEditing(false);
  };

  return (
    <ModalDadosPadrao
      onClose={isEditing ? handleCancelEdit : onClose}
      onSave={handleSaveClick}
      onDelete={onDelete}
      onEdit={handleEditClick}
      isEditing={isEditing}
    >
      <div className="space-y-6 mt-4 text-[#093a69]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Modelo</label>
            <input
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full rounded-md border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#74a9ee] ${
                !isEditing ? 'bg-gray-100 cursor-default' : 'bg-white'
              }`}
              type="text"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Marca</label>
            <input
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full rounded-md border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#74a9ee] ${
                !isEditing ? 'bg-gray-100 cursor-default' : 'bg-white'
              }`}
              type="text"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Cor</label>
            <input
              name="cor"
              value={formData.cor}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full rounded-md border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#74a9ee] ${
                !isEditing ? 'bg-gray-100 cursor-default' : 'bg-white'
              }`}
              type="text"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Ano</label>
            <input
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full rounded-md border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#74a9ee] ${
                !isEditing ? 'bg-gray-100 cursor-default' : 'bg-white'
              }`}
              type="number"
              autoComplete="off"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-1">Placa</label>
            <input
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full rounded-md border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#74a9ee] ${
                !isEditing ? 'bg-gray-100 cursor-default' : 'bg-white'
              }`}
              type="text"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </ModalDadosPadrao>
  );
};

export default DadosVeiculo;
