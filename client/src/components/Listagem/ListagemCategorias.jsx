  // src/components/Listagem/ListagemCategorias.jsx
  import React, { useEffect, useState } from 'react';
  import ListagemPadrao from './ListagemPadrao';
  import BarraDePesquisa from '../../components/Inputs/BarraDePesquisa';
  import api from '../../services/api';

  const colunas = ['Imagem', 'Categoria', 'Tipo'];
  const chaves = ['imagem', 'nome', 'tipo'];

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const ListagemCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [isModalFiltroAberto, setIsModalFiltroAberto] = useState(false);
    const [ordenacao, setOrdenacao] = useState('nome-asc');

    useEffect(() => {
      const buscarCategorias = async () => {
        try {
          const userJSON = localStorage.getItem('user');
          const token = localStorage.getItem('token');
          if (!userJSON || !token) return;

          const user = JSON.parse(userJSON);
          if (!user?.estabelecimento?.id) return;

          const response = await api.get(
            `/categorias/por-estabelecimento/${user.estabelecimento.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const categoriasFormatadas = response.data.map((cat) => ({
            id: cat.id,
            nome: cat.nome,
            tipo: cat.tipo,
            imagem_url: cat.imagem_url,
          }));

          console.log('Categorias formatadas:', categoriasFormatadas);
          setCategorias(categoriasFormatadas);
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        }
      };

      buscarCategorias();
    }, []);

    const categoriasFiltradas = categorias.filter((cat) => {
      const nomeMatch = cat.nome.toLowerCase().includes(filtro.toLowerCase());
      const tipoMatch = filtroTipo === '' || cat.tipo.toLowerCase() === filtroTipo;
      return nomeMatch && tipoMatch;
    });

    const categoriasOrdenadas = [...categoriasFiltradas].sort((a, b) => {
      if (ordenacao === 'nome-asc') return a.nome.localeCompare(b.nome);
      if (ordenacao === 'nome-desc') return b.nome.localeCompare(a.nome);
      return 0;
    });

    const formatarTipoComEstilo = (tipo) => {
      const estilos = {
        produto: 'bg-green-100 text-green-700',
        serviço: 'bg-blue-100 text-blue-700',
        ambos: 'bg-yellow-100 text-yellow-800',
      };

      const tipoLower = tipo.toLowerCase();
      const classe = estilos[tipoLower] || 'bg-gray-100 text-gray-800';

      return (
        <span className={`px-3 py-1 rounded-md text-sm font-semibold ${classe}`}>
          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
        </span>
      );
    };

    const categoriasRenderizadas = categoriasOrdenadas.map((cat) => ({
      ...cat,
      imagem: (
        <img
          src={cat.imagem_url ? `${API_URL}${cat.imagem_url}` : '../assets/client1.jpg'}
          alt={cat.nome}
        />
      ),
      tipo: formatarTipoComEstilo(cat.tipo),
    }));

    const toggleModalFiltro = () => setIsModalFiltroAberto(!isModalFiltroAberto);

    return (
      <div className="w-full relative">
        <BarraDePesquisa
          value={filtro}
          onChange={setFiltro}
          onFiltroClick={toggleModalFiltro}
        />

        {isModalFiltroAberto && (
          <div className="absolute top-0 mb-2 right-0 bg-white shadow-lg rounded-md p-4 z-50 w-64">
            <h3 className="font-semibold mb-2">Ordenar / Filtrar por:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <button
                  className={`w-full text-left ${ordenacao === 'nome-asc' && filtroTipo === '' ? 'font-bold text-blue-600' : ''}`}
                  onClick={() => {
                    setOrdenacao('nome-asc');
                    setFiltroTipo('');
                    setIsModalFiltroAberto(false);
                  }}
                >
                  Nome A → Z
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${ordenacao === 'nome-desc' && filtroTipo === '' ? 'font-bold text-blue-600' : ''}`}
                  onClick={() => {
                    setOrdenacao('nome-desc');
                    setFiltroTipo('');
                    setIsModalFiltroAberto(false);
                  }}
                >
                  Nome Z → A
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${filtroTipo === 'produto' ? 'font-bold text-green-600' : ''}`}
                  onClick={() => {
                    setFiltroTipo('produto');
                    setIsModalFiltroAberto(false);
                  }}
                >
                  Produto
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${filtroTipo === 'serviço' ? 'font-bold text-blue-600' : ''}`}
                  onClick={() => {
                    setFiltroTipo('serviço');
                    setIsModalFiltroAberto(false);
                  }}
                >
                  Serviço
                </button>
              </li>
            </ul>
          </div>
        )}

        <ListagemPadrao colunas={colunas} chaves={chaves} dados={categoriasRenderizadas} />
      </div>
    );
  };

  export default ListagemCategorias;
