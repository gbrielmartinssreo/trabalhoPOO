import { GameStore } from '../entity/GameStore';
import { GameStoreRepository } from '../repository/GameStoreRepository';

export class GameStoreService {
  private gameStoreRepository: GameStoreRepository;

  constructor() {
    this.gameStoreRepository = new GameStoreRepository();
  }

  async create(gameStore: GameStore): Promise<GameStore> {
    return await this.gameStoreRepository.create(gameStore);
  }

  async findAll(): Promise<GameStore[]> {
    return await this.gameStoreRepository.findAll();
  }

  async findOne(id: number): Promise<GameStore | undefined> {
    return await this.gameStoreRepository.findOne(id);
  }

  async find(gameStore: Partial<GameStore>): Promise<GameStore | null> {
    return await this.gameStoreRepository.find(gameStore);
  }

  async remove(id: number): Promise<boolean> {
    try {
      const gameStore = await this.gameStoreRepository.findOne(id);
      if (!gameStore) {
        return false;
      }
      await this.gameStoreRepository.remove(gameStore);
      return true;
    } catch (error) {
      console.error('Erro ao excluir relação GameStore:', error);
      return false;
    }
  }

  async update(id: number, gameStore: Partial<GameStore>): Promise<void> {
    try {
      await this.gameStoreRepository.update(id, gameStore);
    } catch (error) {
      console.error('Erro ao atualizar relação GameStore:', error);
    }
  }
}
