import { Router } from 'express';
import AccountsController from '../controllers/AccountsController';
import UsersController from '../controllers/AccountsController';

const accoutsRouter = Router();
const accountsController = new AccountsController ();

accoutsRouter.get('/', accountsController.index);

export default accoutsRouter;
