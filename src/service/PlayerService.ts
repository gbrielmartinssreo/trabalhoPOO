import { Player } from '../entity/Player';
import { PlayerRepository } from '../repository/PlayerRepository';
import { GameStoreRepository } from '../repository/GameStoreRepository';
import { GameRepository } from '../repository/GameRepository';
import { GameStore } from '../entity/GameStore';

export class PlayerService {
  private playerRepository: PlayerRepository;
  private gameStoreRepository: GameStoreRepository;
  private gameRepository: GameRepository;

  constructor() {
    this.playerRepository = new PlayerRepository();
    this.gameStoreRepository = new GameStoreRepository();
    this.gameRepository = new GameRepository();
  }

  async create(player: Player): Promise<Player> {
    return await this.playerRepository.create(player);
  }

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.findAll();
  }

  async findOne(email: string): Promise<Player | undefined> {
    return await this.playerRepository.findOne(email);
  }

  async find(player: Partial<Player>): Promise<Player | null> {
    return await this.playerRepository.find(player);
  }

  async remove(email: string): Promise<boolean> {
    const player = await this.playerRepository.findOne(email);
    if (!player) {
      return false;
    }
    await this.playerRepository.remove(player);
    return true;
  }

  async update(email: string, player: Partial<Player>): Promise<void> {
    await this.playerRepository.update(email, player);
  }

  async buyGame(playerId: string, gameId: number, storeId: number): Promise<boolean> {
    try {
      const player = await this.playerRepository.findOne(playerId);
      const gameStore = await this.gameStoreRepository.findOne({
        where: {
          gameId,
          storeId,
        },
      });

      if (!player || !gameStore) {
        return false;
      }

      if (player.games.some((game) => game.id === gameId)) {
        return false; // Já possui o jogo
      }

      if (player.balance >= gameStore.price) {
        // Adiciona o jogo à lista de jogos do jogador
        player.games.push(await this.gameRepository.findOne(gameId));
        // Atualiza o saldo do jogador
        player.balance -= gameStore.price;
        await this.playerRepository.update(playerId, player);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao comprar jogo:', error);
      return false;
    }
  }
}
