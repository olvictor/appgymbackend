const express = require("express");
const { cadastarUsuario ,loginUsuario ,getUsuario ,cadastrarInfoUsuarios ,buscarInfoUsuarios, alterarFotoUsuario, editarInfoUsuario} = require("../controladores/usuarios");
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
const { registrarTreino, buscarTreino, buscarTiposDeTreino } = require("../controladores/treinos");
const { cadastrarMetas, buscarMetas } = require("../controladores/metas");
const { cadastrarTreinoSemanal, buscarTreinoSemanal } = require("../controladores/treino_semanal");
const rotas = express();

rotas.post("/user/cadastrar",validarCampos(schemaCadastroUsuarios),cadastarUsuario);
rotas.post("/user/login", validarCampos(schemaLoginUsuario), loginUsuario);

rotas.use(validarUsuario);

rotas.get("/user/perfil", getUsuario);

rotas.post("/user/post",multer.single("imagem"),validarCampos(schemaCadastrarPost),cadastrarPost);
rotas.delete("/user/post/:id",deletarPost);
rotas.post("/user/photo",multer.single("imagem"),alterarFotoUsuario);


rotas.get("/user/feed", buscarPosts);

rotas.post("/user/info",validarCampos(schemaInfoUsuario),cadastrarInfoUsuarios);
rotas.get("/user/info", buscarInfoUsuarios);
rotas.put("/user/info", editarInfoUsuario);


rotas.post("/user/treinos",registrarTreino);
rotas.get("/user/treinos",buscarTreino);

rotas.post("/comentarios",validarCampos(schemaCadastrarComentario),criarComentario);
rotas.get("/comentarios/:post_id", buscarComentarios);


rotas.post("/user/metas",cadastrarMetas);
rotas.get("/user/metas",buscarMetas);


rotas.post("/user/treino_semanal",cadastrarTreinoSemanal);
rotas.get("/user/treino_semanal",buscarTreinoSemanal);

rotas.get("/tipo_de_treino",buscarTiposDeTreino)

module.exports = rotas;
