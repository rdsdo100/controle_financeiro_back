import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Parcelas {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        name: 'valor_parcela',
        type: 'numeric',
        nullable: false
    })
    valorParcela: number

    @Column({
        name: 'data_vencimento',
        type: 'date',
        nullable: false
    })
    dataVencimento: Date

    @Column({
        name: 'data_pagamento',
        type: 'date',
        nullable: false
    })
    dataPagamento: Date

    @Column({
        name: 'descricao',
        type: 'varchar',
        length: '500'
    })
    descricao: string

    @Column({
        name: 'numero_parcela',
        type: 'int',
        default: 1
    })
    numeroParcela: number





}
