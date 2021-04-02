import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
        type: 'varchar',
        length: '50',
        nullable: false,
        unique: true,
    })
    tipoEntrada : string
  
    

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



}
