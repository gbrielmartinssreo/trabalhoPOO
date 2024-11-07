import { Request, Response } from 'express';
import { GameService } from '../service/GameService';

export class GameController {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  async create(req: Request, res: Response) {
    try {
      const game = req.body; // Obter o game do corpo da requisição
      const createdGame = await this.gameService.create(game);
      res.status(201).json(createdGame);
    } catch (error) {
      console.error('Erro ao criar jogo:', error);
      res.status(500).json({ message: 'Erro ao criar jogo' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const games = await this.gameService.findAll();
      res.json(games);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      res.status(500).json({ message: 'Erro ao buscar jogos' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id); // Obter o ID do parâmetro da URL
      const game = await this.gameService.findById(id);
      if (game) {
        res.json(game);
      } else {
        res.status(404).json({ message: 'Jogo não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar jogo por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar jogo por ID' });
    }
  }

  // ... (adicionar métodos para outras operações, como findPartial, delete, update, etc.)
}
