import { Request, Response } from "express";
import { GameStoreService } from "../service/GameStoreService";

export class GameStoreController {
  private gameStoreService: GameStoreService;

  constructor() {
    this.gameStoreService = new GameStoreService();
  }

  async create(req: Request, res: Response) {
    try {
      const gameStore = req.body;
      const createdGameStore = await this.gameStoreService.create(gameStore);
      res.status(201).json(createdGameStore);
    } catch (error) {
      console.error("Erro ao criar GameStore:", error);
      res.status(500).json({ message: "Erro ao criar GameStore" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const gameStores = await this.gameStoreService.findAll();
      res.json(gameStores);
    } catch (error) {
      console.error("Erro ao buscar GameStores:", error);
      res.status(500).json({ message: "Erro ao buscar GameStores" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const gameStore = await this.gameStoreService.findById(id);
      if (gameStore) {
        res.json(gameStore);
      } else {
        res.status(404).json({ message: "GameStore não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar GameStore por ID:", error);
      res.status(500).json({ message: "Erro ao buscar GameStore por ID" });
    }
  }

  // ... (adicionar métodos para outras operações)

  async findGamesByStoreId(req: Request, res: Response) {
    try {
      const storeId = parseInt(req.params.storeId);
      const gameStores = await this.gameStoreService.findGamesByStoreId(
        storeId
      );
      res.json(gameStores);
    } catch (error) {
      console.error("Erro ao buscar jogos por loja:", error);
      res.status(500).json({ message: "Erro ao buscar jogos por loja" });
    }
  }

  async findGamePriceByGameIdAndStoreId(req: Request, res: Response) {
    try {
      const gameId = parseInt(req.params.gameId);
      const storeId = parseInt(req.params.storeId);
      const price = await this.gameStoreService.findGamePriceByGameIdAndStoreId(
        gameId,
        storeId
      );
      if (price !== undefined) {
        res.json({ price });
      } else {
        res.status(404).json({ message: "Jogo não encontrado na loja" });
      }
    } catch (error) {
      console.error("Erro ao buscar o preço do jogo:", error);
      res.status(500).json({ message: "Erro ao buscar o preço do jogo" });
    }
  }
}

