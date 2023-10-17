const joi = require('joi')


const schemaPostUsuario = joi.object({
    conteudo : joi.string().required().messages({
        'string.base':'O campo username precisa ser uma string',
        'string.empty': "O campo senha é obrigatório",
        'any.required' : 'O campo conteudo é obrigatório',
    })

})

module.exports = schemaPostUsuario