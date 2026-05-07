import { jest } from '@jest/globals';

const mockModel = {
  Buscartodosprofessores: jest.fn(),
  Criarprofessor: jest.fn(),
  Atualizarprofessor: jest.fn(),
  Deletarprofessor: jest.fn(),
};

jest.unstable_mockModule('../src/models/professorModel.js', () => mockModel);

const {
  Listarprofessores,
  Criarprofessores,
  Atualizarprofessores,
  Deletarprofessores,
} = await import('../src/controllers/professorController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Professores Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  // LISTAR
  test('Deve listar professores com sucesso', async () => {
    const res = mockRes();
    const professores = [{ id: 1, nome: 'Carlos', especialidade: 'Matemática' }];
    mockModel.Buscartodosprofessores.mockResolvedValue(professores);
    await Listarprofessores({}, res);
    expect(mockModel.Buscartodosprofessores).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(professores);
  });

  test('Deve retornar 500 ao falhar ao listar professores', async () => {
    const res = mockRes();
    mockModel.Buscartodosprofessores.mockRejectedValue(new Error('Erro'));
    await Listarprofessores({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar professores' });
  });

  // CRIAR
  test('Deve criar professor com sucesso', async () => {
    const res = mockRes();
    const body = { nome: 'João', email: 'joao@email.com', telefone: '123456', especialidade: 'Física' };
    mockModel.Criarprofessor.mockResolvedValue({ insertId: 10 });
    await Criarprofessores({ body }, res);
    expect(mockModel.Criarprofessor).toHaveBeenCalledWith('João', 'joao@email.com', '123456', 'Física');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Professor criado com sucesso', id: 10 });
  });

  test('Deve retornar 500 ao falhar ao criar professor', async () => {
    const res = mockRes();
    mockModel.Criarprofessor.mockRejectedValue(new Error('Erro'));
    await Criarprofessores({ body: { nome: 'Erro' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar professor' });
  });

  // ATUALIZAR
  test('Deve atualizar professor com sucesso', async () => {
    const res = mockRes();
    const body = { nome: 'Carlos', email: 'carlos@email.com', telefone: '999', especialidade: 'Física' };
    mockModel.Atualizarprofessor.mockResolvedValue({ affectedRows: 1 });
    await Atualizarprofessores({ params: { id: '1' }, body }, res);
    expect(mockModel.Atualizarprofessor).toHaveBeenCalledWith('1', 'Carlos', 'carlos@email.com', '999', 'Física');
    expect(res.json).toHaveBeenCalledWith({ message: 'Professor atualizado com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao atualizar professor', async () => {
    const res = mockRes();
    mockModel.Atualizarprofessor.mockRejectedValue(new Error('Erro'));
    await Atualizarprofessores({ params: { id: '1' }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar professor' });
  });

  // DELETAR
  test('Deve deletar professor com sucesso', async () => {
    const res = mockRes();
    mockModel.Deletarprofessor.mockResolvedValue({ affectedRows: 1 });
    await Deletarprofessores({ params: { id: '1' } }, res);
    expect(mockModel.Deletarprofessor).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Professor deletado com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao deletar professor', async () => {
    const res = mockRes();
    mockModel.Deletarprofessor.mockRejectedValue(new Error('Erro'));
    await Deletarprofessores({ params: { id: '1' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar professor' });
  });
});
