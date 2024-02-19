const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../conectiondatabase/connectDB");
const s3 = require("../conectionbucket/conectionBucket");
const { equal } = require("joi");

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
    if (error.code === "23505") {
      return res.status(400).json({
        mensagem: "Informações do usuário já registradas com esse ID.",
      });
    }
    return res.status(500).json({ mensagem: "Erro interno do servidor ." });
  }
};

const editarInfoUsuario = async(req,res) =>{
  const {id} = req.usuario
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

  try{
    const verificarInfoExistente = await knex('usuarios_info').select('*').where({usuario_id: id}).first()
    
    if(!verificarInfoExistente){
     return res.status(400).json({Mensagem: 'Nenhuma informação encontrada para o usuário .'})
    }

   const editarInfo = await knex('usuarios_info').where({usuario_id: id}).update({
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

    return res.status(200).json(editarInfo)

  }catch(error){
    return res.status(500).json({ mensagem: error.message });
  }

}

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

const alterarFotoUsuario = async (req,res)=>{
  const { id } = req.usuario;
  const imagem = req.file
  try{
    const usuario = await knex('usuarios').select('id','username').where({id}).first()

    if(!usuario){
     return res.status(400).json({ mensagem:'Usuário não encontrado'});
    }
    if(imagem){
      const imagemUpload = await s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: `imagens/usuario-perfil${id}/${imagem.originalname}`,
        Body: imagem.buffer,
        ContentType: imagem.mimetype,
      })
      .promise();
  
      const updateFotoPerfil = await knex('usuarios').where({id}).update({user_photo: imagemUpload.Location})

      return res.status(200).json({...usuario,user_photo: imagemUpload.Location})
    }
  }catch(error){
    return res.status(500).json({ mensagem:error.message});
  }
}

module.exports = {
  cadastarUsuario,
  loginUsuario,
  getUsuario,
  cadastrarInfoUsuarios,
  buscarInfoUsuarios,
  alterarFotoUsuario,
  editarInfoUsuario
};
