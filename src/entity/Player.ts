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

	@Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  	balance: number;

	@ManyToMany(()=>Game,(game)=>game.player,{
		cascade:true,
	})
	@JoinTable()
	games:Game[];

	constructor(email?:string,name?:string,password?:string,balance?:number,games?:Game[]){
		this.email=email;
		this.name=name;
		this.password=password;
		this.balance=balance || 0;
		this.games=games || [];
	}
}
