// src/components/Modals/ModalCategoria.jsx
import React, { useState } from 'react';
import ModalBasePadrao from './ModalCad';
import { FiImage } from 'react-icons/fi';
import api from '../../services/api';

const ModalCategoria = ({ isOpen, onClose }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('produto');
  const [imagem, setImagem] = useState(null);
  const [status, setStatus] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const limparCampos = () => {
    setNome('');
    setTipo('produto');
    setImagem(null);
    setMensagem('');
    setStatus(null);
  };

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSalvar = async () => {
    if (!nome) {
      setStatus('erro');
      setMensagem('O nome da categoria é obrigatório.');
      return;
    }

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const id_estabelecimento = user?.estabelecimento?.id;

    if (!id_estabelecimento) {
      setStatus('erro');
      setMensagem('Estabelecimento não identificado.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('tipo', tipo);
    formData.append('id_estabelecimento', id_estabelecimento);
    if (imagem) formData.append('imagem', imagem);

    try {
      await api.post('/categorias', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatus('sucesso');
      setMensagem('Categoria cadastrada com sucesso!');
      setTimeout(() => {
        limparCampos();
        onClose();
      }, 2000);
    } catch (error) {
      setStatus('erro');
      setMensagem(error.response?.data?.error || 'Erro ao cadastrar categoria.');
    }
  };

  return (
    <ModalBasePadrao isOpen={isOpen} onClose={() => { limparCampos(); onClose(); }} onSave={handleSalvar}>
      <h2 className="text-2xl font-semibold text-[#275b9d] mb-4 text-center">Cadastro de Categoria</h2>

      {mensagem && (
        <div className={`mb-4 p-2 rounded text-sm text-center font-medium ${status === 'erro' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
          {mensagem}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nome da categoria *"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:ring-2 focus:ring-[#74a9ee]"
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border border-[#cceabe] rounded-lg p-3 text-[#093a69] focus:ring-2 focus:ring-[#74a9ee]"
        >
          <option value="produto">Produto</option>
          <option value="serviço">Serviço</option>
          <option value="ambos">Ambos</option>
        </select>
      </div>

      <label
        htmlFor="imagem"
        className="mt-6 border-2 border-dashed border-[#cceabe] rounded-xl p-6 flex flex-col items-center justify-center text-[#93a3b5] cursor-pointer hover:bg-[#f0f6ff] transition"
      >
        <FiImage size={48} className="mb-2" />
        {imagem ? imagem.name : 'Enviar imagem'}
        <input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={handleImagemChange}
          className="hidden"
        />
      </label>
    </ModalBasePadrao>
  );
};

export default ModalCategoria;
