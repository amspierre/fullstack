async function carregarUsuarios() {
    const resposta = await fetch('/api/usuarios');
    const usuarios = await resposta.json();

    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";

    usuarios.forEach(usuario => {
        const li = document.createElement("li");
        li.textContent = usuario.nome;
        lista.appendChild(li);
    });
}

carregarUsuarios();