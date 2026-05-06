import { buscarDisciplinas, criarDisciplina, deletarDisciplina, atualizarDisciplina } from '../models/disciplinasModel.js';

export const ListarDisciplinas = async (req, res) => {
    try {
        const disciplinas = await buscarDisciplinas();
        res.json(disciplinas);
    }
    catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        res.status(500).json({ error: "Erro ao buscar disciplinas" });
    }
};

export const CriarDisciplina = async (req, res) => {
    const { nome, carga_horaria } = req.body;
    try {
        const result = await criarDisciplina(nome, carga_horaria);
        res.status(201).json({ message: "Disciplina criada com sucesso", id: result.insertId });
    }
    catch (error) {
        console.error("Erro ao criar disciplina:", error);
        res.status(500).json({ error: "Erro ao criar disciplina" });
    }
};

export const DeletarDisciplina = async (req, res) => {
    const { id } = req.params;
    try {
        await deletarDisciplina(id);
        res.json({ message: "Disciplina deletada com sucesso" });
    }
    catch (error) {
        console.error("Erro ao deletar disciplina:", error);
        res.status(500).json({ error: "Erro ao deletar disciplina" });
    }
};

export const AtualizarDisciplina = async (req, res) => {
    const { id } = req.params;
    const { nome, carga_horaria } = req.body;
    try {
        await atualizarDisciplina(id, nome, carga_horaria);
        res.json({ message: "Disciplina atualizada com sucesso" });
    }
    catch (error) {
        console.error("Erro ao atualizar disciplina:", error);
        res.status(500).json({ error: "Erro ao atualizar disciplina" });
    }
};  