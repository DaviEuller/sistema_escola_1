const { request, app, getToken } = require('./utils');

describe('Turmas', () => {

  it('criar turma', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/turmas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: "Turma A",
        ano_letivo: 2025
      });

    expect(res.statusCode).toBe(201);
  });

});