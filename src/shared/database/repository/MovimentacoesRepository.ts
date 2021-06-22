import { createQueryBuilder, EntityRepository, getConnection, Repository } from "typeorm";
import { IDeleteMovimentacos } from "../services/contas/MovimentacoesBusiness";
import { IBuscaMovimentacoes } from "../controller/contas/MovimentacoesController";
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
    let insertContasReposiroty : any

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

             insertMovimetacoesReposiroty  = await queryRunner.manager.save(Movimentacoes , movimentacoes);
             insertContasReposiroty = await queryRunner.manager.save(Contas , movimentacoes.contasIdFK);

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        return insertMovimetacoesReposiroty
    };


    async buscarMovimentacoesUserId(idUsuario: number, movimentacoesId: number ){
        const  movimentacoesRetorno = new Movimentacoes()
        const  contaRetorno = new Contas()
        let contaVerificacao: any  = await createQueryBuilder("Movimentacoes")
            .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
            .leftJoin('contas.usuariosIdFK', 'user')
            .where('user.id = :idUser and Movimentacoes.id = :movimentacoesId' , {  idUser : idUsuario , movimentacoesId: movimentacoesId})
            .getOne()

            return contaVerificacao
    }

    async buscarMovimentacoesUser(idUsuario: number){
        const  movimentacoesRetorno = new Movimentacoes()
        const  contaRetorno = new Contas()
        let contaVerificacao: any  = await createQueryBuilder("Movimentacoes")
            .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
            .leftJoin('contas.usuariosIdFK', 'user')
            .where('user.id = :id', {  id : idUsuario})
            .getMany()

            return contaVerificacao
    }

    

    async buscarMovimentacoesBusca({idUsuario, busca, tipoBusca , pagina}: IBuscaMovimentacoes){
        const  movimentacoesRetorno = new Movimentacoes()
        const  contaRetorno = new Contas()
        const  limite = 20;
        let ok: string  = "user.id" 
        let ok2: string  = "" 
        let contaVerificacao: any  = await createQueryBuilder("Movimentacoes")
            .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
            .leftJoinAndSelect('contas.usuariosIdFK', 'user')
            .where('user.id = :id', {  id : idUsuario})
            .limit(limite)
            .offset(limite * pagina)
            .getMany()

            return contaVerificacao
    }

    async deleteMovimetacoesReposiroty(  movimentacoesId: number, conta : Contas): Promise<string> {

            const connection = getConnection();
            const queryRunner = connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
    
            try {
    
                await queryRunner.manager.delete(Movimentacoes , movimentacoesId);
                await queryRunner.manager.update(Contas , conta.id ,conta)
    
                await queryRunner.commitTransaction();
            } catch (err) {
                console.log(err);
                await queryRunner.rollbackTransaction();
            } finally {
                await queryRunner.release();
            }
    
            return 'Movimentação Deletada.'
        };

    
}