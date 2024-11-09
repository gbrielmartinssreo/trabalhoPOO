/*
 * Aqui nao tem muito segredo, eh so uma classe para armazenar informacao sobre o genero
 * como o genero nao precisa se conectar ao jogo, posso omiti-lo, apesar do jogo estar conectado com o genero
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Game } from "./Game";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Game, (game) => game.genres)
  game:Game;

}
