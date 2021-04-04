import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Contas } from "./Contas";

@Entity()
export class EntradasSaidas {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        name: 'nome_entradas_saidas',
        type: 'varchar',
        length: '60',
    nullable: false,
     unique: true,
    })
    nomeEntradasSaidas: string

    @Column({
        name: 'tipo_entrada',
        type: 'boolean',
        nullable: false,
        unique: true,
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

    @ManyToOne(() => Contas, (contas) => contas.entradasSaidas)
    @JoinColumn([{ name: 'contas_id_fk', referencedColumnName: 'id' }])
    contasIdFK: Contas;

}
