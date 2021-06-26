import { Router } from 'express'
import { contasRoutes } from './contas.routes';
import { routesInicio } from './inicio.routes';
import { loginRoutes } from './login.routes';
import { usuariosRoutes } from './usuarios.routes';




const routes = Router();

routes.use('/' , routesInicio)
routes.use('/login', loginRoutes);
routes.use('/user', usuariosRoutes);
routes.use('/contas', contasRoutes);




export { routes }