// import express from "express";
// const router = express.Router()

import { Router } from "express";
import { login, registrar } from "../controllers/authController.js";

const router = Router();

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Registrar novo usuário
 *     description: Cria um novo usuário no sistema com nome, email, senha e perfil
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
 *                 example: Maria Silva
 *               email:
 *                 type: string
 *                 example: maria@escola.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *               perfil:
 *                 type: string
 *                 example: admin
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
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/registrar", registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Realizar login
 *     description: Autentica o usuário e retorna um token JWT para uso nas rotas protegidas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@escola.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Login realizado com sucesso
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Email e senha são obrigatórios
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", login);


export default router;
