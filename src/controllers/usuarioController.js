// controllers/usuarioController.js
import { buscarTodosUsuarios, criarUsuario, atualizarUsuario, deletarUsuario } from "../models/usuarioModel.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await buscarTodosUsuarios();

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);

    return res.status(500).json({
      mensagem: "Erro ao listar usuários",
      erro: error.message,
    });
  }
};

export const criarUsuarioController = async (req, res) => {
  const { nome, email, senha, perfil } = req.body;
  try {
    const result = await criarUsuario(nome, email, senha, perfil);

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return res.status(500).json({
      mensagem: "Erro ao criar usuário",
      erro: error.message,
    });
  }
};

export const atualizarUsuarioController = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, perfil } = req.body;
  try {
    await atualizarUsuario(id, nome, email, senha, perfil);
    return res.status(200).json({
      mensagem: "Usuário atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);

    return res.status(500).json({
      mensagem: "Erro ao atualizar usuário",
      erro: error.message,
    });
  }
};

export const deletarUsuarioController = async (req, res) => {
  const { id } = req.params;
  try {
    await deletarUsuario(id);
    return res.status(200).json({
      mensagem: "Usuário deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);

    return res.status(500).json({
      mensagem: "Erro ao deletar usuário",
      erro: error.message,
    });
  }
};
