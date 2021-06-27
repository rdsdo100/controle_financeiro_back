import { Router} from 'express';
import MovimentacoesController from '../../controller/movimentacoes/MovimentacoesController';
import isAuthenticated from '../middlewares/isAuthenticated';

const movimentacoesRoutes = Router();

const movimentacoesController = new MovimentacoesController()
movimentacoesRoutes.use(isAuthenticated)

movimentacoesRoutes.get('/', movimentacoesController.listMovimentacoes);
movimentacoesRoutes.get('/:id', movimentacoesController.showMovimentacoes);
movimentacoesRoutes.post('/', movimentacoesController.create);
movimentacoesRoutes.delete('/:id', movimentacoesController.deleteMovimentacoes);


export { movimentacoesRoutes };
