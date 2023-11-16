const joi = require("joi");

const schemaCadastrarComentario = joi
  .object({
    post_id: joi.required().messages({
      "any.required": "O campo post_id é obrigatório .",
    }),
    comentario: joi.string().required().messages({
      "any.required": "O campo comentario é obrigatório",
      "string.base": "O campo comentario precisa ser uma string .",
    }),
  })
  .unknown(true);

module.exports = schemaCadastrarComentario;
