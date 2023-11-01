const joi = require('joi');

const validarCampos = schema => async (req,res,next) =>{
    try{
        await schema.validateAsync(req.body)
        
        next()
    }catch(error){
        return res.status(500).json(error.message)
    }


}


module.exports  = validarCampos