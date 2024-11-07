import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, Column, ManyToOne } from "typeorm";
import { Player } from "./Player";
import { Genre } from "./Genre";
import { Store } from "./Store";
import { GameStore } from "./GameStore";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  score: string;

  @Column()
  developer: string;

  @ManyToOne(() => Player, (player) => player.games)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Genre, (genre) => genre.game)
  genres: Genre[];

  @OneToMany(() => GameStore, (gameStore) => gameStore.game)
  stores: GameStore[];

  constructor(
    name?: string,
    score?: string,
    developer?: string,
    players?: Player[],
    genres?: Genre[]
  ) {
    this.name = name;
    this.score = score;
    this.developer = developer;
    this.players = players;
    this.genres = genres;
  }
}
