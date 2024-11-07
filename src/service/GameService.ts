import { GameRepository } from "../repository/GameRepository";
import { Game } from "../entity/Game";

export class GameService {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository();
  }

  async create(game: Game): Promise<Game> {
    return await this.gameRepository.create(game);
  }

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.findAll();
  }

  async findById(id: number): Promise<Game | undefined> {
    return await this.gameRepository.findById(id);
  }

  async findPartial(game: Partial<Game>): Promise<Game | null> {
    return await this.gameRepository.findPartial(game);
  }

  async delete(game: Game): Promise<Game> {
    return await this.gameRepository.delete(game);
  }

  async update(id: number, game: Partial<Game>): Promise<void> {
    await this.gameRepository.upd(id, game);
  }

  async deleteGame(gameId: number): Promise<void> {
    await this.gameRepository.deleteGame(gameId);
  }
}
