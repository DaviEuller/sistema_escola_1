import conexao from '../config/db.js';

export const Buscartodosprofessores = async () => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [professores] = await conn.query(`
            SELECT p.id, p.nome, p.email, p.telefone, p.especialidade
            FROM professores p
        `);
        return professores;
    } catch (error) {
        console.error("Erro ao buscar professores:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const Criarprofessor = async (nome, email, telefone, especialidade) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            INSERT INTO professores (nome, email, telefone, especialidade) VALUES (?, ?, ?, ?)
        `, [nome, email, telefone, especialidade]);
        return result;
    } catch (error) {
        console.error("Erro ao criar professor:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const Deletarprofessor = async (id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            DELETE FROM professores WHERE id = ?
        `, [id]);
        return result;
    } catch (error) {
        console.error("Erro ao deletar professor:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const Atualizarprofessor = async (id, nome, email, telefone, especialidade) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            UPDATE professores SET nome = ?, email = ?, telefone = ?, especialidade = ?
            WHERE id = ?
        `, [nome, email, telefone, especialidade, id]);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar professor:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const BuscarprofessorPorId = async (id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [professor] = await conn.query(`
            SELECT id, nome, email, telefone, especialidade
            FROM professores
            WHERE id = ?
        `, [id]);
        return professor[0];
    } catch (error) {
        console.error("Erro ao buscar professor por ID:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

