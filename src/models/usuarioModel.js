// models/usuarioModel.js
import conexao from "../config/db.js";

export const buscarTodosUsuarios = async () => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [usuarios] = await conn.query(`
      SELECT id, nome, email, perfil, criado_em
      FROM usuarios
    `);

    return usuarios;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const criarUsuario = async (nome, email, senha, perfil) => {
  let conn;

  try {
    conn = await conexao.getConnection(); 

    const [result] = await conn.query(`
      INSERT INTO usuarios (nome, email, senha, perfil)
      VALUES (?, ?, ?, ?)
    `, [nome, email, senha, perfil]);

    return result;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  } 
};

export const deletarUsuario = async (id) => {
  let conn;
  
  try {
    conn = await conexao.getConnection();
    const [result] = await conn.query(`
      DELETE FROM usuarios WHERE id = ?
    `, [id]);
    return result;
  } 
  catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  } 
}

export const atualizarUsuario = async (id, nome, email, senha, perfil) => {
  let conn;

  try {
    conn = await conexao.getConnection();
    const [result] = await conn.query(`
      UPDATE usuarios
      SET nome = ?, email = ?, senha = ?, perfil = ?
      WHERE id = ?
    `, [nome, email, senha, perfil, id]);
    return result;
  }
  catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};
  