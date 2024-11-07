import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Game } from "./Game";
import { GameStore } from "./GameStore";

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => GameStore, (gameStore) => gameStore.store)
  games: GameStore[];

  constructor(games?: GameStore[]) {
    this.games = games;
  }
}
