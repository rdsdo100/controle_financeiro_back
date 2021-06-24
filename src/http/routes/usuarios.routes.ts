import { Router} from 'express';

import UsuaruiosController from '../../controller/usuarios/UsuariosController';


const usuariosRoutes = Router();
const  usuariosController = new UsuaruiosController()

usuariosRoutes.get('/:id', usuariosController.showUsuarios);
usuariosRoutes.get('/', usuariosController.listUsuarios);

export { usuariosRoutes };
