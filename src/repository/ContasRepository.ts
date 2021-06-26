import { createQueryBuilder, EntityRepository, getManager, Repository } from "typeorm";
import Bancos from "../entity/Bancos";
import { Contas } from "../entity/Contas";
import { Usuarios } from "../entity/Usuarios";
import { contasRoutes } from "../http/routes/contas.routes";

@EntityRepository(Contas)
export default class ContasRepository extends Repository<Contas> {
    contas = new Contas();
    usuarios = new Usuarios();

    async buscarAllContasRpository(userId: number) {
        try {
            this.usuarios.id = userId;
            const contasRepository = getManager();
            const buscarContas: any = await contasRepository.find(Contas, { usuariosIdFK: this.usuarios });

            const ListContas = buscarContas.map((item: any) => {
                this.contas.id = item.id;
                this.contas.nomeConta = item.nomeConta;
                this.contas.valorTotal = item.valorTotal;
                this.contas.corrente = item.corrente;
                this.contas.poupanca = item.poupanca;
                this.contas.ativo = item.ativo;

                return this.contas;
            });

            return ListContas;
        } catch (e) {
            return e;
        }
    }

    async buscarSaldoContasRpository(id: number) {
        let contas = new Contas();
        try {
            const contasRepository = getManager();
            const buscarContasId: any = await contasRepository.findOne(Contas, id);

            if (buscarContasId) {
                contas.id = buscarContasId.id;
                contas.nomeConta = buscarContasId.nomeConta;
                contas.corrente = buscarContasId.corrente;
                contas.poupanca = buscarContasId.poupanca;
                contas.valorTotal = buscarContasId.valorTotal;
            }
        } catch (e) {
            console.log(e);
        }
        return contas;
    }

    async insertConta(conta: Contas) {
        try {
            const contaRepository = getManager();

            return await contaRepository.save(Contas, conta);
        } catch (e) {}
    }

    async readConta(idUsuario: number) {
        let retornoContas: Contas[];

        try {
            const contaRepository = await createQueryBuilder('Contas')
                .leftJoinAndSelect('Contas.bancosIdFK', 'banco')
                .leftJoinAndSelect('Contas.usuariosIdFK', 'usuarios')
                .where('usuarios.id = :id', { id: idUsuario })
                .getMany();

            retornoContas = contaRepository.map((conta: any) => {
                const contas = new Contas();
                const bancos = new Bancos();
                const usuarios = new Usuarios();

                contas.id = conta.id;
                contas.nomeConta = conta.nomeConta;
                contas.valorTotal = conta.valorTotal;
                contas.corrente = conta.corrente;
                contas.poupanca = conta.poupanca;
                contas.ativo = conta.ativo;
                contas.bloqueado = conta.bloqueado;
                bancos.id = conta.bancosIdFK.id;
                bancos.nomeBanco = conta.bancosIdFK.nomeBanco;
                bancos.urlImagemBanco = conta.bancosIdFK.urlImagemBanco;
                usuarios.id = conta.usuariosIdFK.id;
                contas.bancosIdFK = bancos;
                contas.usuariosIdFK = usuarios;
                return contas;
            });

            return retornoContas;
        } catch (e) {}
    }

    async findContasByBancosByUser(idUsuario: number , idConta: number) {
        

     
             const contaRepository = await this.createQueryBuilder('Contas')
                 .leftJoinAndSelect('Contas.bancosIdFK', 'banco')
                 .leftJoinAndSelect('Contas.usuariosIdFK', 'usuarios')
                 .where('usuarios.id = :id and  banco.id = :idBanco', { id: idUsuario, idBanco: idConta })
                 .getMany();

           return contasRoutes

           
       
    }

    async deleteContaId(idConta: number) {
        try {
            const contasRepository = getManager();
            await contasRepository.delete(Contas, idConta);
            return `ID Conta ${idConta} deletado!`;
        } catch (e) {
            return { Error: `Erro ao deletar!`, e };
        }
    }

    async updateContas(contas: Contas) {
        try {
            const contasRepository = getManager();
            const retornoContas = await contasRepository.update(Contas, contas.id, contas);

            return retornoContas;
        } catch (e) {
            return e;
        }
    }
}

