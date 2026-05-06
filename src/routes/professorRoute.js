import { Listarprofessores, Criarprofessores, Deletarprofessores, Atualizarprofessores } from "../controllers/professorController.js";
import { verificarToken } from "../middlewares/authmiddlewares.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * /professores:
 *   get:
 *     tags:
 *       - Professores
 *     summary: Listar todos os professores
 *     description: Retorna a lista completa de professores cadastrados no sistema
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores retornada com sucesso
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
 *                     example: Carlos Mendes
 *                   email:
 *                     type: string
 *                     example: carlos@escola.com
 *                   telefone:
 *                     type: string
 *                     example: 11977777777
 *                   especialidade:
 *                     type: string
 *                     example: Matemática
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao buscar professores
 */
router.get("/", verificarToken, Listarprofessores);

/**
 * @swagger
 * /professores:
 *   post:
 *     tags:
 *       - Professores
 *     summary: Cadastrar novo professor
 *     description: Cria um novo professor no sistema
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
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Mendes
 *               email:
 *                 type: string
 *                 example: carlos@escola.com
 *               telefone:
 *                 type: string
 *                 example: 11977777777
 *               especialidade:
 *                 type: string
 *                 example: Matemática
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Professor criado com sucesso
 *                 id:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao criar professor
 */
router.post("/", verificarToken, Criarprofessores);

/**
 * @swagger
 * /professores/{id}:
 *   put:
 *     tags:
 *       - Professores
 *     summary: Atualizar professor
 *     description: Atualiza os dados de um professor existente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Atualizado
 *               email:
 *                 type: string
 *                 example: carlos.novo@escola.com
 *               telefone:
 *                 type: string
 *                 example: 11966666666
 *               especialidade:
 *                 type: string
 *                 example: Física
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao atualizar professor
 */
router.put("/:id", verificarToken, Atualizarprofessores);

/**
 * @swagger
 * /professores/{id}:
 *   delete:
 *     tags:
 *       - Professores
 *     summary: Deletar professor
 *     description: Remove um professor do sistema pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Professor deletado com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao deletar professor
 */
router.delete("/:id", verificarToken, Deletarprofessores);

export default router;
