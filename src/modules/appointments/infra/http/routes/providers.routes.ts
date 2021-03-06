import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayController = new ProviderDayAvailabilityController();
const providerMonthController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.QUERY]: {
      provider_id: Joi.string().uuid().required,
      month: Joi.string().required(),
      year: Joi.string().required(),
    },
  }),
  providerMonthController.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.QUERY]: {
      provider_id: Joi.string().uuid().required,
      month: Joi.string().required(),
      year: Joi.string().required(),
      day: Joi.string().required(),
    },
  }),
  providerDayController.index,
);

export default providersRouter;
