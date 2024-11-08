import { Request, Response } from 'express';
import { GameService } from '../service/GameService';
import { Game } from '../entity/Game';

export class GameController {
    private gameService: GameService;

    constructor() {
        this.gameService = new GameService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const game: Game = req.body;
            const newGame = await this.gameService.create(game);
            return res.status(201).json(newGame);
        } catch (error) {
            return res.status(400).json({ message: 'Error creating game.', error: error.message });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const games = await this.gameService.list();
            return res.status(200).json(games);
        } catch (error) {
            return res.status(500).json({ message: 'Error listing games.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const game: Partial<Game> = req.body;
            await this.gameService.update(id, game);
            return res.status(200).json({ message: `Game with ID ${id} updated successfully.` });
        } catch (error) {
            return res.status(400).json({ message: 'Error updating game.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const game = await this.gameService.remove(id);
            return res.status(200).json({ message: `Game with ID ${id} deleted successfully.`, game });
        } catch (error) {
            return res.status(400).json({ message: 'Error deleting game.', error: error.message });
        }
    }
}

