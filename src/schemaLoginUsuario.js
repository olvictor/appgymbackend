const joi = require("joi");

const schemaLoginUsuario = joi.object({
  username: joi.string().required().messages({
    "any.required": "O campo username é obrigatório",
    "string.base": "O campo username precisa ser do tipo string",
  }),
  senha: joi.string().required().min(3).messages({
    "any.required": "O campo senha é obrigatório",
    "string.base": "O campo senha precisa ser do tipo string",
    "string.min": "O campo senha precisa conter pelo menos 3 caracteres",
  }),
});

module.exports = schemaLoginUsuario;
