const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {

  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;

  const usuario = {
    nome,
    idade: Number(idade)
  };

  try {

    const resposta = await fetch("/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.erro || "Erro ao cadastrar usuário");
    }

    // CORRIGIDO: era dados.nome — o retorno da API é { mensagem, usuario }
    mensagem.textContent = `Usuário "${dados.usuario.nome}" cadastrado com sucesso!`;
    mensagem.className = "mensagem sucesso";

    form.reset();

  } catch (erro) {

    mensagem.textContent = erro.message || "Erro ao cadastrar usuário.";
    mensagem.className = "mensagem erro";

    console.error(erro);

  }

});