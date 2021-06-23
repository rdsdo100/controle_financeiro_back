import { Router} from 'express';
import Inicio from '../../controller/inicio/Inicio';

const routesInicio = Router();
const  inicio = new Inicio()

routesInicio.get('/', inicio.inicio);

export { routesInicio };
