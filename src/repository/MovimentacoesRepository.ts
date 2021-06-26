import {EntityRepository, Repository } from "typeorm";
import { Movimentacoes } from "../entity/Movimentacoes";

@EntityRepository(Movimentacoes)
export default class MovimentacoesRepository extends Repository<Movimentacoes> {

   

    
}