const { request, app, getToken } = require('./utils');

describe('Usuários', () => {

  it('deve listar usuários', async () => {
    const token = await getToken();

    const res = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it('deve criar usuário', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/usuarios')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: "Novo User",
        email: "novo@email.com",
        senha: "123456"
      });

    expect(res.statusCode).toBe(201);
  });

  it('erro ao criar sem nome', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/usuarios')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: "erro@email.com",
        senha: "123"
      });

    expect(res.statusCode).toBe(400);
  });

});