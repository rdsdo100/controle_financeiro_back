import loginRouter from '@modules/users/infra/http/routes/login.routes';
import { Router } from 'express'





const routes = Router();


routes.use(loginRouter)




export { routes }