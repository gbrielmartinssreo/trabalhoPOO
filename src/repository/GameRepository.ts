import { Repository } from "typeorm";
import {database} from "../data-source";
import { Game } from "../entity/Game";

export class GameRepository{
	private repository:Repository<Game>;
	
	constructor(){
		this.repository=database.getRepository(Game);
	}

    	async create(c: Game): Promise<Game> {
        	return await this.repository.save(c);
    	}

    	async findAll(): Promise<Game[]> {
        	return await this.repository.find();
    	}

    	async findById(id: number): Promise<Game | undefined> {
        	return await this.repository.findOneBy({ id });
    	}

    	async find(game: Partial<Game>): Promise<Game | null> {
        	return await this.repository.findOne({ where: game });
    	}

    	async remove(c: Game): Promise<Game> {
        	return await this.repository.remove(c);
    	}

    	async update(id: number, c: Partial<Game>): Promise<void> {
        	await this.repository.update(id, c);
    	}

    	async deleteGame(gameId: number): Promise<void> {
        	await this.repository.delete(gameId);

    	}
}
