import { CriarNota, ListarNotas, DeletarNota, AtualizarNota} from "../controllers/NotasController.js";
import { verificarToken } from "../middlewares/authmiddlewares.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * /notas:
 *   get:
 *     tags:
 *       - Notas
 *     summary: Listar todas as notas
 *     description: Retorna todas as notas com INNER JOIN nas tabelas de alunos e disciplinas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas retornada com sucesso
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
 *                   nota:
 *                     type: number
 *                     example: 8.5
 *                   bimestre:
 *                     type: string
 *                     example: 1º Bimestre
 *                   observacao:
 *                     type: string
 *                     example: Bom desempenho
 *                   aluno:
 *                     type: string
 *                     example: Ana Paula
 *                   disciplina:
 *                     type: string
 *                     example: Matemática
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao buscar notas
 */
router.get("/", verificarToken, ListarNotas);

/**
 * @swagger
 * /notas:
 *   post:
 *     tags:
 *       - Notas
 *     summary: Cadastrar nova nota
 *     description: Registra uma nota para um aluno em uma disciplina em um bimestre específico
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - disciplina_id
 *               - nota
 *               - bimestre
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 example: 1
 *               disciplina_id:
 *                 type: integer
 *                 example: 2
 *               nota:
 *                 type: number
 *                 example: 8.5
 *               bimestre:
 *                 type: string
 *                 example: 1º Bimestre
 *               observacao:
 *                 type: string
 *                 example: Bom desempenho
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nota criada com sucesso
 *                 id:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: aluno_id, disciplina_id, nota e bimestre são obrigatórios
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao criar nota
 */
router.post("/", verificarToken, CriarNota);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     tags:
 *       - Notas
 *     summary: Atualizar nota
 *     description: Atualiza os dados de uma nota existente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - disciplina_id
 *               - nota
 *               - bimestre
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 example: 1
 *               disciplina_id:
 *                 type: integer
 *                 example: 2
 *               nota:
 *                 type: number
 *                 example: 9.0
 *               bimestre:
 *                 type: string
 *                 example: 1º Bimestre
 *               observacao:
 *                 type: string
 *                 example: Excelente
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao atualizar nota
 */
router.put("/:id", verificarToken, AtualizarNota);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     tags:
 *       - Notas
 *     summary: Deletar nota
 *     description: Remove uma nota do sistema pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota deletada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao deletar nota
 */
router.delete("/:id", verificarToken, DeletarNota);

export default router;
