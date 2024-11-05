import {Entity,PrimaryGeneratedColumn,ManyToOne,Column,JoinColumn} from "typeorm";
import {Game} from "Game";
import {Store} from "Store";

@Entity()
export class GameStore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, (game) => game.store)
  @JoinColumn({ name: "game_id" })
  game: Game;

  @ManyToOne(() => Store, (store) => store.games)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  cost: number;
}
