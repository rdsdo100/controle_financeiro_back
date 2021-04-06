import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Contas } from "./Contas";

@Entity()
export class Movimentacoes {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        name: 'nome_movimentacoes',
        type: 'varchar',
        length: '60',
    nullable: false,
    
    })
    nomeMovimentacoes: string

    @Column({
        name: 'tipo_entrada',
        type: 'boolean',
        nullable: false,
        
    })
    tipoEntrada : boolean
  
    

    @Column( {
        name: 'descricao',
        type: 'varchar',
        length: '500'
        
    })
    descricao: string

    @Column( {
        name: 'valor_movimento',
        type: 'numeric',
        nullable: false
    })
    valorMovimento: number

    @ManyToOne(() => Contas, (contas) => contas.movimentacoes)
    @JoinColumn([{ name: 'contas_id_fk', referencedColumnName: 'id' }])
    contasIdFK: Contas;

}
