import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '312321',
      user_id: '312321',
    });
    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date();
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '312321',
      user_id: '312321',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '312321',
        user_id: '312321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
