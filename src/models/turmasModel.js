import conexao from "../config/db.js";

export const BuscarTodasTurmas = async () => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [turmas] = await conn.query(`
            SELECT t.id, t.nome, t.ano_letivo,
                   p.nome AS professor
            FROM turmas t
            LEFT JOIN professores p ON t.professor_id = p.id
        `);
        return turmas;
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const CriarTurma = async (nome, ano_letivo, professor_id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            INSERT INTO turmas (nome, ano_letivo, professor_id) VALUES (?, ?, ?)
        `, [nome, ano_letivo, professor_id]);
        return result;
    } catch (error) {
        console.error("Erro ao criar turma:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const DeletarTurma = async (id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            DELETE FROM turmas WHERE id = ?
        `, [id]);
        return result;
    } catch (error) {
        console.error("Erro ao deletar turma:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const AtualizarTurma = async (id, nome, ano_letivo, professor_id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            UPDATE turmas SET nome = ?, ano_letivo = ?, professor_id = ?
            WHERE id = ?
        `, [nome, ano_letivo, professor_id, id]);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar turma:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};