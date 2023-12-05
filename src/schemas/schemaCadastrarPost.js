const joi = require("joi");

const schemaPostUsuario = joi
  .object({
    conteudo: joi.string().required().messages({
      "string.base": "O campo conteudo precisa ser uma string .",
      "string.empty": "O campo conteudo é obrigatório .",
      "any.required": "O campo conteudo é obrigatório .",
    }),
  })
  .unknown(true);

module.exports = schemaPostUsuario;
