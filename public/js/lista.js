const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("btnAtualizar");
const totalEl = document.getElementById("total");

botao.addEventListener("click", carregarUsuarios);

// Carrega automaticamente ao abrir a página
carregarUsuarios();

async function carregarUsuarios() {
  mensagem.textContent = "Carregando...";
  mensagem.className = "mensagem";

  try {
    const resposta = await fetch("/api/usuarios");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    const usuarios = await resposta.json();

    renderizarUsuarios(usuarios);
    mensagem.textContent = "";

  } catch (erro) {
    mensagem.textContent = "Erro ao carregar usuários.";
    mensagem.className = "mensagem erro";
    console.error(erro);
  }

  await carregarTotal();
}

function renderizarUsuarios(usuarios) {
  lista.innerHTML = "";

  if (usuarios.length === 0) {
    lista.innerHTML = '<li class="vazio">Nenhum usuário cadastrado.</li>';
    return;
  }

  usuarios.forEach((usuario) => {
    const li = document.createElement("li");
    li.className = "usuario-item";
    li.innerHTML = `
      <span class="usuario-nome">${usuario.nome}</span>
      <span class="usuario-idade">${usuario.idade} anos</span>
    `;
    lista.appendChild(li);
  });
}

async function carregarTotal() {
  try {
    const resposta = await fetch("/api/usuarios/total");
    const dados = await resposta.json();
    totalEl.textContent = `Total de usuários: ${dados.total}`;
  } catch (erro) {
    totalEl.textContent = "Erro ao carregar total.";
    console.error(erro);
  }
}