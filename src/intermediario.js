const jwt = require('jsonwebtoken')
const pool = require('../src/conectiondatabase/connectDB')
require('dotenv').config()


const validarUsuario = async (req,res) =>{

        const { authorization } = req.headers
        const secret = process.env.SECRET_KEY
        
        if(!authorization){
            return res.status(400).json({mensagem:'Acesso não autorizado .'})
        }

        const token = authorization.split(' ')[1]
        
        if(!token){
            return res.status(400).json({mensagem:'Token inválido .'})
        }
        try{
            const { id } = jwt.verify(token,secret)
            
            const usuarioLogado = await pool.query('SELECT * FROM usuarios WHERE id = $1',[id])

            if(usuarioLogado.rowCount <= 0){
                return res.status(400).json({mensagem:'Acesso não autorizado .'})
            }

            const { password: __, ...user} = usuarioLogado.rows[0]

            req.usuario = user
            
            next()
        }
        catch(error){
            return res.status(500).json({mensagem:error})
        }
}
module.exports = {
    validarUsuario
}