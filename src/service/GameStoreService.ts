import { GameStoreRepository } from "../repository/GameStoreRepository";
import { GameStore } from "../entity/GameStore";

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

  async findById(id: number): Promise<GameStore | undefined> {
    return await this.gameStoreRepository.findById(id);
  }

  async findPartial(
    gameStore: Partial<GameStore>
  ): Promise<GameStore | null> {
    return await this.gameStoreRepository.findPartial(gameStore);
  }

  async delete(gameStore: GameStore): Promise<GameStore> {
    return await this.gameStoreRepository.delete(gameStore);
  }

  async update(id: number, gameStore: Partial<GameStore>): Promise<void> {
    await this.gameStoreRepository.upd(id, gameStore);
  }

  async deleteGameStoreByGameId(gameId: number): Promise<void> {
    await this.gameStoreRepository.deleteGameStoreByGameId(gameId);
  }

  // Busca jogos por loja
  async findGamesByStoreId(storeId: number): Promise<GameStore[]> {
    try {
      const gameStores = await this.gameStoreRepository.findGamesByStoreId(
        storeId
      );
      return gameStores;
    } catch (error) {
      console.error("Erro ao buscar jogos por loja:", error);
      return [];
    }
  }

  // Busca o preço de um jogo em uma loja
  async findGamePriceByGameIdAndStoreId(
    gameId: number,
    storeId: number
  ): Promise<number | undefined> {
    try {
      const price = await this.gameStoreRepository.findGamePriceByGameIdAndStoreId(
        gameId,
        storeId
      );
      return price;
    } catch (error) {
      console.error("Erro ao buscar o preço do jogo:", error);
      return undefined;
    }
  }
}

