import express, { Router, Request, Response } from "express";
import { GameStoreController } from "../controller/GameStoreController";

const router: Router = express.Router();
const gameStoreController = new GameStoreController();

// Rota para associar um jogo a uma loja
router.post("/", gameStoreController.create);

// Rota para buscar todos os jogos associados a lojas
router.get("/", gameStoreController.findAll);

// Rota para buscar jogos por loja
router.get("/stores/:storeId", gameStoreController.findGamesByStoreId);

// Rota para buscar o preço de um jogo em uma loja
router.get(
  "/games/:gameId/stores/:storeId",
  gameStoreController.findGamePriceByGameIdAndStoreId
);

// Outras rotas para associação de jogos a lojas (se necessário)
// ...

export default router;
