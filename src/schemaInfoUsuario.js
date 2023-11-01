const joi = require('joi')


const schemaInfoUsuario = joi.object({
    peso: joi.number().required().messages({
        "any.required" : "O campo peso é obrigatório .",
        "number.base" : "O campo peso precisa ser um número ."

    }),
    altura: joi.number().required().messages({
        "any.required" : "O campo altura é obrigatório .",
        "number.base" : "O campo altura precisa ser um número ."
    }),
    sexo: joi.string().required().messages({
        "any.required" : "O campo sexo é obrigatório .",
        "string.base": "O campo sexto precisa ser uma string ."
    }),
    idade: joi.number().required().messages({
        "any.required" : "O campo idade é obrigatório .",
        "number.base" : "O campo idade precisa ser um número ."
    })
})


module.exports = schemaInfoUsuario