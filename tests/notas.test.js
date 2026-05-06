const { request, app, getToken } = require('./utils');

describe('Notas', () => {

  it('criar nota', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        aluno_id: 1,
        disciplina_id: 1,
        nota: 8.5,
        bimestre: "1"
      });

    expect(res.statusCode).toBe(201);
  });

});