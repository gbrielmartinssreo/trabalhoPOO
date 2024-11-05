import { Repository } from "typeorm";
import {database} from "../data-source";
import { Player } from "../entity/Player";

export class PlayerRepository{
	private repository:Repository<Player>;

	constructor(){
		this.repository=database.getRepository(Player);
	}

  	async create(c: Player): Promise<Player> {
    		return await this.repository.save(c);
  	}

  	async findAll(): Promise<Player[]> {
    		return await this.repository.find();
  	}

  	async findById(email: string): Promise<Player | undefined> {
    		return await this.repository.findOneBy({ email });
  	}

  	async find(player: Partial<Player>): Promise<Player | null> {
    		return await this.repository.findOne({ where: player });
  	}

  	async remove(c: Player): Promise<Player> {
    		return await this.repository.remove(c);
  	}

  	async update(email: string, c: Partial<Player>): Promise<void> {
    		await this.repository.update({ email }, c);
  	}
}

