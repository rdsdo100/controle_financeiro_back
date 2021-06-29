import { Router} from 'express';
import ObjetivosController from '../../controller/objetivos/ObjetivosController';
import isAuthenticated from '../middlewares/isAuthenticated';


const objetivosRouter = Router();
const objetivoController = new ObjetivosController();

objetivosRouter.use(isAuthenticated)
objetivosRouter.post('/', objetivoController.create);
objetivosRouter.get('/', objetivoController.listMovimentacoes);
objetivosRouter.get('/:id', objetivoController.showMovimentacoes);
objetivosRouter.delete('/', objetivoController.deleteMovimentacoes);

export { objetivosRouter };
