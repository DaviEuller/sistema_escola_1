import { buscarAlunos, buscarAlunoPorId, criarAluno, atualizarAluno, deletarAluno } from '../models/alunosModel.js';

export const ListarAlunos = async (req, res) => {
    try {
        const alunos = await buscarAlunos();
        res.json(alunos);
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        res.status(500).json({ error: "Erro ao buscar alunos" });
    }
};

export const CriarAluno = async (req, res) => {
    const { nome, cpf, email, telefone, data_nascimento, turma_id } = req.body;
    try {
        const result = await criarAluno(nome, cpf, email, telefone, data_nascimento, turma_id);
        res.status(201).json({ message: "Aluno criado com sucesso", id: result.insertId });
    } catch (error) {
        console.error("Erro ao criar aluno:", error);
        res.status(500).json({ error: "Erro ao criar aluno" });
    }
};

export const DeletarAluno = async (req, res) => {
    const { id } = req.params;
    try {
        await deletarAluno(id);
        res.json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar aluno:", error);
        res.status(500).json({ error: "Erro ao deletar aluno" });
    }
};

export const EditarAluno = async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, telefone, data_nascimento, turma_id } = req.body;
    try {
        await atualizarAluno(id, nome, cpf, email, telefone, data_nascimento, turma_id);
        res.json({ message: "Aluno atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar aluno:", error);
        res.status(500).json({ error: "Erro ao atualizar aluno" });
    }
};

export const BuscarAlunoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await buscarAlunoPorId(id);
        if (aluno) {
            res.json(aluno);
        } else {
            res.status(404).json({ error: "Aluno não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        res.status(500).json({ error: "Erro ao buscar aluno" });
    }
};