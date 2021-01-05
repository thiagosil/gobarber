import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able list the month availability for provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 9, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 10, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 11, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 12, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 13, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 15, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 16, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 20, 17, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2021, 4, 21, 8, 0, 0),
    });

    const availability = await listAvailability.execute({
      provider_id: 'provider',
      year: 2021,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 2, available: true },
      ]),
    );
  });
});
