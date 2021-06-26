import { Router} from 'express';
import ContasController from '../../controller/contas/ContasController';
import isAuthenticated from '../middlewares/isAuthenticated';


const contasRoutes = Router();
const  contasController = new ContasController()

contasRoutes.use(isAuthenticated)

contasRoutes.get('/', contasController.index);

contasRoutes.post('/', contasController.cadastrarContas);
 contasRoutes.put('/', contasController.updateContas);
 contasRoutes.delete('/:id', contasController.deleteContas);

export { contasRoutes };



// nomeConta
// corrente
// poupanca
// bancosIdFK.id
// usuarios
// banco
