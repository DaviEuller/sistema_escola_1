const { request, app, getToken } = require('./utils');

describe('Disciplinas', () => {

  it('criar disciplina', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/disciplinas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: "História",
        carga_horaria: 60
      });

    expect(res.statusCode).toBe(201);
  });

  it('erro sem carga horária', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/disciplinas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: "Erro"
      });

    expect(res.statusCode).toBe(400);
  });

});