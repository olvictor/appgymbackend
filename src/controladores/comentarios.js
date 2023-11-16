const knex = require("../conectiondatabase/connectDB");

const criarComentario = async (req, res) => {
  const { id } = req.usuario;
  const { post_id, comentario } = req.body;

  try {
    const postExistente = await knex("comentarios")
      .select("*")
      .where({ id: post_id })
      .first();
    if (!postExistente) {
      return res.status(400).json({ mensagem: "Post não encontrado." });
    }
    const cadastrarPost = await knex("comentarios").insert({
      usuario_id: id,
      post_id,
      comentario,
    });

    return res.status(201).json({});
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor ." });
  }
};

const buscarComentarios = async (req, res) => {
  const { post_id } = req.params;
  try {
    const postExistente = await knex("comentarios")
      .select("*")
      .where({ id: post_id })
      .first();
    if (!postExistente) {
      return res.status(400).json({ mensagem: "Post não encontrado." });
    }

    const comentarios = await knex("comentarios")
      .select("*")
      .where({ post_id });

    return res.status(200).json(comentarios);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor ." });
  }
};

module.exports = {
  criarComentario,
  buscarComentarios,
};
