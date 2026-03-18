let usuarios = [];
let proximoId = 1;

function listarUsuarios(req, res) {

    res.status(200).json(usuarios);

}

function buscarUsuario(req, res) {

    const id = Number(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);

}

function criarUsuario(req, res) {

    const { nome, idade } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        });
    }

    const novoUsuario = {
        id: proximoId++,
        nome,
        idade
    };

    usuarios.push(novoUsuario);

    res.status(201).json({
        mensagem: "Usuário criado com sucesso",
        usuario: novoUsuario
    });

}

function atualizarUsuario(req, res) {

    const id = Number(req.params.id);
    const { nome, idade } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.idade = idade ?? usuario.idade;

    res.json(usuario);

}

function deletarUsuario(req, res) {

    const id = Number(req.params.id);

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    usuarios.splice(index, 1);

    res.status(204).send();

}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};