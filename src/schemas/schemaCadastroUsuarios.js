const joi = require('joi')


const schemaUsuario = joi.object({
    username: joi.string().required().messages({
        'any.required': "O campo username é obrigatório",
        'string.base':'O campo username precisa ser uma string',
        'string.empty': "O campo username é obrigatório"
    }),
    senha: joi.string().required().min(3).messages({
        'any.required': "O campo senha é obrigatório",
        'string.base':'O campo senha precisa ser uma string',
        'string.empty': "O campo senha é obrigatório",
        'string.min': "O campo senha precisa ser maior que 2 caracteres"
        }),
})

module.exports = schemaUsuario