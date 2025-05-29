import React, { useState } from 'react';
import ModalBase from './ModalBase';
import api from '../../services/api';

const ModalRegister = ({ isOpen, onClose, switchToLogin }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [logo, setLogo] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const nextStep = () => {
    if (step === 1) {
      if (!nomeCompleto || !email || !telefone) {
        alert('Preencha todos os campos obrigatórios da etapa.');
        return;
      }
    }
    if (step === 2) {
      if (!nomeEstabelecimento || !cnpj || !endereco) {
        alert('Preencha todos os campos obrigatórios da etapa.');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cpf || !senha) {
      alert('Preencha todos os campos obrigatórios da etapa.');
      return;
    }

    const data = {
      nomeEstabelecimento,
      cnpj,
      endereco,
      logo,
      nomeCompleto,
      email,
      telefone,
      cpf,
      senha,
      cargo: 'adm',
    };

    try {
      setLoading(true);
      const response = await api.post('/register', data);
      alert(response.data.message || 'Cadastro realizado com sucesso!');
      onClose();
      setStep(1);
      // Limpar campos
      setNomeCompleto('');
      setEmail('');
      setTelefone('');
      setNomeEstabelecimento('');
      setCnpj('');
      setEndereco('');
      setLogo('');
      setCpf('');
      setSenha('');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      const message = error.response?.data?.error || 'Erro ao cadastrar. Tente novamente.';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold text-[#275b9d] mb-6 text-center">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <section>
            <h3 className="font-medium text-[#007883] mb-3 border-b border-[#cceabe] pb-1">Dados do Usuário</h3>
            <input
              type="text"
              placeholder="Nome"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
              required
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
              required
            />
          </section>
        )}

        {step === 2 && (
          <section>
            <h3 className="font-medium text-[#007883] mb-3 border-b border-[#cceabe] pb-1">Dados do Estabelecimento</h3>
            <input
              type="text"
              placeholder="Nome do Estabelecimento"
              value={nomeEstabelecimento}
              onChange={(e) => setNomeEstabelecimento(e.target.value)}
              className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
              required
            />
            <input
              type="text"
              placeholder="CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
              required
            />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
              required
            />
          </section>
        )}

        {step === 3 && (
          <section>
            <h3 className="font-medium text-[#007883] mb-3 border-b border-[#cceabe] pb-1">Dados de Acesso</h3>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
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
          </section>
        )}

        <div className="flex justify-between mt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-[#cceabe] text-[#007883] rounded-lg font-semibold hover:bg-[#b1d9c0] transition"
              disabled={loading}
            >
              Voltar
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-[#74a9ee] text-white rounded-lg font-semibold hover:bg-[#275b9d] transition"
              disabled={loading}
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-[#74a9ee] text-white rounded-lg font-semibold hover:bg-[#275b9d] transition"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-[#093a69] text-sm">
        Já possui conta?{' '}
        <button
          onClick={switchToLogin}
          className="text-[#74a9ee] hover:underline font-medium"
          type="button"
          disabled={loading}
        >
          Fazer login
        </button>
      </p>
    </ModalBase>
  );
};

export default ModalRegister;
