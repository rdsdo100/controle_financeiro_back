import { Router } from 'express';
import LoginController from '../../controller/usuarios/LoginController';

const loginRoutes = Router();
const loginController = new LoginController();

loginRoutes.get('/', loginController.login);
loginRoutes.post('/', loginController.resetPassword);

export { loginRoutes };
