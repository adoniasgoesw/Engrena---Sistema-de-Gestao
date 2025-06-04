import React, { useEffect, useState } from 'react';
import ListagemPadrao from './ListagemPadrao';
import BarraDePesquisa from '../../components/Inputs/BarraDePesquisa';
import DadosVeiculo from '../Dados/DadosVeiculos';
import api from '../../services/api';

const colunas = ['Modelo', 'Marca', 'Cor', 'Ano', 'Placa'];
const chaves = ['modelo', 'marca', 'cor', 'ano', 'placa'];

const ListagemVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [isModalFiltroAberto, setIsModalFiltroAberto] = useState(false);
  const [ordenacao, setOrdenacao] = useState('modelo-asc');
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

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
            headers: { Authorization: `Bearer ${token}` },
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

  // Filtrar veículos pelo filtro texto (modelo, marca ou placa)
  const veiculosFiltrados = veiculos.filter(
    (v) =>
      v.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
      v.marca.toLowerCase().includes(filtro.toLowerCase()) ||
      v.placa.toLowerCase().includes(filtro.toLowerCase())
  );

  // Ordenar conforme a opção escolhida
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

  const toggleModalFiltro = () => setIsModalFiltroAberto(!isModalFiltroAberto);

  const selecionarOrdenacao = (tipo) => {
    setOrdenacao(tipo);
    setIsModalFiltroAberto(false);
  };

  // Salvar veículo editado (mock para demo)
  const handleSave = async (dadosEditados) => {
    try {
      // await api.put(`/veiculos/${dadosEditados.id}`, dadosEditados);
      setVeiculos((old) =>
        old.map((v) => (v.id === dadosEditados.id ? dadosEditados : v))
      );
      alert('Veículo salvo com sucesso!');
      setVeiculoSelecionado(null);
    } catch (error) {
      alert('Erro ao salvar veículo.');
      console.error(error);
    }
  };

  // Excluir veículo (mock para demo)
  const handleDelete = async (dadosParaExcluir) => {
    try {
      // await api.delete(`/veiculos/${dadosParaExcluir.id}`);
      setVeiculos((old) => old.filter((v) => v.id !== dadosParaExcluir.id));
      alert('Veículo excluído com sucesso!');
      setVeiculoSelecionado(null);
    } catch (error) {
      alert('Erro ao excluir veículo.');
      console.error(error);
    }
  };

  // Abre modal com dados do veículo ao clicar na linha
  const onLinhaClick = (id) => {
    const veiculo = veiculos.find((v) => v.id === id);
    if (veiculo) setVeiculoSelecionado(veiculo);
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between mb-6">
        <BarraDePesquisa
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Pesquisar veículo..."
          onFiltroClick={toggleModalFiltro} // opcional para abrir modal filtro
        />
        <button
          onClick={toggleModalFiltro}
          className="btn btn-secondary ml-2"
          aria-label="Filtrar"
        >
          ⚙️
        </button>
      </div>

      <ListagemPadrao
        colunas={colunas}
        chaves={chaves}
        dados={veiculosOrdenados}
        onRowClick={onLinhaClick} // Passa o id para abrir modal
      />

      {veiculoSelecionado && (
        <DadosVeiculo
          dados={veiculoSelecionado}
          onClose={() => setVeiculoSelecionado(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      {isModalFiltroAberto && (
        <div className="modal-filtro absolute right-0 top-16 bg-white shadow-lg rounded-md p-4 z-50 w-64">
          <h3 className="font-semibold mb-2">Ordenar por:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'modelo-asc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('modelo-asc')}
              >
                Modelo A-Z
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'modelo-desc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('modelo-desc')}
              >
                Modelo Z-A
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'marca-asc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('marca-asc')}
              >
                Marca A-Z
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'marca-desc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('marca-desc')}
              >
                Marca Z-A
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'ano-asc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('ano-asc')}
              >
                Ano Cresc
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  ordenacao === 'ano-desc' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => selecionarOrdenacao('ano-desc')}
              >
                Ano Desc
              </button>
            </li>
          </ul>
          <button
            onClick={toggleModalFiltro}
            className="mt-3 btn btn-secondary w-full"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default ListagemVeiculos;
