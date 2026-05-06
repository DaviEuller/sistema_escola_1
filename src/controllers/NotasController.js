import { criarNota, buscarNotas,deletarNota,atualizarNota } from "../models/notasModel.js";
    
export const CriarNota = async (req, res) => {
    const { aluno_id, disciplina_id, nota, bimestre, observacao } = req.body;
    try {
        const result = await criarNota(aluno_id, disciplina_id, nota, bimestre, observacao);
        res.status(201).json({ message: "Nota criada com sucesso", id: result.insertId });
    }
    catch (error) {
        console.error("Erro ao criar nota:", error);
        res.status(500).json({ error: "Erro ao criar nota" });
    }
};

export const ListarNotas = async (req, res) => {
    try {
        const notas = await buscarNotas();
        res.json(notas);
    }
    catch (error) {
        console.error("Erro ao buscar notas:", error);
        res.status(500).json({ error: "Erro ao buscar notas" });
    }
};

export const DeletarNota = async (req, res) => {
    const { id } = req.params;
    try {
        await deletarNota(id);
        res.json({ message: "Nota deletada com sucesso" });
    }
    catch (error) {
        console.error("Erro ao deletar nota:", error);
        res.status(500).json({ error: "Erro ao deletar nota" });
    }
};

export const AtualizarNota = async (req, res) => {
    const { id } = req.params;
    const { aluno_id, disciplina_id, nota, bimestre, observacao } = req.body;
    try {
        await atualizarNota(id, aluno_id, disciplina_id, nota, bimestre, observacao);
        res.json({ message: "Nota atualizada com sucesso" });
    }
    catch (error) {
        console.error("Erro ao atualizar nota:", error);
        res.status(500).json({ error: "Erro ao atualizar nota" });
    }
};
    