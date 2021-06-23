import { Router , Request , Response } from 'express'




const routes = Router();

routes.use('/' , (request, response )=>{
return response.json({ok: 'ok'})
} )



export { routes }