const { request, app, getToken } = require('./utils');

describe('Professores', () => {

  it('criar professor', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/professores')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: "Professor Teste",
        especialidade: "Matemática"
      });

    expect(res.statusCode).toBe(201);
  });

  it('listar professores', async () => {
    const token = await getToken();

    const res = await request(app)
      .get('/professores')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});