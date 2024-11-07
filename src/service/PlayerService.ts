import { PlayerRepository } from "../repository/PlayerRepository";
import { Player } from "../entity/Player";
import { GameStoreService } from "./GameStoreService";
import { Game } from "../entity/Game";
import { GameRepository } from "../repository/GameRepository";

export class PlayerService {
  private playerRepository: PlayerRepository;
  private gameStoreService: GameStoreService;
  private gameRepository: GameRepository;

  constructor() {
    this.playerRepository = new PlayerRepository();
    this.gameStoreService = new GameStoreService();
    this.gameRepository = new GameRepository();
  }

  async create(player: Player): Promise<Player> {
    return await this.playerRepository.create(player);
  }

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.findAll();
  }

  async findById(email: string): Promise<Player | undefined> {
    return await this.playerRepository.findById(email);
  }

  async findPartial(playerPartial: Partial<Player>): Promise<Player | null> {
    return await this.playerRepository.findPartial(playerPartial);
  }

  async buyGame(playerId: string, gameId: number, storeId: number): Promise<boolean> {

    try {
      const player = await this.playerRepository.findById(playerId);
      const gamePrice = await this.gameStoreService.findGamePriceByGameIdAndStoreId(gameId, storeId);

      if (!player || !gamePrice) {
        return false;
      }

      if (player.games.some((game) => game.id === gameId)) {
        return false; // Já possui o jogo
      }

      if (player.balance >= gamePrice) {
        // Adiciona o jogo à lista de jogos do jogador
        const game = await this.gameRepository.findById(gameId); // Obtenha o objeto Game
        if (game) {
          player.games.push(game);
        } else {
          console.error("Jogo não encontrado para adicionar.");
          return false;
        }

        // Atualiza o saldo do jogador
        player.balance -= gamePrice;
        await this.playerRepository.create(player); // Utilize save para atualizar o jogador
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao comprar jogo:', error);
      return false;
    }
  }
}
