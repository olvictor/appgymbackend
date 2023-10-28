const s3 = require('../conectionbucket/conectionBucket')
const knex = require('../conectiondatabase/connectDB')

require('dotenv').config()


const cadastrarPost = async (req,res) =>{
   const { conteudo } = req.body
   const {file} = req
   const {id} = req.usuario

    try{
        const imagem = await s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: `imagens/${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype
        }).promise()

        const postagem = await knex('posts').insert({usuario_id: id ,conteudo,imagem_url: imagem.Location})

        return res.status(201).json()
    }catch(error){
        return res.status(500).json(error.message)
    }
}


const buscarPosts = async (req,res) => {
    const {id} = req.usuario;

    try{
     const resultado =  await knex.select('*').from('posts').where({usuario_id:id})
     if(!resultado){
        return res.status(200).json({mensagem:'Nenhum post foi encontrado !'})
     }

     return res.status(200).json(resultado)
    }catch(error){
        return res.status(500).json(error.message) 
    }
}


module.exports = {
    cadastrarPost,
    buscarPosts
}