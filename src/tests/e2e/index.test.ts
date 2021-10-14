import { TestFactory } from '@tests/factory';

describe('Testing Index', () => {
  const factory: TestFactory = new TestFactory();

  beforeAll(async () => {
    await factory.init();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      return factory.app.get('/').expect(200);
    });
  });
});
