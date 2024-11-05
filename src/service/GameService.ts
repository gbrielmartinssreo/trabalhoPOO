import { Game } from '../entity/Game';
import { GameRepository } from '../repository/GameRepository';
import { GameStoreRepository } from '../repository/GameStoreRepository';

export class GameService {
  private gameRepository: GameRepository;
  private gameStoreRepository: GameStoreRepository;

  constructor() {
    this.gameRepository = new GameRepository();
    this.gameStoreRepository = new GameStoreRepository();
  }

  async create(game: Game): Promise<Game> {
    return await this.gameRepository.create(game);
  }

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.findAll();
  }

  async findOne(id: number): Promise<Game | undefined> {
    return await this.gameRepository.findOne(id);
  }

  async find(game: Partial<Game>): Promise<Game | null> {
    return await this.gameRepository.find(game);
  }

  async remove(c: Game): Promise<Game> {
    return await this.repository.remove(c);
  }

  async update(id: number, c: Partial<Game>): Promise<void> {
    await this.repository.update(id, c);
  }

  async deleteGame(gameId: number): Promise<void> {
    await this.gameRepository.delete(gameId);
  }
}
