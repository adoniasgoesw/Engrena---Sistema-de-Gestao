import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import BotoesClientes from '../components/Buttons/Buttons.jsx'; // ou renomeie se preferir
import { FaBars } from 'react-icons/fa';
import ModalVeiculo from '../components/Modals/ModalVeiculo.jsx';
import ListagemVeiculos from '../components/Listagem/ListagemVeiculos.jsx'; // Importação da listagem
import api from '../services/api';

const Veiculos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVeiculoAberto, setModalVeiculoAberto] = useState(false);
  const [veiculos, setVeiculos] = useState([]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const buscarVeiculos = async () => {
      try {
        const userJSON = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userJSON || !token) {
          console.error('Usuário não autenticado ou token ausente.');
          return;
        }

        const user = JSON.parse(userJSON);

        if (!user?.estabelecimento?.id) {
          console.error('ID do estabelecimento não encontrado no usuário.');
          return;
        }

        const response = await api.get(
          `/veiculos/por-estabelecimento/${user.estabelecimento.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const veiculosFormatados = response.data.map((veiculo) => ({
          id: veiculo.id,
          marca: veiculo.marca,
          modelo: veiculo.modelo,
          cor: veiculo.cor || '-',
          ano: veiculo.ano || '-',
          placa: veiculo.placa,
        }));

        setVeiculos(veiculosFormatados);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };

    buscarVeiculos();
  }, []);

  return (
    <div className="flex h-screen bg-[#d6dfeb] overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white bg-[#275b9d] p-2 rounded-md"
              onClick={toggleSidebar}
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#093a69]">
              Veículos
            </h1>
          </div>

          <BotoesClientes onCadastrarClick={() => setModalVeiculoAberto(true)} />
        </div>

        {/* Remove BarraDePesquisa daqui */}

        {/* Passa os dados sem filtro, pois filtro agora será feito dentro do componente */}
        <ListagemVeiculos dados={veiculos} />

        <ModalVeiculo
          isOpen={modalVeiculoAberto}
          onClose={() => setModalVeiculoAberto(false)}
        />
      </main>
    </div>
  );
};

export default Veiculos;
