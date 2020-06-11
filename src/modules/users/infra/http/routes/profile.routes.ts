import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfilesController from '../controllers/ProfilesController';

const profilesRouter = Router();
const profilesController = new ProfilesController();

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/', profilesController.show);
profilesRouter.put('/', profilesController.update);

export default profilesRouter;
