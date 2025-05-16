import { useState } from "react";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import { Button } from "../components/button";

export default function HomePage() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">🔧 Engrena</h1>
        <nav className="space-x-4">
          <a href="#servicos" className="hover:underline">Serviços</a>
          <a href="#planos" className="hover:underline">Planos</a>
          <a href="#avaliacoes" className="hover:underline">Avaliações</a>
          <a href="#contato" className="hover:underline">Contato</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-gray-800 text-white py-20 px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Sistema inteligente para sua oficina mecânica</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          O Engrena oferece controle total de clientes, veículos, ordens de serviço e muito mais. Otimize sua gestão com segurança e tecnologia.
        </p>
        <div className="space-x-4">
          <Button onClick={() => setShowRegister(true)} className="bg-white text-blue-900 font-semibold hover:bg-gray-100">
            Cadastrar-se
          </Button>
          <Button onClick={() => setShowLogin(true)} className="bg-blue-700 text-white hover:bg-blue-800">
            Entrar
          </Button>
        </div>
      </section>

      {/* Modais */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
