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

  async remove(gameId: number): Promise<void> {
    try {
      await this.gameRepository.delete(gameId);
    } catch (error) {
      console.error('Erro ao excluir jogo:', error);
    }
  }

  async update(id: number, game: Partial<Game>): Promise<void> {
    try {
      await this.gameRepository.update(id, game);
    } catch (error) {
      console.error('Erro ao atualizar jogo:', error);
    }
  }
}
