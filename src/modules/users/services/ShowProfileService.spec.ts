import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able show the user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Mochileiro Das Galaxias',
      email: 'mochileiro@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Mochileiro Das Galaxias');
    expect(profile.email).toBe('mochileiro@example.com');
  });

  it('should not be able show non existing user profile', async () => {
    await expect(
      showProfile.execute({
        user_id: '3133123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
