const s3 = require("../conectionbucket/conectionBucket");
const knex = require("../conectiondatabase/connectDB");

require("dotenv").config();

const cadastrarPost = async (req, res) => {
  const { conteudo } = req.body;
  const imagem = req.file;
  const { id } = req.usuario;
  
  try {
    if (!imagem) {
      return res
        .status(400)
        .json({ mensagem: "O campo imagem é obrigatório ." });
    }

    if (imagem) {
      const imagemUpload = await s3
        .upload({
          Bucket: process.env.BUCKET_NAME,
          Key: `imagens/${imagem.originalname}`,
          Body: imagem.buffer,
          ContentType: imagem.mimetype,
        })
        .promise();

      const postagem = await knex("posts").insert({
        usuario_id: id,
        conteudo,
        imagem_url: imagemUpload.Location,
      }).returning('*');
      return res
        .status(201)
        .json(postagem[0]);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const buscarPosts = async (req, res) => {
  const { id } = req.usuario;

  try {
    const resultado = await knex
      .select("*")
      .from("posts")
      .where({ usuario_id: id });
    if (!resultado) {
      return res.status(200).json({ mensagem: "Nenhum post foi encontrado !" });
    }

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


const deletarPost = async(req,res) =>{
  const {id} = req.params;
  const usuario = req.usuario

  try{
    const postExistente = await knex('posts').where({id}).first()
    
    if(!postExistente){
      return res.status(400).json({mensagem:'Post não encontrado .'})
    }
    if(usuario.id !== postExistente.usuario_id){
      return res.status(400).json({mensagem:'Sem permissão .'})
    }

    const deletarComentariosDaPostagem = await knex('comentarios').where({post_id:id}).del()
    const deletarPostagem = await knex('posts').delete().where({id})

    return res.status(200).json({mensagem:'Post deletado com sucesso .',post_deletado: postExistente})

  }catch(error){
    console.log(error)
    return res.status(500).json(error.message);
  }
}
module.exports = {
  cadastrarPost,
  buscarPosts,
  deletarPost
};
