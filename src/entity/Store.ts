
import {Entity,PrimaryGeneratedColumn,ManyToMany,JoinTable} from "typeorm";
import {Game} from "Game";
import {GameStore} from "GameStore";

@Entity
export class Store{
	@PrimaryGeneratedColumn
	id:number;

	@ManyToMany(() => Game, (game) => game.store)
	@JoinTable({
		name: "Game_Store",
	})
	games: GameStore[];

	constructor(games?:GameStore[]){
		this.games=games;
	}
}
