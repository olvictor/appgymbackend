const knex = require("../conectiondatabase/connectDB");

const cadastrarTreinoSemanal =async (req,res)=>{
    const {dia_da_semana,musculos} = req.body
    const {id} = req.usuario
    console.log(dia_da_semana,musculos)
    try{
        
        const treinoRegistradoNoDia = await knex('usuarios_treino_semanal').select('*').where({dia_da_semana:dia_da_semana, usuario_id:id}).first()
        console.log(treinoRegistradoNoDia)
        if(treinoRegistradoNoDia){
           const inserirTreino = await knex('usuarios_treino_semanal').update({treino:musculos}).where({usuario_id:id, dia_da_semana}).returning('*')
           return res.status(200).json({mensangem:'Treino atualizado com sucesso.'})
        }
        const inserirTreino = await knex('usuarios_treino_semanal').insert({usuario_id:id, treino:musculos, dia_da_semana}).returning('*')
        
        return res.status(201).json({mensagem:'Treino registrado com sucesso.'})

    }catch(error){
       console.log(error)
       return res.status(500).json({mensangem:error.message})
    }
}



module.exports = {
    cadastrarTreinoSemanal
}