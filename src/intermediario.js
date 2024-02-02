const jwt = require("jsonwebtoken");
const knex = require("../src/conectiondatabase/connectDB");
require("dotenv").config();

const validarUsuario = async (req, res, next) => {
  const { authorization } = req.headers;
  const secret = process.env.SECRET_KEY;

  if (!authorization) {
    return res.status(400).json({ mensagem: "Acesso não autorizado ." });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({ mensagem: "Token inválido ." });
  }

  try {
    const { id } = jwt.verify(token, secret);

    const usuarioLogado = await knex
      .select("*")
      .from("usuarios")
      .where({ id })
      .first();

    if (!usuarioLogado) {
      return res.status(400).json({ mensagem: "Acesso não autorizado ." });
    }

    const { senha: __, ...user } = usuarioLogado;

    req.usuario = user;

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: error });
  }
};
module.exports = {
  validarUsuario,
};
