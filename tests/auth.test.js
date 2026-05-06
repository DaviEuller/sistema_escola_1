const { request, app } = require('./utils');

describe('Auth', () => {

  it('deve registrar usuário', async () => {
    const res = await request(app)
      .post('/auth/registrar')
      .send({
        nome: "Teste",
        email: "teste@email.com",
        senha: "123456"
      });

    expect(res.statusCode).toBe(201);
  });

  it('deve fazer login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "teste@email.com",
        senha: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('erro ao logar com senha errada', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "teste@email.com",
        senha: "errada"
      });

    expect(res.statusCode).toBe(401);
  });

});