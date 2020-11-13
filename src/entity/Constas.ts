import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Constas {


    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descricaoConta: string

    @Column()
    valor: number

    @Column()
    dataVencimento: Date

}
