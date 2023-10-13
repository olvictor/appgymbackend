const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../conectiondatabase/connectDB')
require('dotenv').config()

const cadastarUsuario = async (req,res) =>{

    const { username,email,senha } = req.body


    if(!username || !email || !senha){
        return res.status(400).json({message:'O username , email e senha são obrigatórios.'})
    }

    const passwordHash = await bcrypt.hash(senha,10)

    try {
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

    if(!email || !senha){
        return res.status(400).json({message:'O email e senha são obrigatórios.'})
    }
    
    try {
        
        const usuario = await knex.select('*').from('usuarios').where({email}).first()
    

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

module.exports  = {
    cadastarUsuario,
    loginUsuario,
    getUsuario
}