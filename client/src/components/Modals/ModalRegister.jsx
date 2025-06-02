import React, { useState } from 'react';
import ModalBase from './ModalBase';
import api from '../../services/api';
import LoadingModal from './LoadingModal';

const ModalRegister = ({ isOpen, onClose, switchToLogin }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState('');

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
    if (step === 1 && (!nomeCompleto || !email || !telefone)) {
      setStatus('error');
      setMessage('Preencha todos os campos obrigatórios da etapa 1.');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStatus(null);
        setMessage('');
      }, 2000);
      return;
    }
    if (step === 2 && (!nomeEstabelecimento || !cnpj || !endereco)) {
      setStatus('error');
      setMessage('Preencha todos os campos obrigatórios da etapa 2.');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStatus(null);
        setMessage('');
      }, 2000);
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cpf || !senha) {
      setStatus('error');
      setMessage('Preencha todos os campos obrigatórios da etapa 3.');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStatus(null);
        setMessage('');
      }, 2000);
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
      setIsLoading(true);
      setStatus(null);
      setMessage('');

      const response = await api.post('/register', data);
      setStatus('success');
      setMessage(response.data.message || 'Cadastro realizado com sucesso!');

      setTimeout(() => {
        setIsLoading(false);
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
      }, 2000);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setStatus('error');
      setMessage(error.response?.data?.error || 'Erro ao cadastrar. Tente novamente.');

      setTimeout(() => {
  setIsLoading(false);
  onClose();          // Fecha o modal de cadastro
  switchToLogin();    // Abre o modal de login
  setStep(1);         // Volta para a etapa 1

  // Limpa os campos
  setNomeCompleto('');
  setEmail('');
  setTelefone('');
  setNomeEstabelecimento('');
  setCnpj('');
  setEndereco('');
  setLogo('');
  setCpf('');
  setSenha('');
}, 2000);

    }
  };

  return (
    <>
      {/* Modal de carregamento com engrenagem */}
      <LoadingModal isLoading={isLoading} status={status} message={message} />

      <ModalBase isOpen={isOpen} onClose={onClose}>
        <h2 className="text-2xl font-semibold text-[#275b9d] mb-6 text-center">Cadastro</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ETAPA 1 */}
          {step === 1 && (
            <section>
              <h3 className="font-medium text-[#007883] mb-3 border-b border-[#cceabe] pb-1">Dados do Usuário</h3>
              <input type="text" placeholder="Nome" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
              <input type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
            </section>
          )}

          {/* ETAPA 2 */}
          {step === 2 && (
            <section>
              <h3 className="font-medium text-[#007883] mb-3 border-b border-[#cceabe] pb-1">Dados do Estabelecimento</h3>
              <input type="text" placeholder="Nome do Estabelecimento" value={nomeEstabelecimento} onChange={(e) => setNomeEstabelecimento(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
              <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
              <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
            </section>
          )}

          {/* ETAPA 3 */}
          {step === 3 && (
            <section>
              <h3 className="font-medium text-[#007883] mb-3 border-b border-[#cceabe] pb-1">Dados de Acesso</h3>
              <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 mb-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
              <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]" required />
            </section>
          )}

          <div className="flex justify-between mt-4">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="px-6 py-2 bg-[#cceabe] text-[#007883] rounded-lg font-semibold hover:bg-[#b1d9c0] transition" disabled={isLoading}>
                Voltar
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button type="button" onClick={nextStep} className="px-6 py-2 bg-[#74a9ee] text-white rounded-lg font-semibold hover:bg-[#275b9d] transition" disabled={isLoading}>
                Próximo
              </button>
            ) : (
              <button type="submit" className="px-6 py-2 bg-[#74a9ee] text-white rounded-lg font-semibold hover:bg-[#275b9d] transition" disabled={isLoading}>
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-[#093a69] text-sm">
          Já possui conta?{' '}
          <button onClick={switchToLogin} className="text-[#74a9ee] hover:underline font-medium" type="button" disabled={isLoading}>
            Fazer login
          </button>
        </p>
      </ModalBase>
    </>
  );
};

export default ModalRegister;
