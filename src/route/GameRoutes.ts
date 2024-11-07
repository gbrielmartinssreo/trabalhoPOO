import express, { Router, Request, Response } from "express";
import { GameController } from "../controller/GameController";

const router: Router = express.Router();
const gameController = new GameController();

// Rota para criar um novo jogo
router.post("/", gameController.create);

// Rota para buscar todos os jogos
router.get("/", gameController.findAll);

// Outras rotas para jogos (se necessário)
// ...

export default router;
