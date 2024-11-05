import { Repository } from 'typeorm';
import {database} from "../data-source";
import { GameStore } from '../entity/GameStore';

export class GameStoreRepository{
	private repository:Repository<GameStore>;

	constructor(){
		this.repository=database.getRepository(GameStore);
	}

  	async create(c: GameStore): Promise<GameStore> {
    		return await this.repository.save(c);
  	}

  	async findAll(): Promise<GameStore[]> {
    		return await this.repository.find();
  	}

  	async findById(id: number): Promise<GameStore | undefined> {
    		return await this.repository.findOneBy({ id });
  	}

  	async find(gameStore: Partial<GameStore>): Promise<GameStore | null> {
    		return await this.repository.findOne({ where: gameStore });
  	}

  	async remove(c: GameStore): Promise<GameStore> {
    		return await this.repository.remove(c);
  	}

  	async update(id: number, c: Partial<GameStore>): Promise<void> {
    		await this.repository.update(id, c);
  	}

  	async deleteGameStoreByGameId(gameId: number): Promise<void> {
    		await this.repository.delete(gameId);
  	}
}
