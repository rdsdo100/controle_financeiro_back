
import { Contas } from '../../entity/Contas';
import { Request, Response } from 'express';
import { Usuarios } from '../../entity/Usuarios';
import Bancos from '../../entity/Bancos';
import ListContasServices from '../../services/contas/ListContasServices';
import CreateContasServices from '../../services/contas/CreateContasServices';
import DeleteContasServices from '../../services/contas/DeleteContasServices';
import UpdateContasServices from '../../services/contas/UpdateContasServices';
import ShowContasServices from '../../services/contas/ShowContasServices';

export default class ContasController {
    async index(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id);
        const listContasServices = new ListContasServices();
        const contas = await listContasServices.execute(idUsuarios);
        return response.status(200).json(contas);
    }

    async ShowContas(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id);
        const idConta: number = Number(request.params.id);
        const showContasServices = new ShowContasServices();

        const retorno = await showContasServices.execute(idConta, idUsuarios);
        return response.status(200).json('Voce ainda tem que terminar essa função, falta verificaro id de usuario');
    }

    async cadastrarContas(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id);
        const contas = new Contas();
        const usuarios = new Usuarios();
        const banco = new Bancos();

        contas.nomeConta = String(request.body.nomeConta);
        contas.corrente = Number(request.body.corrente);
        contas.poupanca = Number(request.body.poupanca);
        usuarios.id = idUsuarios;
        banco.id = Number(request.body.bancosIdFK.id);
        contas.usuariosIdFK = usuarios;
        contas.bancosIdFK = banco;

        const createContasServices = new CreateContasServices();

        const retorno = await createContasServices.execute(contas);
        return response.status(200).json(retorno);
    }

    async deleteContas(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id);
        const idConta: number = Number(request.params.id);
        const deleteContasServices = new DeleteContasServices();

        const retorno = await deleteContasServices.execute(idConta, idUsuarios);
        return response.status(200).json(retorno);
    }

    async updateContas(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id);
        const contas = new Contas();
        const usuarios = new Usuarios();

        contas.id = Number(request.body.id);
        contas.nomeConta = String(request.body.nomeConta);
        contas.corrente = Number(request.body.corrente);
        contas.poupanca = Number(request.body.poupanca);
        contas.ativo = Boolean(request.body.ativo);
        contas.bloqueado = Boolean(request.body.bloqueado);
        usuarios.id = idUsuarios;
        contas.usuariosIdFK = usuarios;

        const updateContasServices = new UpdateContasServices();

        const retorno = await updateContasServices.execute(contas);
        return response.status(200).json(retorno);
    }
}
