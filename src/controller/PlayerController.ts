import { PlayerRepository } from "../repository/PlayerRepository";
import { Player } from "../entity/Player";
import { GameRepository } from "../repository/GameRepository";
import { LicenseRepository } from "../repository/LicenseRepository";
import { License } from "../entity/License";

export class PlayerController {
  private playerRepository: PlayerRepository;
  private gameRepository: GameRepository;
  private licenseRepository: LicenseRepository;

  constructor() {
    this.playerRepository = new PlayerRepository();
    this.gameRepository = new GameRepository();
    this.licenseRepository = new LicenseRepository();
  }

  async create(player: Player): Promise<Player> {
    return await this.playerRepository.create(player);
  }

  async list(): Promise<Player[]> {
    return await this.playerRepository.list();
  }

  async obtain(email: string): Promise<Player | undefined> {
    return await this.playerRepository.obtain(email);
  }

  async update(email: string, player: Partial<Player>): Promise<void> {
        await this.playerRepository.update(email, player);
    }

  async research(player: Partial<Player>): Promise<Player | null> {
    return await this.playerRepository.research(player);
  }

  async buyGame(email: string, gameId: number, storeId: number): Promise<boolean> {
    try {
      const player = await this.playerRepository.obtain(email);
      const game = await this.gameRepository.obtain(gameId);
      const license = await this.licenseRepository.obtainByGameAndStore(gameId, storeId);

      if (!player || !game || !license) {
        console.error("Erro: Player, Game ou License não encontrados.");
        return false;
      }

      if (player.licenses.some((lic) => lic.game.id === gameId)) {
        console.error("O jogador já possui uma licença para este jogo.");
        return false;
      }

      if (player.balance < license.price) {
        console.error("Saldo insuficiente para comprar a licença.");
        return false;
      }

      // Adiciona a licença ao jogador e atualiza o saldo
      player.licenses.push(license);
      player.balance -= license.price;

      // Remove a licença da loja
      await this.licenseRepository.remove(license);

      // Atualiza o jogador
      await this.playerRepository.update(email, player);

      console.log("Compra realizada com sucesso.");
      return true;
    } catch (error) {
      console.error('Erro ao processar a compra:', error);
      return false;
    }
  }

  async addLicenseToPlayer(email: string, licenseId: number): Promise<boolean> {
    try {
      const player = await this.playerRepository.obtain(email);
      const license = await this.licenseRepository.obtain(licenseId);

      if (!player || !license) {
        console.error("Erro: Player ou License não encontrados.");
        return false;
      }

      if (player.licenses.some((lic) => lic.id === licenseId)) {
        console.error("O jogador já possui esta licença.");
        return false;
      }

      player.licenses.push(license);
      await this.playerRepository.update(email, player);

      console.log("Licença adicionada ao jogador com sucesso.");
      return true;
    } catch (error) {
      console.error("Erro ao adicionar licença:", error);
      return false;
    }
  }

  async removeLicenseFromPlayer(email: string, licenseId: number): Promise<boolean> {
    try {
      const player = await this.playerRepository.obtain(email);
      if (!player) {
        console.error("Erro: Jogador não encontrado.");
        return false;
      }

      const licenseIndex = player.licenses.findIndex((lic) => lic.id === licenseId);
      if (licenseIndex === -1) {
        console.error("Licença não encontrada no jogador.");
        return false;
      }

      player.licenses.splice(licenseIndex, 1);
      await this.playerRepository.update(email, player);

      console.log("Licença removida do jogador com sucesso.");
      return true;
    } catch (error) {
      console.error("Erro ao remover licença:", error);
      return false;
    }
  }

  async deletePlayer(email: string): Promise<boolean> {
    try {
      const player = await this.playerRepository.obtain(email);
      if (!player) {
        console.error("Erro: Jogador não encontrado.");
        return false;
      }

      await this.playerRepository.remove(player);

      console.log("Jogador removido com sucesso.");
      return true;
    } catch (error) {
      console.error("Erro ao remover jogador:", error);
      return false;
    }
  }
}

