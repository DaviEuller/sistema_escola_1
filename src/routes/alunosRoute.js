import { Router } from "express";
import { ListarAlunos, CriarAluno, DeletarAluno, EditarAluno, BuscarAlunoPorId } from "../controllers/alunosController.js";
import { verificarToken } from "../middlewares/authmiddlewares.js";

const router = Router();

/**
 * @swagger
 * /alunos:
 *   get:
 *     tags:
 *       - Alunos
 *     summary: Listar todos os alunos
 *     description: Retorna a lista de todos os alunos com LEFT JOIN na tabela de turmas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
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
 *                     example: Ana Paula
 *                   cpf:
 *                     type: string
 *                     example: 123.456.789-00
 *                   email:
 *                     type: string
 *                     example: ana@email.com
 *                   telefone:
 *                     type: string
 *                     example: 11999999999
 *                   data_nascimento:
 *                     type: string
 *                     example: 2005-03-15
 *                   status:
 *                     type: string
 *                     example: ativo
 *                   turma:
 *                     type: string
 *                     example: 1º Ano A
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao buscar alunos
 */
router.get("/", verificarToken, ListarAlunos);

/**
 * @swagger
 * /alunos:
 *   post:
 *     tags:
 *       - Alunos
 *     summary: Cadastrar novo aluno
 *     description: Cria um novo aluno e vincula a uma turma existente
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
 *               - cpf
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Ana Paula
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               email:
 *                 type: string
 *                 example: ana@email.com
 *               telefone:
 *                 type: string
 *                 example: 11999999999
 *               data_nascimento:
 *                 type: string
 *                 example: 2005-03-15
 *               turma_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aluno criado com sucesso
 *                 id:
 *                   type: integer
 *                   example: 10
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao criar aluno
 */
router.post("/", verificarToken, CriarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     tags:
 *       - Alunos
 *     summary: Atualizar aluno
 *     description: Atualiza os dados de um aluno existente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Ana Paula Atualizada
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               email:
 *                 type: string
 *                 example: ana.nova@email.com
 *               telefone:
 *                 type: string
 *                 example: 11988888888
 *               data_nascimento:
 *                 type: string
 *                 example: 2005-03-15
 *               turma_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao atualizar aluno
 */
router.put("/:id", verificarToken, EditarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     tags:
 *       - Alunos
 *     summary: Deletar aluno
 *     description: Remove um aluno do sistema pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno deletado com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       500:
 *         description: Erro ao deletar aluno
 */
router.delete("/:id", verificarToken, DeletarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     tags:
 *       - Alunos
 *     summary: Buscar aluno por ID
 *     description: Retorna os dados de um aluno específico com LEFT JOIN na tabela de turmas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: Ana Paula
 *                 cpf:
 *                   type: string
 *                   example: 123.456.789-00
 *                 turma:
 *                   type: string
 *                   example: 1º Ano A
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro ao buscar aluno
 */
router.get("/:id", verificarToken, BuscarAlunoPorId);

export default router;
