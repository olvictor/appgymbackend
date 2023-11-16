const express = require("express");
const {
  cadastarUsuario,
  loginUsuario,
  getUsuario,
  cadastrarInfoUsuarios,
  buscarInfoUsuarios,
} = require("../controladores/usuarios");
const { validarUsuario } = require("../intermediario");
const schemaCadastroUsuarios = require("../schemaCadastroUsuarios");
const validarCampos = require("../validarCampos");
const schemaLoginUsuario = require("../schemaLoginUsuario");
const multer = require("../multer");
const schemaPostUsuario = require("../schemaCadastrarPost");
const { cadastrarPost, buscarPosts } = require("../controladores/posts");
const schemaInfoUsuario = require("../schemaInfoUsuario");
const {
  criarComentario,
  buscarComentarios,
} = require("../controladores/comentarios");
const schemaCadastrarPost = require("../schemaCadastrarComentario");
const schemaCadastrarComentario = require("../schemaCadastrarComentario");
const rotas = express();

rotas.post(
  "/user/cadastrar",
  validarCampos(schemaCadastroUsuarios),
  cadastarUsuario
);
rotas.post("/user/login", validarCampos(schemaLoginUsuario), loginUsuario);

rotas.use(validarUsuario);

rotas.get("/user/perfil", getUsuario);

rotas.post(
  "/user/post",
  multer.single("imagem"),
  validarCampos(schemaPostUsuario),
  cadastrarPost
);

rotas.get("/user/feed", buscarPosts);

rotas.post(
  "/user/info",
  validarCampos(schemaInfoUsuario),
  cadastrarInfoUsuarios
);
rotas.get("/user/info", buscarInfoUsuarios);

rotas.post(
  "/comentarios",
  validarCampos(schemaCadastrarComentario),
  criarComentario
);
rotas.get("/comentarios/:post_id", buscarComentarios);

module.exports = rotas;
