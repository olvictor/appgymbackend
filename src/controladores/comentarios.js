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

    const comentarios = await knex.raw(`SELECT 
    comentarios.id,
    comentarios.comentario,
    comentarios.usuario_id,
    comentarios.post_id,
    comentarios.data_comentario,
    usuarios.id as usuario_id,
    usuarios.username as usuario_username,
    usuarios.email as usuario_email,
    usuarios.user_photo as  usuario_photo
    FROM comentarios JOIN usuarios ON comentarios.usuario_id = usuarios.id WHERE post_id = 3
    `);

    return res.status(200).json(comentarios.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor ." });
  }
};

module.exports = {
  criarComentario,
  buscarComentarios,
};
