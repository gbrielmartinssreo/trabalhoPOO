import { Request, Response } from 'express';
import { PlayerService } from '../service/PlayerService';

export class PlayerController {
  private playerService: PlayerService;

  constructor() {
    this.playerService = new PlayerService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const player = req.body;
      const newPlayer = await this.playerService.create(player);
      return res.status(201).json(newPlayer);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao criar jogador.', error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const players = await this.playerService.list();
      return res.status(200).json(players);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar jogadores.', error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.params.email;
      const playerData = req.body;
      await this.playerService.update(email, playerData);
      return res.status(200).json({ message: `Jogador ${email} atualizado com sucesso.` });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar jogador.', error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.params.email;
      await this.playerService.deletePlayer(email);
      return res.status(200).json({ message: `Jogador ${email} deletado com sucesso.` });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao deletar jogador.', error: error.message });
    }
  }

  async buyGame(req: Request, res: Response): Promise<Response> {
    try {
      const { email, gameId, storeId } = req.body;
      const success = await this.playerService.buyGame(email, gameId, storeId);
      if (success) return res.status(200).json({ message: 'Compra realizada com sucesso.' });
      else return res.status(400).json({ message: 'Erro ao realizar a compra.' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao comprar jogo.', error: error.message });
    }
  }

  async research(req: Request, res: Response): Promise<Response> {
    try {
      const playerData = req.body;
      const player = await this.playerService.research(playerData);
      if (!player) return res.status(404).json({ message: 'Jogador não encontrado.' });
      return res.status(200).json(player);
    } catch (error) {
      return res.status(500).json({ message: 'Erro na pesquisa de jogador.', error: error.message });
    }
  }

  async addLicenseToPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const { email, licenseId } = req.body;
      const success = await this.playerService.addLicenseToPlayer(email, licenseId);
      if (success) return res.status(200).json({ message: 'Licença adicionada ao jogador com sucesso.' });
      else return res.status(400).json({ message: 'Erro ao adicionar licença ao jogador.' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao adicionar licença.', error: error.message });
    }
  }

  async removeLicenseFromPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const { email, licenseId } = req.body;
      const success = await this.playerService.removeLicenseFromPlayer(email, licenseId);
      if (success) return res.status(200).json({ message: 'Licença removida do jogador com sucesso.' });
      else return res.status(400).json({ message: 'Erro ao remover licença do jogador.' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao remover licença.', error: error.message });
    }
  }
}
