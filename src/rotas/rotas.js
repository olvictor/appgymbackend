const express = require("express");
const { cadastarUsuario ,loginUsuario ,getUsuario ,cadastrarInfoUsuarios ,buscarInfoUsuarios} = require("../controladores/usuarios");
const { validarUsuario } = require("../intermediario");
const schemaCadastroUsuarios = require("../schemas/schemaCadastroUsuarios");
const validarCampos = require("../validarCampos");
const schemaLoginUsuario = require("../schemas/schemaLoginUsuario");
const multer = require("../multer");
const { cadastrarPost, buscarPosts, deletarPost } = require("../controladores/posts");
const schemaInfoUsuario = require("../schemas/schemaInfoUsuario");
const { criarComentario ,buscarComentarios } = require("../controladores/comentarios");
const schemaCadastrarPost = require("../schemas/schemaCadastrarPost");
const schemaCadastrarComentario = require("../schemas/schemaCadastrarComentario");
const { registrarTreino, buscarTreino } = require("../controladores/treinos");
const { cadastrarMetas, buscarMetas } = require("../controladores/metas");
const rotas = express();

rotas.post("/user/cadastrar",validarCampos(schemaCadastroUsuarios),cadastarUsuario);
rotas.post("/user/login", validarCampos(schemaLoginUsuario), loginUsuario);

rotas.use(validarUsuario);

rotas.get("/user/perfil", getUsuario);

rotas.post("/user/post",multer.single("imagem"),validarCampos(schemaCadastrarPost),cadastrarPost);
rotas.delete("/user/post/:id",deletarPost);


rotas.get("/user/feed", buscarPosts);

rotas.post("/user/info",validarCampos(schemaInfoUsuario),cadastrarInfoUsuarios);
rotas.get("/user/info", buscarInfoUsuarios);

rotas.post("/user/treinos",registrarTreino)
rotas.get("/user/treinos",buscarTreino)

rotas.post("/comentarios",validarCampos(schemaCadastrarComentario),criarComentario);
rotas.get("/comentarios/:post_id", buscarComentarios);


rotas.post("/user/metas",cadastrarMetas);
rotas.get("/user/metas",buscarMetas);



module.exports = rotas;
