import { jest } from '@jest/globals';

const mockModel = {
  buscarNotas: jest.fn(),
  criarNota: jest.fn(),
  atualizarNota: jest.fn(),
  deletarNota: jest.fn(),
};

jest.unstable_mockModule('../src/models/notasModel.js', () => mockModel);

const {
  ListarNotas,
  CriarNota,
  AtualizarNota,
  DeletarNota,
} = await import('../src/controllers/NotasController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Notas Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  // LISTAR
  test('Deve listar notas com sucesso', async () => {
    const res = mockRes();
    const notas = [{ id: 1, aluno: 'João', disciplina: 'Matemática', nota: 8 }];
    mockModel.buscarNotas.mockResolvedValue(notas);
    await ListarNotas({}, res);
    expect(mockModel.buscarNotas).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(notas);
  });

  test('Deve retornar 500 ao falhar ao listar notas', async () => {
    const res = mockRes();
    mockModel.buscarNotas.mockRejectedValue(new Error('Erro'));
    await ListarNotas({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar notas' });
  });

  // CRIAR
  test('Deve criar nota com sucesso', async () => {
    const res = mockRes();
    const body = { aluno_id: 1, disciplina_id: 2, nota: 10, bimestre: '1', observacao: 'Ótimo' };
    mockModel.criarNota.mockResolvedValue({ insertId: 5 });
    await CriarNota({ body }, res);
    expect(mockModel.criarNota).toHaveBeenCalledWith(1, 2, 10, '1', 'Ótimo');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Nota criada com sucesso', id: 5 });
  });

  test('Deve retornar 500 ao falhar ao criar nota', async () => {
    const res = mockRes();
    mockModel.criarNota.mockRejectedValue(new Error('Erro'));
    await CriarNota({ body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar nota' });
  });

  // ATUALIZAR
  test('Deve atualizar nota com sucesso', async () => {
    const res = mockRes();
    const body = { aluno_id: 1, disciplina_id: 2, nota: 7, bimestre: '2', observacao: 'OK' };
    mockModel.atualizarNota.mockResolvedValue({ affectedRows: 1 });
    await AtualizarNota({ params: { id: '1' }, body }, res);
    expect(mockModel.atualizarNota).toHaveBeenCalledWith('1', 1, 2, 7, '2', 'OK');
    expect(res.json).toHaveBeenCalledWith({ message: 'Nota atualizada com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao atualizar nota', async () => {
    const res = mockRes();
    mockModel.atualizarNota.mockRejectedValue(new Error('Erro'));
    await AtualizarNota({ params: { id: '1' }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar nota' });
  });

  // DELETAR
  test('Deve deletar nota com sucesso', async () => {
    const res = mockRes();
    mockModel.deletarNota.mockResolvedValue({ affectedRows: 1 });
    await DeletarNota({ params: { id: '1' } }, res);
    expect(mockModel.deletarNota).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Nota deletada com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao deletar nota', async () => {
    const res = mockRes();
    mockModel.deletarNota.mockRejectedValue(new Error('Erro'));
    await DeletarNota({ params: { id: '1' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar nota' });
  });
});
