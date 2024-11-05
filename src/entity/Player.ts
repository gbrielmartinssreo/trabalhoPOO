import {Entity,PrimaryColumn,Column,ManyToMany,JoinTable} from "typeorm";
import {Game} from "Game";


@Entity()
export class Player{
	@PrimaryColumn()
	email:string;

	@Column()
	name:string;

	@Column()
	password:string;

	@ManyToMany(()=>Game,(game)=>game.player,{
		cascade:true,
	})
	@JoinTable()
	games:Game[];

	constructor(email?:string,name?:string,password?:string,games?:Game[]){
		this.email=email;
		this.name=name;
		this.password=password;
		this.games=games;
	}
}
