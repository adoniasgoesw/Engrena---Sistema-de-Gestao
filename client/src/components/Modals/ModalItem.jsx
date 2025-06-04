import React, { useState, useEffect } from 'react';
import ModalBasePadrao from './ModalCad';
import api from '../../services/api';

const ModalItem = ({ isOpen, onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [tipo, setTipo] = useState('');
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    unidade_medida: '',
    estoque_atual: '',
    tempo_estimado: '',
    valor_unitario: '',
    id_categoria: '',
  });
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const id_estabelecimento = user?.estabelecimento?.id;

  useEffect(() => {
    if (!isOpen || !id_estabelecimento) return;

    const fetchCategorias = async () => {
      try {
        const response = await api.get(`/categorias/por-estabelecimento/${id_estabelecimento}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, [isOpen, id_estabelecimento, token]);

  const limparCampos = () => {
    setForm({
      nome: '',
      descricao: '',
      unidade_medida: '',
      estoque_atual: '',
      tempo_estimado: '',
      valor_unitario: '',
      id_categoria: '',
    });
    setTipo('');
    setStatus(null);
    setMessage('');
  };

  const handleSave = async () => {
    if (!form.nome || !tipo || !form.id_categoria || !form.valor_unitario) {
      setStatus('error');
      setMessage('Preencha os campos obrigatórios.');
      return;
    }

    const dados = {
      ...form,
      tipo,
      id_estabelecimento,
    };

    setIsLoading(true);

    try {
      const response = await api.post('/itens', dados, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStatus('success');
      setMessage(response.data.message);
      setTimeout(() => {
        setIsLoading(false);
        limparCampos();
        onClose();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setStatus('error');
      setMessage(error.response?.data?.error || 'Erro ao cadastrar item.');
    }
  };

  // Função para filtrar categorias baseado no tipo selecionado
  const categoriasFiltradas = categorias.filter(categoria => {
    if (!tipo) return true; // Se não tem tipo selecionado, lista todas
    if (tipo === 'produto') return categoria.tipo === 'produto' || categoria.tipo === 'ambos';
    if (tipo === 'serviço') return categoria.tipo === 'serviço' || categoria.tipo === 'ambos';
    return true;
  });

  const inputClass =
    "w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]";

  return (
    <ModalBasePadrao isOpen={isOpen} onClose={() => { limparCampos(); onClose(); }} onSave={handleSave}>
      <h2 className="text-2xl font-semibold text-[#275b9d] mb-4 text-center">Cadastro de Item</h2>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm text-center font-medium ${status === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nome *"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          className={inputClass}
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className={inputClass}
        >
          <option value="">Tipo *</option>
          <option value="produto">Produto</option>
          <option value="serviço">Serviço</option>
        </select>
        <select
          value={form.id_categoria}
          onChange={(e) => setForm({ ...form, id_categoria: e.target.value })}
          className={inputClass}
        >
          <option value="">Categoria *</option>
          {categoriasFiltradas.map(c => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        {tipo === 'produto' && (
          <>
            <input
              type="text"
              placeholder="Unidade de medida (ex: un, kg)"
              value={form.unidade_medida}
              onChange={(e) => setForm({ ...form, unidade_medida: e.target.value })}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Estoque atual"
              value={form.estoque_atual}
              onChange={(e) => setForm({ ...form, estoque_atual: e.target.value })}
              className={inputClass}
            />
          </>
        )}

        {tipo === 'serviço' && (
  <input
    type="number"
    placeholder="Tempo estimado em minutos (ex: 120)"
    value={form.tempo_estimado}
    onChange={(e) => setForm({ ...form, tempo_estimado: e.target.value })}
    className={`${inputClass} md:col-span-2`}
    min="0"
  />
)}


        <input
          type="number"
          step="0.01"
          placeholder="Valor unitário *"
          value={form.valor_unitario}
          onChange={(e) => setForm({ ...form, valor_unitario: e.target.value })}
          className={`${inputClass} md:col-span-2`}
        />
      </div>
    </ModalBasePadrao>
  );
};

export default ModalItem;
