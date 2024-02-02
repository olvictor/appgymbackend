const knex = require("../conectiondatabase/connectDB")

const cadastrarMetas = async( req,res )=>{
    const{ titulo, descricao, data_inicio, data_fim} = req.body
    const { id } = req.usuario
    try{
      const cadastrarMeta = await knex('usuarios_metas').insert({usuario_id:id, titulo,descricao,data_inicio,data_fim}).returning('*')
      console.log(cadastrarMeta)
      return res.status(201).json({
      })
    }catch(error){
      return res.status(500).json({mensagem: error.message})
    }


}

const buscarMetas = async(req,res)=>{
    const {id} = req.usuario
    try{
      const buscarMeta = await knex("usuarios_metas").select('*').where({usuario_id: id})

      return res.status(200).json(buscarMeta)
    }catch(error){
      return res.status(500).json({mensagem: error.message})
    }
}
module.exports = {
    cadastrarMetas,
    buscarMetas
}