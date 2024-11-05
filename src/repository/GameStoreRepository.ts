import { EntityRepository, Repository } from 'typeorm';
import { GameStore } from './GameStore';

@EntityRepository(GameStore)
export class GameStoreRepository extends Repository<GameStore> {
  async create(c: GameStore): Promise<GameStore> {
    return await this.repositorio.save(c);
  }

  async findAll(): Promise<GameStore[]> {
    return await this.repositorio.find();
  }

  async findById(id: number): Promise<GameStore | undefined> {
    return await this.repositorio.findOneBy({ id });
  }

  async find(gameStore: Partial<GameStore>): Promise<GameStore | null> {
    return await this.repositorio.findOne({ where: gameStore });
  }

  async remove(c: GameStore): Promise<GameStore> {
    return await this.repositorio.remove(c);
  }

  async update(id: number, c: Partial<GameStore>): Promise<void> {
    await this.repositorio.update(id, c);
  }

  async deleteGameStoreByGameId(gameId: number): Promise<void> {
    await this.delete({ gameId }); 
  }
}