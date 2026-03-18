let usuarios = [];
let proximoId = 1;

function listarUsuarios() {

    return usuarios;

}

function buscarUsuarioPorId(id) {

    return usuarios.find(u => u.id === id);

}

function criarUsuario(nome, idade) {

    if (!nome || nome.trim() === "") {
        throw new Error("Nome é obrigatório");
    }

    const novoUsuario = {
        id: proximoId++,
        nome,
        idade
    };

    usuarios.push(novoUsuario);

    return novoUsuario;
}

function atualizarUsuario(id, nome, idade) {

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return null;
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.idade = idade ?? usuario.idade;

    return usuario;

}

function deletarUsuario(id) {

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return false;
    }

    usuarios.splice(index, 1);

    return true;

}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};