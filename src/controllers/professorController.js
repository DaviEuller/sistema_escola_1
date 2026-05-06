import { Buscartodosprofessores, Criarprofessor, Deletarprofessor, Atualizarprofessor } from "../models/professorModel.js";

export const Listarprofessores = async (req, res) => {
    try {
        const professores = await Buscartodosprofessores();
        res.json(professores);
    }
    catch (error) {
        console.error("Erro ao buscar professores:", error);
        res.status(500).json({ error: "Erro ao buscar professores" });
    }
};

export const Criarprofessores = async (req, res) => {
    const { nome, email, telefone, especialidade } = req.body;
    try {
        const result = await Criarprofessor(nome, email, telefone, especialidade);
        res.status(201).json({ message: "Professor criado com sucesso", id: result.insertId });
    }
    catch (error) {
        console.error("Erro ao criar professor:", error);
        res.status(500).json({ error: "Erro ao criar professor" });
    }
};

export const Deletarprofessores = async (req, res) => {
    const { id } = req.params;
    try {
        await Deletarprofessor(id);
        res.json({ message: "Professor deletado com sucesso" });
    }
    catch (error) {
        console.error("Erro ao deletar professor:", error);
        res.status(500).json({ error: "Erro ao deletar professor" });
    }
};

export const Atualizarprofessores = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, especialidade } = req.body;

    try {
        await Atualizarprofessor(id, nome, email, telefone, especialidade);
        res.json({ message: "Professor atualizado com sucesso" });
    }
    catch (error) {
        console.error("Erro ao atualizar professor:", error);
        res.status(500).json({ error: "Erro ao atualizar professor" });
    }
};