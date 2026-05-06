import { PostTurma, GetTurmas, DeleteTurma, PutTurma } from "../controllers/turmasController.js";
import { verificarToken } from "../middlewares/authmiddlewares.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Gerenciamento de turmas
 */

/**
 * @swagger
 * /turmas:
 *   get:
 *     tags:
 *       - Turmas
 *     summary: Listar todas as turmas
 *     description: Retorna todas as turmas com LEFT JOIN nos professores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso
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
 *                     example: "Turma A"
 *                   ano_letivo:
 *                     type: integer
 *                     example: 2025
 *                   professor_id:
 *                     type: integer
 *                     example: 2
 *                   professor:
 *                     type: string
 *                     example: "João Silva"
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao buscar turmas
 */
router.get("/", verificarToken, GetTurmas);

/**
 * @swagger
 * /turmas:
 *   post:
 *     tags:
 *       - Turmas
 *     summary: Criar nova turma
 *     description: Cria uma nova turma vinculada a um professor (opcional)
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
 *               - ano_letivo
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Turma B"
 *               ano_letivo:
 *                 type: integer
 *                 example: 2025
 *               professor_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Turma criada com sucesso
 *                 id:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: nome e ano_letivo são obrigatórios
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao criar turma
 */
router.post("/", verificarToken, PostTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     tags:
 *       - Turmas
 *     summary: Atualizar turma
 *     description: Atualiza os dados de uma turma pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - ano_letivo
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Turma Atualizada"
 *               ano_letivo:
 *                 type: integer
 *                 example: 2026
 *               professor_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao atualizar turma
 */
router.put("/:id", verificarToken, PutTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   delete:
 *     tags:
 *       - Turmas
 *     summary: Deletar turma
 *     description: Remove uma turma do sistema pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Turma deletada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao deletar turma
 */
router.delete("/:id", verificarToken, DeleteTurma);

export default router;