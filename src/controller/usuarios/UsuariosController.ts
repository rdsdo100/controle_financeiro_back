import { Request, Response } from 'express';
import { Usuarios } from '../../entity/Usuarios';
import CreateUsuariosServices from '../../services/usuarios/CreateUsuariosServices';
import ListUsuariosServices from '../../services/usuarios/ListUsuariosServices';
import ShowUsuariosServices from '../../services/usuarios/ShowUsuariosServices';

export default class UsuariosController {
    async showUsuarios(request: Request, response: Response): Promise<Response> {
         const id: number = Number(request.params.id);
         const showUsuario = new ShowUsuariosServices();
         const usuario = await showUsuario.execute(id);

        return response.status(200).json(usuario);
    }
    async listUsuarios(request: Request, response: Response): Promise<Response> {
        const userId: number = Number(request.body.decoded.id); 
        const listUsuario = new ListUsuariosServices();
        const usuarios = await listUsuario.execute(userId);
        return response.status(200).json(usuarios);
    }

    async cadastroUsuarios(request: Request, response: Response) {
        const usuarios = new Usuarios()
        const createUsuarios = new CreateUsuariosServices()
        usuarios.nomeUsuario = String(request.body.nome)
        usuarios.email = String(request.body.email)
        usuarios.senha = String(request.body.senha)
        const retornoUsuario = await createUsuarios.execute(usuarios)
        return response.status(200).json(retornoUsuario)
    }
    // async updateUsuarios (request: Request, response: Response){
    //     const usuarios = new Usuarios()
    //     const usuariosBusiness = new UsuariosBusiness()
    //     usuarios.id =  Number(request.body.id)
    //     usuarios.nomeUsuario = String(request.body.nome)
    //     usuarios.email = String(request.body.email)
    //     usuarios.senha = String(request.body.senha)
    //     const resposta = await usuariosBusiness.updateUsuario(usuarios)
    //     response.json(resposta)
}
