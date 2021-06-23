import {EntityRepository, getManager, Repository } from 'typeorm';
import { Usuarios } from '../entity/Usuarios';

@EntityRepository(Usuarios)
export default class UsuarioRepository extends Repository<Usuarios> {

    
readonly usuarios = new Usuarios


    async insertUsuarioRpository(usuario: Usuarios) {

        const usuarioRepository = getManager();
        return usuarioRepository.save(Usuarios, usuario);

    }

    async buscarUsuarioRepository(usuario: Usuarios) {

         const usuarioRepository = getManager();
       const  retorno: any = await  usuarioRepository.findOne(Usuarios, {nomeUsuario: usuario.nomeUsuario , senha : usuario.senha });

       this.usuarios.id = retorno?.id
       this.usuarios.nomeUsuario = retorno.nomeUsuario
       this.usuarios.bloqueado = retorno.bloqueado
       this.usuarios.ativo = retorno.ativo
       this.usuarios.senha = retorno.senha
       this.usuarios.email = retorno.email

       return this.usuarios


    };

    async buscarUsuarioRepositoryAll() {

        const usuarioRepository = getManager();
        return usuarioRepository.find(Usuarios);

    };

    async buscarUsuarioIdRepository(idUsuario: number) {

        const usuarioRepository = getManager();
        return usuarioRepository.findOne(Usuarios, idUsuario);
    };




    async listUsuarioRepository() {
        const usuarioRepository = getManager();
        return usuarioRepository.find(Usuarios);
    };

    async updateUsuarioRepository(usuarios: Usuarios) {
        const usuarioRepository = getManager();
        return await usuarioRepository.update(Usuarios, usuarios.id, usuarios)
    };

    async deleteUsuarioIdRepository(idUsuario: number) {

        const usuarioRepository = getManager();



    };

    async buscarUsuariosRepository() {
        const usuarioRepository = getManager();
        return usuarioRepository.find(Usuarios);
    };



}
