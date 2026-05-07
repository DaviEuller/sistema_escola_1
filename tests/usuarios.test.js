import { jest } from '@jest/globals';

const mockModel = {
  buscarTodosUsuarios: jest.fn(),
  criarUsuario: jest.fn(),
  atualizarUsuario: jest.fn(),
  deletarUsuario: jest.fn(),
};

jest.unstable_mockModule('../src/models/usuarioModel.js', () => mockModel);

const {
  listarUsuarios,
  criarUsuarioController,
  atualizarUsuarioController,
  deletarUsuarioController,
} = await import('../src/controllers/usuarioController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Usuários Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  // LISTAR
  test('Deve listar usuários com sucesso', async () => {
    const res = mockRes();
    const usuarios = [{ id: 1, nome: 'Admin', email: 'admin@escola.com', perfil: 'admin' }];
    mockModel.buscarTodosUsuarios.mockResolvedValue(usuarios);
    await listarUsuarios({}, res);
    expect(mockModel.buscarTodosUsuarios).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usuarios);
  });

  test('Deve retornar 500 ao falhar ao listar usuários', async () => {
    const res = mockRes();
    mockModel.buscarTodosUsuarios.mockRejectedValue(new Error('Erro'));
    await listarUsuarios({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensagem: 'Erro ao listar usuários' }));
  });

  // CRIAR
  test('Deve criar usuário com sucesso', async () => {
    const res = mockRes();
    const body = { nome: 'Novo User', email: 'novo@email.com', senha: '123456', perfil: 'admin' };
    mockModel.criarUsuario.mockResolvedValue({ insertId: 7 });
    await criarUsuarioController({ body }, res);
    expect(mockModel.criarUsuario).toHaveBeenCalledWith('Novo User', 'novo@email.com', '123456', 'admin');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário criado com sucesso', id: 7 });
  });

  test('Deve retornar 500 ao falhar ao criar usuário', async () => {
    const res = mockRes();
    mockModel.criarUsuario.mockRejectedValue(new Error('Erro'));
    await criarUsuarioController({ body: { nome: 'Erro', email: 'e@e.com', senha: '123' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensagem: 'Erro ao criar usuário' }));
  });

  // ATUALIZAR
  test('Deve atualizar usuário com sucesso', async () => {
    const res = mockRes();
    const body = { nome: 'User Atualizado', email: 'up@email.com', senha: 'nova123', perfil: 'admin' };
    mockModel.atualizarUsuario.mockResolvedValue({ affectedRows: 1 });
    await atualizarUsuarioController({ params: { id: '1' }, body }, res);
    expect(mockModel.atualizarUsuario).toHaveBeenCalledWith('1', 'User Atualizado', 'up@email.com', 'nova123', 'admin');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário atualizado com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao atualizar usuário', async () => {
    const res = mockRes();
    mockModel.atualizarUsuario.mockRejectedValue(new Error('Erro'));
    await atualizarUsuarioController({ params: { id: '1' }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensagem: 'Erro ao atualizar usuário' }));
  });

  // DELETAR
  test('Deve deletar usuário com sucesso', async () => {
    const res = mockRes();
    mockModel.deletarUsuario.mockResolvedValue({ affectedRows: 1 });
    await deletarUsuarioController({ params: { id: '1' } }, res);
    expect(mockModel.deletarUsuario).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário deletado com sucesso' });
  });

  test('Deve retornar 500 ao falhar ao deletar usuário', async () => {
    const res = mockRes();
    mockModel.deletarUsuario.mockRejectedValue(new Error('Erro'));
    await deletarUsuarioController({ params: { id: '1' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensagem: 'Erro ao deletar usuário' }));
  });
});
