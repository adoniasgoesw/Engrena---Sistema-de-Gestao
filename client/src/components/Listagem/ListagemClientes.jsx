import React, { useEffect, useState } from 'react';
import ListagemPadrao from './ListagemPadrao';
import BarraDePesquisa from '../../components/Inputs/BarraDePesquisa';
import api from '../../services/api';

const colunas = ['Nome', 'CPF', 'E-mail', 'Número', 'Endereço', 'Data Cadastro'];
const chaves = ['nome', 'cpf', 'email', 'telefone', 'endereco', 'data_cadastro'];

const ListagemClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [isModalFiltroAberto, setIsModalFiltroAberto] = useState(false);
  const [ordenacao, setOrdenacao] = useState('nome-asc'); // padrão

  useEffect(() => {
    const buscarClientes = async () => {
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
          `/clientes/por-estabelecimento/${user.estabelecimento.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const clientesFormatados = response.data.map((cliente) => ({
          id: cliente.id,
          nome: cliente.nome_completo,
          cpf: cliente.cpf,
          email: cliente.email,
          telefone: cliente.telefone,
          endereco: cliente.endereco,
          data_cadastro: cliente.data_cadastro,
        }));

        setClientes(clientesFormatados);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    buscarClientes();
  }, []);

  // Filtra clientes pelo nome conforme filtro
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  // Ordena os clientes filtrados conforme o estado 'ordenacao'
  const clientesOrdenados = [...clientesFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'nome-asc':
        return a.nome.localeCompare(b.nome);
      case 'nome-desc':
        return b.nome.localeCompare(a.nome);
      case 'data-cadastro-asc':
        return new Date(a.data_cadastro) - new Date(b.data_cadastro);
      case 'data-cadastro-desc':
        return new Date(b.data_cadastro) - new Date(a.data_cadastro);
      default:
        return 0;
    }
  });

  // Toggle modal
  const toggleModalFiltro = () => setIsModalFiltroAberto(!isModalFiltroAberto);

  // Handler seleção da ordenação
  const selecionarOrdenacao = (tipo) => {
    setOrdenacao(tipo);
    setIsModalFiltroAberto(false);
  };

  return (
    <div className="w-full relative">
      <BarraDePesquisa
        value={filtro}
        onChange={setFiltro}
        onFiltroClick={toggleModalFiltro}
      />

      {/* Modal de filtros posicionado acima do botão filtro */}
      {isModalFiltroAberto && (
        <div
          className="absolute top-0 mb-2 right-0 bg-white shadow-lg rounded-md p-4 z-50 w-64"
          style={{ minWidth: '250px' }}
        >
          <h3 className="font-semibold mb-2">Ordenar por:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'nome-asc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('nome-asc')}
              >
                Nome A → Z
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'nome-desc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('nome-desc')}
              >
                Nome Z → A
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'data-cadastro-desc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('data-cadastro-desc')}
              >
                Mais recente
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'data-cadastro-asc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('data-cadastro-asc')}
              >
                Mais antigo
              </button>
            </li>
          </ul>
        </div>
      )}

      <ListagemPadrao
        colunas={colunas}
        chaves={chaves}
        dados={clientesOrdenados}
      />
    </div>
  );
};

export default ListagemClientes;
