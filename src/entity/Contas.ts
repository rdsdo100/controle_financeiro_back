import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nome_conta',
        type: 'varchar',
        length: '50',
        nullable: false,
        unique: true,
    })
    nomeConta: string

    @Column({
        name: 'valor_conta', type: 'numeric',
        nullable: false,
        default: 0
    })
    valorConta: number

    @Column({
        name: 'qtd_pontos',
        type: 'int',
        nullable: false,
        default: 100
    })
    qtdPontos: number

    @Column({
        name: 'contador_movimento',
        type: 'int',
        nullable: false,
        default: 1
    })
    contadorMovimento: number

    @Column({
        name: 'ativo',
        type: 'boolean',
        default: true,

    })
    ativo: boolean

    @Column({
        name: 'bloqueado',
        type: 'boolean',
        default: false,
    })
    bloqueado: boolean

}
