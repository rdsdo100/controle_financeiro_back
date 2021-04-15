import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Bancos from "./Bancos";
import { ContasAPagar } from "./ContasAPagar";
import { Movimentacoes } from "./Movimentacoes";
import { Objetivos } from "./Objetivos";
import { Usuarios } from "./Usuarios";

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

    @Column ({
        name: 'qtd_pontos_usados',
        type: 'int',
        nullable: false,
        default: 0
    })
    qtdPontosUsados: number

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


    @ManyToOne(() => Usuarios, (usuarios) => usuarios.contas)
    @JoinColumn([{ name: 'usuarios_id_fk', referencedColumnName: 'id' }])
    usuariosIdFK: Usuarios;


    @ManyToOne(() => Bancos, (bancos) => bancos.contas)
    @JoinColumn([{ name: 'bancos_id_fk', referencedColumnName: 'id' }])
    bancosIdFK: Bancos;


    @OneToMany(() => ContasAPagar, (contasAPagar) => contasAPagar.contasIdFK)
    contasAPagar: ContasAPagar[];

    @OneToMany(() => Movimentacoes, (movimentacoes) => movimentacoes.contasIdFK)
    movimentacoes: Movimentacoes[];

    @OneToMany(() => Objetivos, (objetivos) => objetivos.contasIdFK)
    objetivos: Objetivos[];

    

}
