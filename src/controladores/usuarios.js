const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../conectiondatabase/connectDB");
require("dotenv").config();

const cadastarUsuario = async (req, res) => {
  const { username, email, senha } = req.body;

  try {
    const passwordHash = await bcrypt.hash(senha, 10);

    const usuarioExistente = await knex
      .select("*")
      .from("usuarios")
      .where({ username })
      .first();

    const emailExistente = await knex
      .select("*")
      .from("usuarios")
      .where({ email })
      .first();
    if (usuarioExistente || emailExistente) {
      return res
        .status(400)
        .json({ mensagem: "Email e ou username já cadastrado ." });
    }

    const result = await knex
      .insert({ username, email, senha: passwordHash })
      .into("usuarios")
      .returning("*");

    const { senha: __, ...user } = result[0];

    return res
      .status(201)
      .json({ mensagem: `Usuário cadastrado com sucesso .`, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Erro interno do servidor : ${error}` });
  }
};

const loginUsuario = async (req, res) => {
  const { username, senha } = req.body;

  try {
    const usuario = await knex
      .select("*")
      .from("usuarios")
      .where({ username })
      .first();

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário ou senha inválidos." });
    }

    const validarSenha = await bcrypt.compare(senha, usuario.senha);

    if (!validarSenha) {
      return res.status(404).json({ mensagem: "Usuário ou senha inválidos." });
    }

    const secret = process.env.SECRET_KEY;

    const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: "24h" });

    const { senha: userSenha, ...user } = usuario;

    return res.status(200).json({ user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Erro interno do servidor : ${error.message}` });
  }
};

const getUsuario = async (req, res) => {
  const usuario = req.usuario;

  return res.status(200).json(usuario);
};

const cadastrarInfoUsuarios = async (req, res) => {
  const { id } = req.usuario;
  const {
    nome,
    peso,
    altura,
    idade,
    sexo,
    nivel_de_atividade,
    imc,
    imc_classificacao,
    objetivo,
  } = req.body;

  try {
    const cadastrarInfoUsuario = await knex("usuarios_info")
      .insert({
        nome,
        altura,
        peso,
        idade,
        sexo,
        usuario_id: id,
        nivel_de_atividade,
        imc,
        imc_classificacao,
        objetivo,
      })
      .returning("*");

    return res.status(200).json(cadastrarInfoUsuario);
  } catch (error) {
    console.log(error)
    if (error.code === "23505") {
      return res.status(400).json({
        mensagem: "Informações do usuário já registradas com esse ID.",
      });
    }
    return res.status(500).json({ mensagem: "Erro interno do servidor ." });
  }
};

const buscarInfoUsuarios = async (req, res) => {
  const { id } = req.usuario;

  try {
    const buscarInfo = await knex("usuarios_info")
      .select("*")
      .where({ usuario_id: id })
      .first();
    if (!buscarInfo) {
      return res
        .status(400)
        .json({ mensagem: "Nehuma informação cadastrada para o usuário" });
    }
    return res.status(200).json(buscarInfo);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor ." });
  }
};

module.exports = {
  cadastarUsuario,
  loginUsuario,
  getUsuario,
  cadastrarInfoUsuarios,
  buscarInfoUsuarios,
};
