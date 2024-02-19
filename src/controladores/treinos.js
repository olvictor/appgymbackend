const knex = require("../conectiondatabase/connectDB")


const registrarTreino = async (req,res) =>{
    const { musculos } = req.body
    const { id } = req.usuario
    try{
     const registrarTreino = await knex.insert({musculos: musculos.toString(),usuario_id: id}).into('usuarios_registro_treinos').returning('*')
     
     return res.status(201).json(registrarTreino)

    }catch(error){
       return res.status(500).json({mensagem:error})
    }  
}

const buscarTreino = async (req,res) =>{
    const { id } = req.usuario

    try{
      const treinosDoUsuario = await knex('usuarios_registro_treinos').select('*').where({usuario_id: id})
      return res.status(200).json(treinosDoUsuario)
    }catch(error){
      return res.status(500).json({mensagem:error})
    }
}
const editarTreino = async (req,res)=> {
    const { id: usuario_id } = req.usuario
    const { id } = req.params;
    const { musculos } = req.body
    const { data } = req.body

    try{
      const treinoExistente = await knex('usuarios_registro_treinos').where({id,usuario_id}).select('*').returning('*').first()
      if(!treinoExistente){
        return res.status(400).json({mensagem:'Treino não encontrado.'})
      }
      const editarTreino = await knex('usuarios_registro_treinos').update({musculos: musculos.toString(), data_publicacao:data}).where({id,usuario_id})
      return res.status(200).json(editarTreino)

    }catch(error){
      return res.status(500).json({mensagem:error})
    }
}

const buscarTiposDeTreino = async(req,res)=>{
  try{

    const treinos = await knex('tipos_de_treinos').select('*');

    return res.status(200).json(treinos)

  }catch(error){
    return res.status(500).json({mensagem:error})
  }
}


module.exports = {
    registrarTreino,
    buscarTreino,
    buscarTiposDeTreino,
    editarTreino
}