const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../conectiondatabase/connectDB')
require('dotenv').config()

const cadastarUsuario = async (req,res) =>{

    const { username,email,senha } = req.body
    
    try {
    const passwordHash = await bcrypt.hash(senha,10)
    
    const usuarioExistente = await knex.select('*').from('usuarios').where({email}).first()
    
    if(usuarioExistente){
        return res.status(400).json({mensagem:'Email já cadastrado .'})
    }

    const result = await knex.insert({username,email,password:passwordHash}).into('usuarios')

    return res.status(201).json({})  

    }
    catch(error){
        return res.status(500).json({message:`Erro interno do servidor : ${error}`})
    }

}


const loginUsuario = async (req,res) =>{
    const { email, senha } = req.body
    
    try {
        
        const usuario = await knex.select('*').from('usuarios').where({email}).first()
        console.log(usuario)
        if(!usuario){
            return res.status(404).json({mensagem:'Usuário ou senha inválidos.'})
        }

        const validarSenha =  await bcrypt.compare(senha, usuario.password)
        
        if(!validarSenha){
            return res.status(404).json({mensagem:'Usuário ou senha inválidos.'})
        }

        const secret = process.env.SECRET_KEY

        const token = jwt.sign({id: usuario.id},secret,{expiresIn: '24h'})
        
        const {password: userSenha, ...user} = usuario
        
        return res.status(200).json({ user,token})
    }
    catch(error){
        return res.status(500).json({message:`Erro interno do servidor : ${error}`})
    }

}

const getUsuario = async (req,res) =>{
    const usuario = req.usuario

    return res.status(200).json(usuario)
}


const cadastrarInfoUsuarios = async (req,res) =>{
    const {id} = req.usuario
    const {peso,altura,idade,sexo} = req.body

    try{
        const cadastrarInfoUsuario = await knex('info_usuarios').insert({altura,peso,idade,sexo,user_id: id}).returning('*')
    
        return res.status(200).json(cadastrarInfoUsuario)
    }
    catch(error){
        console.log(error.message)
        if(error.code === '23505'){
          return res.status(400).json({mensagem:"Informações do usuário já registradas com esse ID."})

        }
          return res.status(500).json({mensagem:"Erro interno do servidor ."})
    }


}

const buscarInfoUsuarios = async (req,res) =>{
    const {id} = req.usuario

    try{
        const buscarInfo = await knex('info_usuarios').select('*').where({user_id: id}).first()
    
        return res.status(200).json(buscarInfo)
    }
    catch(error){
        return res.status(500).json({mensagem:"Erro interno do servidor ."})
         
    }
}

module.exports  = {
    cadastarUsuario,
    loginUsuario,
    getUsuario,
    cadastrarInfoUsuarios,
    buscarInfoUsuarios
}