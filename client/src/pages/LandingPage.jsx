import React, { useState } from 'react';
import ModalLogin from '../components/Modals/ModalLogin';
import ModalRegister from '../components/Modals/ModalRegister';

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const abrirLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const abrirRegistro = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      {/* Header */}
      <header className="bg-[#d7e1ee] text-[#093a69] shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">Engrena</h1>
          <nav className="space-x-6 text-lg font-semibold">
            <button
              onClick={abrirLogin}
              className="hover:underline transition-colors duration-300"
            >
              Entrar
            </button>
            <button
              onClick={abrirRegistro}
              className="hover:underline transition-colors duration-300"
            >
              Cadastrar
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-16">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#275b9d] leading-tight mb-6">
            Simplifique a gestão da sua oficina mecânica
          </h2>
          <p className="text-gray-700 text-lg mb-10 max-w-xl mx-auto md:mx-0">
            O Engrena é o sistema que vai transformar o modo como você organiza serviços, clientes, ordens e faturamento. Tenha controle total na palma da sua mão!
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={abrirRegistro}
              className="bg-[#007883] text-white px-8 py-4 rounded-lg shadow-md hover:bg-[#0f62bc] transition duration-300 font-semibold"
            >
              Testar Agora
            </button>
            <button className="border border-[#007883] text-[#007883] px-8 py-4 rounded-lg hover:bg-[#cceabe] transition duration-300 font-semibold">
              Saiba Mais
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1033/1033495.png"
            alt="Imagem do dashboard do sistema Engrena"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-[#fffefb] py-20">
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <h3 className="text-4xl font-bold text-[#007883] mb-14">Benefícios do Engrena</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 border rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white">
              <h4 className="text-2xl font-semibold mb-4 text-[#093a69]">Controle Total</h4>
              <p className="text-gray-700 text-lg">
                Gerencie ordens, clientes e serviços com facilidade e rapidez.
              </p>
            </div>
            <div className="p-8 border rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white">
              <h4 className="text-2xl font-semibold mb-4 text-[#093a69]">Relatórios Detalhados</h4>
              <p className="text-gray-700 text-lg">
                Acompanhe o faturamento diário e histórico para melhor tomada de decisão.
              </p>
            </div>
            <div className="p-8 border rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white">
              <h4 className="text-2xl font-semibold mb-4 text-[#093a69]">Interface Intuitiva</h4>
              <p className="text-gray-700 text-lg">
                Navegação simples e rápida para que você perca menos tempo e ganhe mais produtividade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#ffde59] py-20 text-center text-[#093a69]">
        <h3 className="text-4xl font-extrabold mb-8">
          Pronto para transformar sua oficina?
        </h3>
        <button
          onClick={abrirRegistro}
          className="bg-white text-[#093a69] font-bold px-10 py-5 rounded-lg hover:bg-[#f1f1f1] transition duration-300"
        >
          Comece a usar o Engrena grátis!
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#f0f4fa] py-8 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Engrena - Sistema de Gestão para Oficinas Mecânicas
      </footer>

      {/* Modais */}
      <ModalLogin
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={abrirRegistro}
      />
      <ModalRegister
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={abrirLogin}
      />
    </div>
  );
}
