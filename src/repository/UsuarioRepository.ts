import { createQueryBuilder, getManager } from 'typeorm';
import { Usuarios } from '../entity/Usuarios';

export default class UsuarioRepository {

    async insertUsuarioRpository(usuario: Usuarios) {

        const usuarioRepository = getManager();
        return usuarioRepository.save(Usuarios, usuario);

    }

    async buscarUsuarioRepository(nomeUsuario: string) {

        const user = await createQueryBuilder('Usuarios')
            .leftJoinAndSelect('Usuarios.grupoUsuariosIdFK', 'usuarios')
            .where('nome_usuario = :nome', { nome: nomeUsuario })
            .getOne()

        return user


    };


    async buscarUsuarioRepositoryAll() {

        const user = await createQueryBuilder('Usuarios')
            .leftJoinAndSelect('Usuarios.grupoUsuariosIdFK', 'usuarios')
            .leftJoinAndSelect('Usuarios.tipoEquipeIdFK', 'equipeUsuarios')
            .getMany()

        return user


    };

    async buscarUsuarioIdRepository(idUsuario: number) {

        const usuarioRepository = getManager();
        return usuarioRepository.findOne(Usuarios, idUsuario);
    };


    async buscarUsuarioGrupoUsuarioId(idUsuario: number) {

        const user = await createQueryBuilder('Usuarios')
            .leftJoinAndSelect('Usuarios.grupoUsuariosIdFK', 'grupoUsuarios')
            .where('Usuarios.id = :id', { id: idUsuario })
            .getOne()

        return user
    }

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
