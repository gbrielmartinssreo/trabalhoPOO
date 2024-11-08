import { GameRepository } from '../repository/GameRepository';
import { Game } from '../entity/Game';

export class GameService {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository();
  }

  async create(game: Game): Promise<Game> {
    try {
      return await this.gameRepository.create(game);
    } catch (error) {
      console.error("Erro ao criar o jogo:", error);
      throw error;
    }
  }

  async list(): Promise<Game[]> {
    try {
      return await this.gameRepository.list();
    } catch (error) {
      console.error("Erro ao listar jogos:", error);
      throw error;
    }
  }

 
  async obtain(id: number): Promise<Game> {
    return await this.gameRepository.obtain(id);
  }

  async research(game: Partial<Game>): Promise<Game | null> {
    return await this.gameRepository.research(game);
  }

  async remove(id: number): Promise<boolean> {
    try {
      const game = await this.gameRepository.obtain(id);
      if (!game) {
        return false;
      }
      await this.gameRepository.remove(game);
      return true;
    } catch (error) {
      console.error("Erro ao remover gênero:", error);
      return false;
    }
  }

  async update(id: number, game: Partial<Game>): Promise<void> {
    try {
      await this.gameRepository.update(id, game);
    } catch (error) {
      console.error("Erro ao atualizar gênero:", error);
    }
  }
}
