import { Router} from 'express';

import UsuaruiosController from '../../controller/usuarios/UsuariosController';
import isAuthenticated from '../middlewares/isAuthenticated';


const usuariosRoutes = Router();
const  usuariosController = new UsuaruiosController()

usuariosRoutes.get('/:id',isAuthenticated, usuariosController.showUsuarios);
usuariosRoutes.get('/',isAuthenticated , usuariosController.listUsuarios);

export { usuariosRoutes };
