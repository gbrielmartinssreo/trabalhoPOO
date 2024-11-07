import express, { Router, Request, Response } from "express";
import { StoreController } from "../controller/StoreController";

const router: Router = express.Router();
const storeController = new StoreController();

// Rota para criar uma nova loja
router.post("/", storeController.create);

// Rota para buscar todas as lojas
router.get("/", storeController.findAll);

// Outras rotas para lojas (se necessário)
// ...

export default router;
