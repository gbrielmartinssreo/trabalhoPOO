import express, { Router, Request, Response } from "express";
import { GenreController } from "../controller/GenreController";

const router: Router = express.Router();
const genreController = new GenreController();

// Rota para criar um novo gênero
router.post("/", genreController.create);

// Rota para buscar todos os gêneros
router.get("/", genreController.findAll);

// Outras rotas para gêneros (se necessário)
// ...

export default router;
