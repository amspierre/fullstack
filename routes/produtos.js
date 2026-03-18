const express = require('express');
const router = express.Router();

let produtos = [];
let proximoId = 1;

//GET - listar todos os produtos
router.get("/", (req, res) => {
    res.status(200).json(produtos);
});

//GET - buscar por id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            erro: "Produto não encontrado"
        });
    }

    res.json(produto);
});

//POST - criar produto
router.post("/", (req, res) => {

    const {nome , preco } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        });
    }

    const novoProduto = {
        id: proximoId++,
        nome,
        preco
    };

    usuarios.push(novoProduto);

    res.status(201).json({
        mensagem: "Produto criado com sucesso",
        produto: novoProduto
    });
});

//PUT - atualizar produto
router.put("/:id", (req, res) => {
    
    const id = Number(req.params.id);
    const {nome , preco } = req.body;

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            erro: "Produto não encontrado"
        });
    }

    produto.nome = nome || produto.nome;
    produto.preco = preco || produto.preco;

    res.json(produto);

});

//DELETE - excluir produto
router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Produto não encontrado"
        });
    }

    usuarios.splice(index, 1);

    res.status(204).send();

});

module.exports = router;