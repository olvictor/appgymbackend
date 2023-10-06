const express = require('express');
const { cadastarUsuario, loginUsuario} = require('../controladores/usuarios');
const { validarUsuario } = require('../intermediario');
const rotas = express();

rotas.post('/user/cadastrar', cadastarUsuario)
rotas.post('/user/login', loginUsuario)

rotas.use(validarUsuario)
rotas.get('/user/perfil', (req, res)=>{
    res.send('sakopas')
})



module.exports = rotas