import { Request, Response } from 'express';
import { PlayerService } from '../service/PlayerService';

export class PlayerController {
  private playerService: PlayerService;

  constructor() {
    this.playerService = new PlayerService();
  }

  async create(req: Request, res: Response) {
    try {
      const player = req.body;
      const createdPlayer = await this.playerService.create(player);
      res.status(201).json(createdPlayer);
    } catch (error) {
      console.error('Erro ao criar jogador:', error);
      res.status(500).json({ message: 'Erro ao criar jogador' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const players = await this.playerService.findAll();
      res.json(players);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      res.status(500).json({ message: 'Erro ao buscar jogadores' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const player = await this.playerService.findById(email);
      if (player) {
        res.json(player);
      } else {
        res.status(404).json({ message: 'Jogador não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar jogador por email:', error);
      res.status(500).json({ message: 'Erro ao buscar jogador por email' });
    }
  }

  // ... (adicionar métodos para outras operações)
}
