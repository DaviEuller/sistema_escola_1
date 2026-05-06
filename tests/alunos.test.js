const { request, app, getToken } = require('./utils');

describe('Alunos', () => {

  it('criar aluno', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/alunos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: "Aluno Teste",
        cpf: "123.456.789-00"
      });

    expect(res.statusCode).toBe(201);
  });

  it('erro sem nome', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/alunos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        cpf: "111"
      });

    expect(res.statusCode).toBe(400);
  });

});