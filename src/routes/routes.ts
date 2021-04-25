
import Inicio from '../controller/Inicio'
import UsuaruiosController from "../controller/usuarios/UsuaruiosController";
import LoginController from "../controller/usuarios/LoginController";
import ContasController from '../controller/contas/ContasController';
import MovimentacoesController from '../controller/contas/MovimentacoesController';
import ObjetivosController from '../controller/contas/ObjetivosController';
import BancosController from '../controller/contas/BancosController';




const inicio = new Inicio()
const usuario = new UsuaruiosController()
const login = new LoginController()
const conta = new ContasController()
const movimentacoes = new MovimentacoesController()
const objetivo = new ObjetivosController()
const banco = new BancosController()

export const routes = [
    inicio,
    usuario,
    login,
    conta,
    movimentacoes,
    objetivo,
    banco

]