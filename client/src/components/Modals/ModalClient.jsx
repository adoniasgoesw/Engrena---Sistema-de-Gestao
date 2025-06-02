import React, { useState } from 'react';
import ModalBase from './ModalBase'; // usa o mesmo do ModalRegister
import api from '../../services/api';

const ModalCliente = ({ isOpen, onClose }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSave = async () => {
    if (!nome.trim()) {
      setStatus('error');
      setMessage('O campo nome é obrigatório.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const id_estabelecimento = user?.estabelecimento?.id;

    if (!id_estabelecimento) {
      setStatus('error');
      setMessage('Estabelecimento não identificado.');
      return;
    }

    setIsLoading(true);
    setMessage(null);
    setStatus(null);

    try {
      const response = await api.post('/clientes', {
        nome,
        cpf,
        email,
        telefone,
        endereco,
        id_estabelecimento,
      });

      setStatus('success');
      setMessage(response.data.message || 'Cliente cadastrado com sucesso.');

      setTimeout(() => {
        setIsLoading(false);
        onClose();
        setNome('');
        setCpf('');
        setEmail('');
        setTelefone('');
        setEndereco('');
        setMessage(null);
        setStatus(null);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setStatus('error');
      setMessage(error.response?.data?.error || 'Erro ao cadastrar cliente.');
    }
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold text-[#275b9d] mb-4 text-center">Cadastro de Cliente</h2>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm text-center font-medium ${status === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Nome *" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" />
        <input type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" />
        <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="w-full md:col-span-2 border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" />
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-[#cceabe] text-[#007883] rounded-lg font-semibold hover:bg-[#b1d9c0] transition"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#74a9ee] text-white rounded-lg font-semibold hover:bg-[#275b9d] transition"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </ModalBase>
  );
};

export default ModalCliente;
