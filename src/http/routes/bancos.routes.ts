import { Router} from 'express';
import BancosController from '../../controller/BancosController';


const bancosRoutes = Router();
const  bancos = new  BancosController ()

bancosRoutes.get('/', bancos.index);

export { bancosRoutes };
