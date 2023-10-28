const express = require('express');
const { cadastarUsuario, loginUsuario, getUsuario} = require('../controladores/usuarios');
const { validarUsuario } = require('../intermediario');
const schemaCadastroUsuarios = require('../schemaCadastroUsuarios');
const validarCampos = require('../validarCampos');
const schemaLoginUsuario = require('../schemaLoginUsuario');
const multer = require('../multer');
const schemaPostUsuario = require('../schemaPostUsuario');
const { cadastrarPost, buscarPosts } = require('../controladores/posts');
const rotas = express();

rotas.post('/user/cadastrar',validarCampos(schemaCadastroUsuarios), cadastarUsuario)
rotas.post('/user/login',validarCampos(schemaLoginUsuario), loginUsuario)

rotas.use(validarUsuario)

rotas.get('/user/perfil', getUsuario)
rotas.post('/user/post', multer.single('imagem'),validarCampos(schemaPostUsuario),cadastrarPost)
rotas.get('/user/feed',buscarPosts)




module.exports = rotas