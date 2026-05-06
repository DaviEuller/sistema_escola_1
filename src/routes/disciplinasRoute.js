import { ListarDisciplinas, CriarDisciplina, DeletarDisciplina, AtualizarDisciplina } from "../controllers/disciplinasController.js";
import { verificarToken } from "../middlewares/authmiddlewares.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     tags:
 *       - Disciplinas
 *     summary: Listar todas as disciplinas
 *     description: Retorna a lista completa de disciplinas cadastradas no sistema
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de disciplinas retornada com sucesso
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
 *                     example: Matemática
 *                   carga_horaria:
 *                     type: integer
 *                     example: 80
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao buscar disciplinas
 */
router.get("/", verificarToken, ListarDisciplinas);

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     tags:
 *       - Disciplinas
 *     summary: Cadastrar nova disciplina
 *     description: Cria uma nova disciplina no sistema com nome e carga horária
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
 *               - carga_horaria
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Matemática
 *               carga_horaria:
 *                 type: integer
 *                 example: 80
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Disciplina criada com sucesso
 *                 id:
 *                   type: integer
 *                   example: 4
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao criar disciplina
 */
router.post("/", verificarToken, CriarDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     tags:
 *       - Disciplinas
 *     summary: Atualizar disciplina
 *     description: Atualiza os dados de uma disciplina existente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da disciplina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Matemática Avançada
 *               carga_horaria:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Disciplina atualizada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao atualizar disciplina
 */
router.put("/:id", verificarToken, AtualizarDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     tags:
 *       - Disciplinas
 *     summary: Deletar disciplina
 *     description: Remove uma disciplina do sistema pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Disciplina deletada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao deletar disciplina
 */
router.delete("/:id", verificarToken, DeletarDisciplina);

export default router;
