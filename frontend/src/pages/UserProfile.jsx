import React from "react";

export default function UserProfile() {
  const rawUsuario = localStorage.getItem("usuario");
  const rawEstabelecimento = localStorage.getItem("estabelecimento");

  let usuario = null;
  let estabelecimento = null;

  try {
    if (rawUsuario) usuario = JSON.parse(rawUsuario);
    if (rawEstabelecimento) estabelecimento = JSON.parse(rawEstabelecimento);
  } catch (err) {
    console.error("Erro ao fazer parse dos dados do localStorage:", err);
  }

  if (!usuario || !estabelecimento) {
    return (
      <div className="p-6 max-w-lg mx-auto mt-10 text-center text-red-600">
        Nenhum dado do usuário encontrado. Faça login para ver o perfil.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Perfil do Usuário</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b pb-1">Dados do Usuário</h2>
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>E-mail:</strong> {usuario.email}</p>
        <p><strong>Telefone:</strong> {usuario.telefone}</p>
        <p><strong>CPF:</strong> {usuario.cpf}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 border-b pb-1">Dados do Estabelecimento</h2>
        <p><strong>Nome do Estabelecimento:</strong> {estabelecimento.nome}</p>
      </section>
    </div>
  );
}
