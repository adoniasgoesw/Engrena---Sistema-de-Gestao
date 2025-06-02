import React, { useEffect, useState } from 'react';
import ListagemPadrao from './ListagemPadrao';
import BarraDePesquisa from '../../components/Inputs/BarraDePesquisa';
import api from '../../services/api';

const colunas = ['Modelo', 'Marca', 'Cor', 'Ano', 'Placa'];
const chaves = ['modelo', 'marca', 'cor', 'ano', 'placa'];

const ListagemVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [isModalFiltroAberto, setIsModalFiltroAberto] = useState(false);
  const [ordenacao, setOrdenacao] = useState('modelo-asc'); // padrão

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

  // Filtra por modelo, marca ou placa (tudo em lowercase)
  const veiculosFiltrados = veiculos.filter((v) =>
    v.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
    v.marca.toLowerCase().includes(filtro.toLowerCase()) ||
    v.placa.toLowerCase().includes(filtro.toLowerCase())
  );

  // Ordena os veículos conforme a ordenação escolhida
  const veiculosOrdenados = [...veiculosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'modelo-asc':
        return a.modelo.localeCompare(b.modelo);
      case 'modelo-desc':
        return b.modelo.localeCompare(a.modelo);
      case 'marca-asc':
        return a.marca.localeCompare(b.marca);
      case 'marca-desc':
        return b.marca.localeCompare(a.marca);
      case 'ano-asc':
        return (a.ano || 0) - (b.ano || 0);
      case 'ano-desc':
        return (b.ano || 0) - (a.ano || 0);
      default:
        return 0;
    }
  });

  // Toggle modal
  const toggleModalFiltro = () => setIsModalFiltroAberto(!isModalFiltroAberto);

  // Seleção ordenação
  const selecionarOrdenacao = (tipo) => {
    setOrdenacao(tipo);
    setIsModalFiltroAberto(false);
  };

  return (
    <div className="w-full relative">
      <BarraDePesquisa
        value={filtro}
        onChange={setFiltro}
        placeholder="Buscar por modelo, marca ou placa..."
        onFiltroClick={toggleModalFiltro}
      />

      {isModalFiltroAberto && (
        <div
          className="absolute top-0 mb-2 right-0 bg-white shadow-lg rounded-md border border-gray-300 p-4 z-50 w-64"
          style={{ minWidth: '250px' }}
        >
          <h3 className="font-semibold mb-2">Ordenar por:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'modelo-asc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('modelo-asc')}
              >
                Modelo A → Z
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'modelo-desc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('modelo-desc')}
              >
                Modelo Z → A
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'marca-asc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('marca-asc')}
              >
                Marca A → Z
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'marca-desc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('marca-desc')}
              >
                Marca Z → A
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'ano-desc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('ano-desc')}
              >
                Ano mais recente
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'ano-asc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('ano-asc')}
              >
                Ano mais antigo
              </button>
            </li>
          </ul>
        </div>
      )}

      <ListagemPadrao colunas={colunas} chaves={chaves} dados={veiculosOrdenados} />
    </div>
  );
};

export default ListagemVeiculos;
