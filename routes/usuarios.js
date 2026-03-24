const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

router.get("/", usuariosController.listarUsuarios);

router.post("/", usuariosController.criarUsuario);

router.get("/total", usuariosController.listarTotal);

router.put("/:id", usuariosController.atualizarUsuario);

router.delete("/:id", usuariosController.deletarUsuario);

router.get("/:id", usuariosController.buscarUsuario);

module.exports = router;
