import { Router } from 'express'
import { routesInicio } from './inicio.routes';
import { loginRoutes } from './login.routes';
import { usuariosRoutes } from './usuarios.routes';




const routes = Router();

routes.use('/' , routesInicio)
routes.use('/login', loginRoutes);
routes.use('/user', usuariosRoutes);




export { routes }