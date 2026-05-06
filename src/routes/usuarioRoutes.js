import { Router } from "express";

import { listarUsuarios, criarUsuarioController, atualizarUsuarioController, deletarUsuarioController } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authmiddlewares.js";

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Listar todos os usuários
 *     description: Retorna a lista de todos os usuários cadastrados no sistema
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: Maria Silva
 *                   email:
 *                     type: string
 *                     example: maria@escola.com
 *                   perfil:
 *                     type: string
 *                     example: admin
 *                   criado_em:
 *                     type: string
 *                     example: 2024-01-01T00:00:00.000Z
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", verificarToken, listarUsuarios);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Criar novo usuário
 *     description: Cadastra um novo usuário no sistema
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Souza
 *               email:
 *                 type: string
 *                 example: joao@escola.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Usuário criado com sucesso
 *                 id:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", verificarToken, criarUsuarioController);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualizar usuário
 *     description: Atualiza os dados de um usuário existente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Atualizado
 *               email:
 *                 type: string
 *                 example: joao.novo@escola.com
 *               senha:
 *                 type: string
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", verificarToken, atualizarUsuarioController);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Deletar usuário
 *     description: Remove um usuário do sistema pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", verificarToken, deletarUsuarioController);

export default router;
