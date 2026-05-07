import { jest } from '@jest/globals';

const mockAuthModel = {
  buscarUsuarioPorEmail: jest.fn(),
  criarUsuario: jest.fn(),
};

const mockBcrypt = {
  hash: jest.fn(),
  compare: jest.fn(),
};

const mockJwt = {
  sign: jest.fn(),
  verify: jest.fn(),
};

jest.unstable_mockModule('../src/models/authModel.js', () => mockAuthModel);
jest.unstable_mockModule('bcryptjs', () => ({ default: mockBcrypt }));
jest.unstable_mockModule('jsonwebtoken', () => ({ default: mockJwt }));

const { registrar, login } = await import('../src/controllers/authController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Auth Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  // REGISTRAR
  test('Deve registrar usuário com sucesso', async () => {
    const res = mockRes();
    mockAuthModel.buscarUsuarioPorEmail.mockResolvedValue([]);
    mockBcrypt.hash.mockResolvedValue('hash_senha');
    mockAuthModel.criarUsuario.mockResolvedValue({ insertId: 1 });

    await registrar({ body: { nome: 'Teste', email: 'teste@email.com', senha: '123456' } }, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário criado com sucesso' });
  });

  test('Deve retornar 400 ao registrar com campos faltando', async () => {
    const res = mockRes();
    await registrar({ body: { email: 'teste@email.com' } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Nome, email e senha são obrigatórios' });
  });

  test('Deve retornar 400 se email já cadastrado', async () => {
    const res = mockRes();
    mockAuthModel.buscarUsuarioPorEmail.mockResolvedValue([{ id: 1 }]);
    await registrar({ body: { nome: 'Teste', email: 'ja@email.com', senha: '123' } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Email já cadastrado' });
  });

  // LOGIN
  test('Deve fazer login com sucesso', async () => {
    const res = mockRes();
    const usuario = { id: 1, nome: 'Teste', email: 'teste@email.com', perfil: 'admin', senha: 'hash' };
    mockAuthModel.buscarUsuarioPorEmail.mockResolvedValue([usuario]);
    mockBcrypt.compare.mockResolvedValue(true);
    mockJwt.sign.mockReturnValue('token_fake');

    await login({ body: { email: 'teste@email.com', senha: '123456' } }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Login realizado com sucesso', token: 'token_fake' });
  });

  test('Deve retornar 400 ao logar sem email ou senha', async () => {
    const res = mockRes();
    await login({ body: { email: 'teste@email.com' } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Email e senha são obrigatórios' });
  });

  test('Deve retornar 404 se usuário não encontrado no login', async () => {
    const res = mockRes();
    mockAuthModel.buscarUsuarioPorEmail.mockResolvedValue([]);
    await login({ body: { email: 'nao@existe.com', senha: '123' } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário não encontrado' });
  });

  test('Deve retornar 401 ao logar com senha errada', async () => {
    const res = mockRes();
    mockAuthModel.buscarUsuarioPorEmail.mockResolvedValue([{ id: 1, senha: 'hash' }]);
    mockBcrypt.compare.mockResolvedValue(false);
    await login({ body: { email: 'teste@email.com', senha: 'errada' } }, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Senha inválida' });
  });
});
