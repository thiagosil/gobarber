// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover his password using his email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const sendEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await fakeUserRepository.create({
      name: 'mochileiro',
      email: 'mochileiro@example.com',
      password: '123456',
    });

    await sendEmailService.execute({ email: 'mochileiro@example.com' });

    expect(sendMail).toHaveBeenCalled();
  });
});
