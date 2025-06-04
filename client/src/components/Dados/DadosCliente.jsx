// DadosCliente.jsx
import React, { useState } from 'react';
import ModalDadosPadrao from './ModalDadosPadrao';

const DadosCliente = ({ dados, onClose, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: dados.nome || '',
    cpf: dados.cpf || '',
    email: dados.email || '',
    telefone: dados.telefone || '',
    endereco: dados.endereco || '',
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
      nome: dados.nome || '',
      cpf: dados.cpf || '',
      email: dados.email || '',
      telefone: dados.telefone || '',
      endereco: dados.endereco || '',
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
        {/* Layout tipo formulário digitalizado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nome</label>
            <input
              name="nome"
              value={formData.nome}
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
            <label className="block text-sm font-semibold mb-1">CPF</label>
            <input
              name="cpf"
              value={formData.cpf}
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
            <label className="block text-sm font-semibold mb-1">E-mail</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full rounded-md border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#74a9ee] ${
                !isEditing ? 'bg-gray-100 cursor-default' : 'bg-white'
              }`}
              type="email"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Telefone</label>
            <input
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full rounded-md border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#74a9ee] ${
                !isEditing ? 'bg-gray-100 cursor-default' : 'bg-white'
              }`}
              type="tel"
              autoComplete="off"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-1">Endereço</label>
            <input
              name="endereco"
              value={formData.endereco}
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

export default DadosCliente;
