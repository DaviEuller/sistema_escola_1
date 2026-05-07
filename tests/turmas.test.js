import { jest } from '@jest/globals';

const mockModel = {
  BuscarTodasTurmas: jest.fn(),
  CriarTurma: jest.fn(),
  AtualizarTurma: jest.fn(),
  DeletarTurma: jest.fn(),
};

jest.unstable_mockModule('../src/models/turmasModel.js', () => mockModel);

const {
  GetTurmas,
  PostTurma,
  PutTurma,
  DeleteTurma,
} = await import('../src/controllers/turmasController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Turmas Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  // LISTAR
  test('Deve listar turmas com sucesso', async () => {
    const res = mockRes();
    const turmas = [{ id: 1, nome: '1º Ano', ano_letivo: 2025 }];
    mockModel.BuscarTodasTurmas.mockResolvedValue(turmas);
    await GetTurmas({}, res);
    expect(mockModel.BuscarTodasTurmas).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(turmas);
  });

  test('Deve retornar 500 ao falhar ao listar turmas', async () => {
    const res = mockRes();
    mockModel.BuscarTodasTurmas.mockRejectedValue(new Error('Erro'));
    await GetTurmas({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar turmas' });
  });

  // CRIAR
  test('Deve criar turma com sucesso', async () => {
    const res = mockRes();
    const body = { nome: '2º Ano', ano_letivo: 2025, professor_id: 1 };
    mockModel.CriarTurma.mockResolvedValue({ insertId: 10 });
    await PostTurma({ body }, res);
    expect(mockModel.CriarTurma).toHaveBeenCalledWith('2º Ano', 2025, 1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Turma criada com sucesso', id: 10 });
  });

  test('Deve retornar 500 ao falhar ao criar turma', async () => {
    const res = mockRes();
    mockModel.CriarTurma.mockRejectedValue(new Error('Erro'));
    await PostTurma({ body: { nome: 'Erro', ano_letivo: 2025 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar turma' });
  });

  // ATUALIZAR
  test('Deve atualizar turma com sucesso', async () => {
    const res = mockRes();
    const body = { nome: '3º Ano', ano_letivo: 2026, professor_id: 2 };
    mockModel.AtualizarTurma.mockResolvedValue({ affectedRows: 1 });
    await PutTurma({ params: { id: '1' }, body }, res);
    expect(mockModel.AtualizarTurma).toHaveBeenCalledWith('1', '3º Ano', 2026, 2);
    expect(res.json).toHaveBeenCalledWith({ message: 'Turma atualizada com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao atualizar turma', async () => {
    const res = mockRes();
    mockModel.AtualizarTurma.mockRejectedValue(new Error('Erro'));
    await PutTurma({ params: { id: '1' }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar turma' });
  });

  // DELETAR
  test('Deve deletar turma com sucesso', async () => {
    const res = mockRes();
    mockModel.DeletarTurma.mockResolvedValue({ affectedRows: 1 });
    await DeleteTurma({ params: { id: '1' } }, res);
    expect(mockModel.DeletarTurma).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Turma deletada com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao deletar turma', async () => {
    const res = mockRes();
    mockModel.DeletarTurma.mockRejectedValue(new Error('Erro'));
    await DeleteTurma({ params: { id: '1' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar turma' });
  });
});
