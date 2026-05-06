import { BuscarTodasTurmas, AtualizarTurma, CriarTurma, DeletarTurma } from "../models/turmasModel.js";

export const GetTurmas = async (req, res) => {
    try {
        const turmas = await BuscarTodasTurmas();
        res.json(turmas);
    }
    catch (error) {
        console.error("Erro ao buscar turmas:", error);
        res.status(500).json({ error: "Erro ao buscar turmas" });
    }
};

export const PostTurma = async (req, res) => {
    const { nome, ano_letivo, professor_id } = req.body;
    try {
        const result = await CriarTurma(nome, ano_letivo, professor_id);
        res.status(201).json({ message: "Turma criada com sucesso", id: result.insertId });
    }
    catch (error) {
        console.error("Erro ao criar turma:", error);
        res.status(500).json({ error: "Erro ao criar turma" });
    }
};

export const DeleteTurma = async (req, res) => {
    const { id } = req.params;
    try {
        await DeletarTurma(id);
        res.json({ message: "Turma deletada com sucesso" });
    }
    catch (error) {
        console.error("Erro ao deletar turma:", error);
        res.status(500).json({ error: "Erro ao deletar turma" });
    }
};

export const PutTurma = async (req, res) => {
    const { id } = req.params;
    const { nome, ano_letivo, professor_id } = req.body;
    try {
        await AtualizarTurma(id, nome, ano_letivo, professor_id);
        res.json({ message: "Turma atualizada com sucesso" });
    }
    catch (error) {
        console.error("Erro ao atualizar turma:", error);
        res.status(500).json({ error: "Erro ao atualizar turma" });
    }
};