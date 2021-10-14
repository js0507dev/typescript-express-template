import { TestFactory } from '@tests/factory';

describe('Testing Users', () => {
  const factory: TestFactory = new TestFactory();

  beforeAll(async () => {
    await factory.init();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      expect(true).toBe(true);
    });
  });
});
