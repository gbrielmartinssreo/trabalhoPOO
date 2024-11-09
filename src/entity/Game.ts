/*
 * A entidade/tabela/classe desse codigo tem o proposito de representar um objeto de jogo, no caso o jogo em si, contendo
 * informacoes como 
 * -nome do jogo, 
 * -classificacao de quao bom ele eh, 
 * -os generos que ele cobre, 
 * -as licencas em posse dos jogadores, 
 * -a desenvolvedora e claro, 
 * -a sua chave sintetica ja que nao consegui pensar em um atributo muito unico pra um jogo que nao seja um id 
 *  que incrementa automatico.
 */

import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Genre } from "./Genre";
import { License } from "./License";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  name: string;

  @Column({nullable:true})
  score: string;

  @Column({nullable:true})
  developer: string;

  //aqui eu to falando que um jogo pode ter varios generos, em genre eu vo fazer uma gambiarra pra genero nao ter game
  @OneToMany(()=> Genre, (genre) => genre.game)
  genres: Genre[]

  @OneToMany(() =>  License, (license) => license.game, { cascade: ["remove"] })
  licenses: License[];

}
