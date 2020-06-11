import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
describe('ListPoviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able show the user profile', async () => {
    const first_user = await fakeUserRepository.create({
      name: 'Mochileiro Das Galaxias',
      email: 'mochileiro@example.com',
      password: '123456',
    });

    const second_user = await fakeUserRepository.create({
      name: 'Marvin O Marciano',
      email: 'marvin@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Jose Toalha',
      email: 'toalha@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([first_user, second_user]);
  });
});
