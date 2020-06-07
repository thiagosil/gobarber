import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover his password using his email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 'mochileiro',
      email: 'mochileiro@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'mochileiro@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be not able to recover a non existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'mochileiro@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'mochileiro',
      email: 'mochileiro@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'mochileiro@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
