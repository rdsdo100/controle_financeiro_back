import { Router } from 'express';
import LoginUsersController from '../controllers/LoginUsersController';

const loginRouter = Router();
const loginUsersController = new LoginUsersController();

loginRouter.get('/', loginUsersController.login);

export default loginRouter;
