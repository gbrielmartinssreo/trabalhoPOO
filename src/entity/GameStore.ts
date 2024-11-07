import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Game } from "./Game";
import { Store } from "./Store";

@Entity()
export class GameStore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, (game) => game.stores)
  @JoinColumn()
  game: Game;

  @ManyToOne(() => Store, (store) => store.games)
  @JoinColumn()
  store: Store;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;
}
