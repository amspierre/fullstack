const express = require("express");
const router = express.Router();

let usuarios = [];
let proximoId = 1;

// GET - listar todos
router.get("/", (req, res) => {
  res.status(200).json(usuarios);
});

// GET - buscar por id
router.get("/:id", (req, res) => {

  const id = Number(req.params.id);

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado"
    });
  }

  res.json(usuario);

});

// POST - criar usuário
router.post("/", (req, res) => {

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

});

// PUT - atualizar usuário
router.put("/:id", (req, res) => {

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

});

// DELETE - deletar usuário
router.delete("/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      erro: "Usuário não encontrado"
    });
  }

  usuarios.splice(index, 1);

  res.status(204).send();

});

module.exports = router;