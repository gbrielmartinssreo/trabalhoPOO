import {Entity,PrimaryGeneratedColumn,ManyToMany,JoinTable,OneToMany} from "typeorm";
import {Player} from "Player";
import {Genre} from "Genre";
import {Store} from "Store";
import {GameStore} from "GameStore";


@Entity()
export class Game{
	@PrimaryGeneratedColumn()
	id:number;

	@Column()
	name:string;

	@Column()
	score:string;

	@Column()
	developer:string;

	@ManyToMany(()=>Player,(player)=>player.games,{
		cascade:true,
	})
	@JoinTable()
	players:Player[];

	@OneToMany(()=>Genre,(genre)=>genre.game)
	genres:Genre[];

	@ManyToMany(() => Store, (store) => store.games)
	@JoinTable({
		name: "Game_Store",
	})

	store: GameStore[];
}


constructor(name?:string,score?:string,developer?:string,players?:Player[],genres?:Genre[]){
	this.name=name;
	this.score=score;
	this.developer=developer;
	this.players=players;
	this.genres=genres;
}
}
