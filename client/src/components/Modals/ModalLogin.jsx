import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalBase from './ModalBase';
import api from '../../services/api';
import LoadingModal from './LoadingModal';

const ModalLogin = ({ isOpen, onClose, switchToRegister }) => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    setMessage('');

    try {
      const response = await api.post('/login', { cpf, senha });
      const { user } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.data.token);


      setStatus('success');
      setMessage('Login realizado com sucesso!');

      setTimeout(() => {
        setIsLoading(false);
        onClose();
        navigate('/dashboard');
      }, 1800);
    } catch (error) {
      console.error('Erro no login:', error);
      setStatus('error');
      setMessage(error.response?.data?.error || 'Erro ao fazer login');

      setTimeout(() => {
        setIsLoading(false);
        setStatus(null);
        setMessage('');
      }, 2200);
    }
  };

  return (
    <>
      {/* Modal de carregamento que sobrepõe o de login */}
      <LoadingModal isLoading={isLoading} status={status} message={message} />

      {/* Modal de login padrão */}
      <ModalBase isOpen={isOpen} onClose={onClose}>
        <h2 className="text-2xl font-semibold text-[#275b9d] mb-6 text-center">Login</h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#007883] hover:bg-[#275b9d] text-white py-3 rounded-lg font-semibold transition"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-[#093a69] text-sm">
          Não possui conta?{' '}
          <button
            onClick={switchToRegister}
            className="text-[#74a9ee] hover:underline font-medium"
            type="button"
          >
            Cadastrar
          </button>
        </p>
      </ModalBase>
    </>
  );
};

export default ModalLogin;
