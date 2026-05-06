import conexao from '../config/db.js';

export const buscarDisciplinas = async () => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [disciplinas] = await conn.query(`
            SELECT * FROM disciplinas
        `);
        return disciplinas;
    } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const criarDisciplina = async (nome, carga_horaria) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)
        `, [nome, carga_horaria]);
        return result;
    } catch (error) {
        console.error("Erro ao criar disciplina:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const deletarDisciplina = async (id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            DELETE FROM disciplinas WHERE id = ?
        `, [id]);
        return result;
    } catch (error) {
        console.error("Erro ao deletar disciplina:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const atualizarDisciplina = async (id, nome, carga_horaria) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            UPDATE disciplinas SET nome = ?, carga_horaria = ? WHERE id = ?
        `, [nome, carga_horaria, id]);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar disciplina:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const buscarDisciplinaPorId = async (id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [disciplinas] = await conn.query(`
            SELECT * FROM disciplinas WHERE id = ?
        `, [id]);
        return disciplinas[0];
    } catch (error) {
        console.error("Erro ao buscar disciplina por ID:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};