import { Router } from 'express'
import { routesInicio } from './inicio.routes';




const routes = Router();

routes.use('/' , routesInicio)




export { routes }