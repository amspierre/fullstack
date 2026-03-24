const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("btnAtualizar");
const total = document.getElementById("total");

botao.addEventListener("click", carregarUsuarios);

async function carregarUsuarios() {
  mensagem.textContent = "Carregando...";

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
    mensagem.style.color = "red";
    console.error(erro);
  }

  carregarTotal();
}

function renderizarUsuarios(usuarios) {
  lista.innerHTML = "";

  if (usuarios.length === 0) {
    lista.innerHTML = "<li>Nenhum usuário cadastrado.</li>";
    return;
  }

  usuarios.forEach((usuario) => {
    const li = document.createElement("li");

    li.textContent = `${usuario.nome} - ${usuario.idade} anos`;

    lista.appendChild(li);
  });
}

async function carregarTotal() {
  try {
    const resposta = await fetch("/api/usuarios/total");

    const dados = await resposta.json();

    total.textContent = `Total de usuários: ${dados.total}`;
  } catch (erro) {
    total.textContent = "Erro ao carregar total de usuários.";
    total.style.color = "red";
    console.error(erro);
  }
}
