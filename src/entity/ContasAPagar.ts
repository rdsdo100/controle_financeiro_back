import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ContasAPagar {
    @PrimaryGeneratedColumn()
    id: number;

   @Column({
    name: 'nome_contas_a_pagar',
    type: 'varchar',
    length: '80',
    nullable: false,
    unique: true
    })
    nomeContasAPagar: string

    @Column({
        name: 'valor_total_contas_a_pagar',
        type: 'numeric',
        nullable: false
    })
    valorTotalContasAPagar:number

    @Column({
        name: 'data_vencimento',
        type: 'date',
        nullable: false
    })
    dataVencimento: Date

    @Column( {
        name: 'descricao',
        type: 'varchar',
        length: '500'
        
    })
    descricao: string

    @Column( {
        name: 'qtd_parcelas',
        type: 'int',
    })
    qtdParcelas: number

  


}
