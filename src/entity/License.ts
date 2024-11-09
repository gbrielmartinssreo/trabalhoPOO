/*
 * dsdsd
 * primeiramente, acho importante explicar um pouco de pq licenca, eh pq quando compramos um jogo, na steam por exemplo
 * estamos adquirindo uma licenca, nao o jogo em si, palavras da propria empresa valve, embora a afirmacao sempre fosse verdade,
 * muita gente nao sabia
 *
 * licenca vai se comunicar com muitas entidades:
 *  - game, ja que toda licenca corresponde a um jogo especifico
 *  - store, essa licenca veio de uma loja e so pode ser comprada por la
 *  - player, vai ser vazio ate que alguem compre, dai ela vai se relacionar com quem comprou
 *
 *  ela tambem vai ter a informacao do preco de forma meio individual, isso pode ser interessante
 *  para se usar como comprovante de compra, ja q o atributo preco vai se manter apos a venda
 */


import { Entity, PrimaryGeneratedColumn, ManyToOne, Column} from "typeorm";
import { Game } from "./Game";
import { Store } from "./Store";
import { Player } from "./Player";


@Entity()
export class License {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, (game) => game.licenses)
  game: Game;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Store, (store) => store.licenses, { cascade: ["remove"] })
  store: Store;

  @ManyToOne(() => Player, (player) => player.licenses)
  player:Player;

}
