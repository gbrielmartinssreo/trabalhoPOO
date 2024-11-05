import {Entity,PrimaryGeneratedColumn,Column,ManyToOne} from "typeorm";
import {Game} from "Game";

@Entity
export class Genre{

	@PrimaryGeneratedColumn
	id:number;

	@Column
	name:string;

	@ManyToOne(()=>Game,(game)=>game.genre,{nullable:true})
	game:Game|null;


	constructor(name?:string){
		this.name=name;
	}
}
