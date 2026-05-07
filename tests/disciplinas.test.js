import { jest } from '@jest/globals';

const mockModel = {
  buscarDisciplinas: jest.fn(),
  buscarDisciplinaPorId: jest.fn(),
  criarDisciplina: jest.fn(),
  atualizarDisciplina: jest.fn(),
  deletarDisciplina: jest.fn(),
};

jest.unstable_mockModule('../src/models/disciplinasModel.js', () => mockModel);

const {
  ListarDisciplinas,
  CriarDisciplina,
  AtualizarDisciplina,
  DeletarDisciplina,
} = await import('../src/controllers/disciplinasController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Disciplinas Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  // LISTAR
  test('Deve listar disciplinas com sucesso', async () => {
    const res = mockRes();
    const data = [{ id: 1, nome: 'Matemática', carga_horaria: 60 }];
    mockModel.buscarDisciplinas.mockResolvedValue(data);
    await ListarDisciplinas({}, res);
    expect(mockModel.buscarDisciplinas).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('Deve retornar 500 ao falhar ao listar disciplinas', async () => {
    const res = mockRes();
    mockModel.buscarDisciplinas.mockRejectedValue(new Error('Erro'));
    await ListarDisciplinas({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar disciplinas' });
  });

  // CRIAR
  test('Deve criar disciplina com sucesso', async () => {
    const res = mockRes();
    mockModel.criarDisciplina.mockResolvedValue({ insertId: 5 });
    await CriarDisciplina({ body: { nome: 'Química', carga_horaria: 70 } }, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Disciplina criada com sucesso', id: 5 });
  });

  test('Deve retornar 500 ao falhar ao criar disciplina', async () => {
    const res = mockRes();
    mockModel.criarDisciplina.mockRejectedValue(new Error('Erro'));
    await CriarDisciplina({ body: { nome: 'Erro', carga_horaria: 10 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar disciplina' });
  });

  // ATUALIZAR
  test('Deve atualizar disciplina com sucesso', async () => {
    const res = mockRes();
    mockModel.atualizarDisciplina.mockResolvedValue({ affectedRows: 1 });
    await AtualizarDisciplina({ params: { id: '1' }, body: { nome: 'Bio', carga_horaria: 40 } }, res);
    expect(mockModel.atualizarDisciplina).toHaveBeenCalledWith('1', 'Bio', 40);
    expect(res.json).toHaveBeenCalledWith({ message: 'Disciplina atualizada com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao atualizar disciplina', async () => {
    const res = mockRes();
    mockModel.atualizarDisciplina.mockRejectedValue(new Error('Erro'));
    await AtualizarDisciplina({ params: { id: '1' }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar disciplina' });
  });

  // DELETAR
  test('Deve deletar disciplina com sucesso', async () => {
    const res = mockRes();
    mockModel.deletarDisciplina.mockResolvedValue({ affectedRows: 1 });
    await DeletarDisciplina({ params: { id: '1' } }, res);
    expect(mockModel.deletarDisciplina).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Disciplina deletada com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao deletar disciplina', async () => {
    const res = mockRes();
    mockModel.deletarDisciplina.mockRejectedValue(new Error('Erro'));
    await DeletarDisciplina({ params: { id: '1' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar disciplina' });
  });
});
