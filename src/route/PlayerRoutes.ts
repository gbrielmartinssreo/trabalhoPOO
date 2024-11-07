import express, { Router, Request, Response } from "express";
import { PlayerController } from "../controller/PlayerController";

const router: Router = express.Router();
const playerController = new PlayerController();

// Rota para criar um novo jogador
router.post("/", playerController.create);

// Rota para buscar todos os jogadores
router.get("/", playerController.findAll);

// Outras rotas para jogadores (se necessário)
// ...

export default router;
