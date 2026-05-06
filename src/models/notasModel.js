import conexao from "../config/db.js";

export const criarNota = async (aluno_id, disciplina_id, nota, bimestre, observacao) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            INSERT INTO notas (aluno_id, disciplina_id, nota, bimestre, observacao)
            VALUES (?, ?, ?, ?, ?)
        `, [aluno_id, disciplina_id, nota, bimestre, observacao]);
        return result;
    } catch (error) {
        console.error("Erro ao criar nota:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const buscarNotas = async () => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [notas] = await conn.query(`
            SELECT n.id, n.nota, n.bimestre, n.observacao,
                   a.nome AS aluno,
                   d.nome AS disciplina
            FROM notas n
            INNER JOIN alunos a ON n.aluno_id = a.id
            INNER JOIN disciplinas d ON n.disciplina_id = d.id
        `);
        return notas;
    } catch (error) {
        console.error("Erro ao buscar notas:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const deletarNota = async (id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            DELETE FROM notas WHERE id = ?
        `, [id]);
        return result;
    } catch (error) {
        console.error("Erro ao deletar nota:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const atualizarNota = async (id, aluno_id, disciplina_id, nota, bimestre, observacao) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            UPDATE notas SET aluno_id = ?, disciplina_id = ?, nota = ?, bimestre = ?, observacao = ?
            WHERE id = ?
        `, [aluno_id, disciplina_id, nota, bimestre, observacao, id]);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar nota:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const buscarNotasPorAluno = async (aluno_id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [notas] = await conn.query(`
            SELECT n.id, n.nota, n.bimestre, n.observacao,
                   a.nome AS aluno,
                   d.nome AS disciplina
            FROM notas n
            INNER JOIN alunos a ON n.aluno_id = a.id
            INNER JOIN disciplinas d ON n.disciplina_id = d.id
            WHERE n.aluno_id = ?
        `, [aluno_id]);
        return notas;
    } catch (error) {
        console.error("Erro ao buscar notas por aluno:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};
