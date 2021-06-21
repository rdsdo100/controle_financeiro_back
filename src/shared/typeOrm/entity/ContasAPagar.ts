import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Contas } from "./Contas";
import { Parcelas } from "./Parcelas";

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

    message: string
  
    @ManyToOne(() => Contas, (contas) => contas.contasAPagar)
    @JoinColumn([{ name: 'contas_id_fk', referencedColumnName: 'id' }])
    contasIdFK: Contas;

    @OneToMany(() => Parcelas, (parcelas) => parcelas.contasAPagarIdFK)
    parcelas: Parcelas[];

}
