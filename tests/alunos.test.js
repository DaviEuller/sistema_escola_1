import { jest } from '@jest/globals';

const mockModel = {
  buscarAlunos: jest.fn(),
  buscarAlunoPorId: jest.fn(),
  criarAluno: jest.fn(),
  atualizarAluno: jest.fn(),
  deletarAluno: jest.fn(),
};

jest.unstable_mockModule('../src/models/alunosModel.js', () => mockModel);

const {
  ListarAlunos,
  BuscarAlunoPorId,
  CriarAluno,
  EditarAluno,
  DeletarAluno,
} = await import('../src/controllers/alunosController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Alunos Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  // LISTAR
  test('Deve listar todos os alunos com sucesso', async () => {
    const alunos = [{ id: 1, nome: 'João Silva', cpf: '123.456.789-00' }];
    mockModel.buscarAlunos.mockResolvedValue(alunos);

    await ListarAlunos({}, mockRes());

    const res = mockRes();
    mockModel.buscarAlunos.mockResolvedValue(alunos);
    await ListarAlunos({}, res);
    expect(mockModel.buscarAlunos).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(alunos);
  });

  test('Deve retornar 500 ao falhar ao listar alunos', async () => {
    const res = mockRes();
    mockModel.buscarAlunos.mockRejectedValue(new Error('Erro no banco'));
    await ListarAlunos({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar alunos' });
  });

  // BUSCAR POR ID
  test('Deve buscar um aluno por ID com sucesso', async () => {
    const res = mockRes();
    const aluno = { id: 1, nome: 'João Silva' };
    mockModel.buscarAlunoPorId.mockResolvedValue(aluno);
    await BuscarAlunoPorId({ params: { id: '1' } }, res);
    expect(mockModel.buscarAlunoPorId).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith(aluno);
  });

  test('Deve retornar 404 quando aluno não for encontrado', async () => {
    const res = mockRes();
    mockModel.buscarAlunoPorId.mockResolvedValue(null);
    await BuscarAlunoPorId({ params: { id: '999' } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Aluno não encontrado' });
  });

  test('Deve retornar 500 ao falhar ao buscar aluno por ID', async () => {
    const res = mockRes();
    mockModel.buscarAlunoPorId.mockRejectedValue(new Error('Erro'));
    await BuscarAlunoPorId({ params: { id: '1' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar aluno' });
  });

  // CRIAR
  test('Deve criar um novo aluno com sucesso', async () => {
    const res = mockRes();
    const body = { nome: 'João', cpf: '123.456.789-00', email: 'joao@email.com', telefone: '11999999999', data_nascimento: '2000-01-01', turma_id: 1 };
    mockModel.criarAluno.mockResolvedValue({ insertId: 10 });
    await CriarAluno({ body }, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Aluno criado com sucesso', id: 10 });
  });

  test('Deve retornar 500 ao falhar ao criar aluno', async () => {
    const res = mockRes();
    mockModel.criarAluno.mockRejectedValue(new Error('Erro ao inserir'));
    await CriarAluno({ body: { nome: 'João', cpf: '123' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar aluno' });
  });

  // EDITAR
  test('Deve atualizar um aluno com sucesso', async () => {
    const res = mockRes();
    const body = { nome: 'João Novo', cpf: '123.456.789-00', email: 'joao@email.com', telefone: '11988888888', data_nascimento: '2000-01-01', turma_id: 2 };
    mockModel.atualizarAluno.mockResolvedValue({ affectedRows: 1 });
    await EditarAluno({ params: { id: '1' }, body }, res);
    expect(mockModel.atualizarAluno).toHaveBeenCalledWith('1', body.nome, body.cpf, body.email, body.telefone, body.data_nascimento, body.turma_id);
    expect(res.json).toHaveBeenCalledWith({ message: 'Aluno atualizado com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao atualizar aluno', async () => {
    const res = mockRes();
    mockModel.atualizarAluno.mockRejectedValue(new Error('Erro'));
    await EditarAluno({ params: { id: '1' }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar aluno' });
  });

  // DELETAR
  test('Deve deletar um aluno com sucesso', async () => {
    const res = mockRes();
    mockModel.deletarAluno.mockResolvedValue({ affectedRows: 1 });
    await DeletarAluno({ params: { id: '1' } }, res);
    expect(mockModel.deletarAluno).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Aluno deletado com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao deletar aluno', async () => {
    const res = mockRes();
    mockModel.deletarAluno.mockRejectedValue(new Error('Erro'));
    await DeletarAluno({ params: { id: '1' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar aluno' });
  });
});
