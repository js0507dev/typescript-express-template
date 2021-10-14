import { CreateUserDto } from '@dtos/users.dto';
import { TestFactory } from '@tests/factory';

describe('Testing Auth', () => {
  const factory: TestFactory = new TestFactory();

  beforeAll(async () => {
    await factory.init();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };
      return factory.app.post('/v1/auth/signup').send(userData).expect(201);
    });
  });
});
