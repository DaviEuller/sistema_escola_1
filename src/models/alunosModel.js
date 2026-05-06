import conexao from '../config/db.js';

export const buscarAlunos = async () => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [alunos] = await conn.query(`
            SELECT a.id, a.nome, a.cpf, a.email, a.telefone, a.data_nascimento, a.status,
                   t.nome AS turma
            FROM alunos a
            LEFT JOIN turmas t ON a.turma_id = t.id
        `);
        return alunos;
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const criarAluno = async (nome, cpf, email, telefone, data_nascimento, turma_id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            INSERT INTO alunos (nome, cpf, email, telefone, data_nascimento, turma_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [nome, cpf, email, telefone, data_nascimento, turma_id]);
        return result;
    } catch (error) {
        console.error("Erro ao criar aluno:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const deletarAluno = async (id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            DELETE FROM alunos WHERE id = ?
        `, [id]);
        return result;
    } catch (error) {
        console.error("Erro ao deletar aluno:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const atualizarAluno = async (id, nome, cpf, email, telefone, data_nascimento, turma_id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [result] = await conn.query(`
            UPDATE alunos SET nome = ?, cpf = ?, email = ?, telefone = ?, data_nascimento = ?, turma_id = ?
            WHERE id = ?
        `, [nome, cpf, email, telefone, data_nascimento, turma_id, id]);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar aluno:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export const buscarAlunoPorId = async (id) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [aluno] = await conn.query(`
            SELECT a.id, a.nome, a.cpf, a.email, a.telefone, a.data_nascimento, a.status,
                   t.nome AS turma
            FROM alunos a
            LEFT JOIN turmas t ON a.turma_id = t.id
            WHERE a.id = ?
        `, [id]);
        return aluno[0];
    } catch (error) {
        console.error("Erro ao buscar aluno por ID:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};
