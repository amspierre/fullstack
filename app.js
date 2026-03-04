const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let usuarios = [];
let proximoId = 1;

//ROTAS
//GETS
app.get('/api/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.get('/api/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if(!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);
});

//POSTS
app.post('/api/usuarios', (req, res) => {

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
    }
    usuarios.push(novoUsuario);

    res.status(201).json({
        mensagem: "Usuário criado com sucesso",
        usuario: novoUsuario
    });
});

//PUTS
app.put('/api/usuarios/:id', (req, res) => {

    const id = Number(req.params.id);
    const { nome, idade } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.idade = idade ?? usuario.idade;

    res.json(usuario);
});

//DELETES
app.delete('/api/usuarios/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    usuarios.splice(index, 1);

    res.status(204).send();
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})