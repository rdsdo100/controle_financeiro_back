import { createQueryBuilder, EntityRepository, getConnection, Repository } from "typeorm";
import { Contas } from "../entity/Contas";
import { Movimentacoes } from "../entity/Movimentacoes";

@EntityRepository(Movimentacoes)
export default class MovimentacoesRepository extends Repository<Movimentacoes> {





    async verificarMovimentacoesContas(idConta: number) {

        const  movimentacoesRetorno = new Movimentacoes()
        const  contaRetorno = new Contas()
        let contaVerificacao: any = await createQueryBuilder("Movimentacoes")
            .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
            .where('contas.id = :id', { id: idConta })
            .getOne()

        return contaVerificacao

/*
        if (contaVerificacao) {

            contaRetorno.id = contaVerificacao.contasIdFK.id
            contaRetorno.nomeConta = contaVerificacao.contasIdFK.nomeConta
            // contaRetorno.valorConta = contaVerificacao.contasIdFK.valorConta

            movimentacoesRetorno.id = contaVerificacao.id
            movimentacoesRetorno.nomeMovimentacoes = contaVerificacao.nomeMovimentacoes
            movimentacoesRetorno.valorMovimento = contaVerificacao.valorMovimento
            movimentacoesRetorno.descricao = contaVerificacao.descricao
            movimentacoesRetorno.tipoEntrada = contaVerificacao.tipoEntrada
            movimentacoesRetorno.dataMovimento = contaVerificacao.dataMovimento
            movimentacoesRetorno.estorno = contaVerificacao.estorno
            movimentacoesRetorno.dataEstorno = contaVerificacao.dataEstorno
            movimentacoesRetorno.contasIdFK = contaRetorno

        }

*/

    }

  async insertMovimetacoesReposiroty(movimentacoes: Movimentacoes) {

    let insertMovimetacoesReposiroty : any

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

             insertMovimetacoesReposiroty  = await queryRunner.manager.save(Movimentacoes , movimentacoes);
            

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        return insertMovimetacoesReposiroty
    };

    async buscarMovimentacoesUser(idUsuario: number){
        const  movimentacoesRetorno = new Movimentacoes()
        const  contaRetorno = new Contas()
        let contaVerificacao: any  = await createQueryBuilder("Movimentacoes")
            .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
            .leftJoinAndSelect('contas.usuariosIdFK', 'user')
            .where('user.id = :id', {  id : idUsuario})
            .getMany()

            return contaVerificacao
    }

    async buscarMovimentacoesBusca(idUsuario: number, busca: string , tipoBusca: string , pagina: number = 0){
        const  movimentacoesRetorno = new Movimentacoes()
        const  contaRetorno = new Contas()
        const  limite = 20;
        let ok: string  = "user.id" 
        let ok2: string  = "" 
        let contaVerificacao: any  = await createQueryBuilder("Movimentacoes")
            .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
            .leftJoinAndSelect('contas.usuariosIdFK', 'user')
            .where(` ${ok} = :id ${ok2} `, {  id : idUsuario , tt : 1 })
            .limit(limite)
            .offset(limite * pagina)
            .getMany()

            return contaVerificacao
    }

    
}