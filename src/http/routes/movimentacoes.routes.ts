import { Router} from 'express';
import MovimentacoesController from '../../controller/movimentacoes/MovimentacoesController';
import isAuthenticated from '../middlewares/isAuthenticated';

const movimentacoesRoutes = Router();
const movimentacoesController = new MovimentacoesController()
movimentacoesRoutes.use(isAuthenticated)
movimentacoesRoutes.post('/', movimentacoesController.create);

export { movimentacoesRoutes };
