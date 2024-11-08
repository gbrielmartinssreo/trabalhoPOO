import express from 'express';
import { GameController } from '../controller/GameController';

const gameRouter = express.Router();
const gameController = new GameController();

gameRouter.get('/', (req, res) => { gameController.list(req, res); });
gameRouter.post('/', (req, res) => { gameController.create(req, res); });
gameRouter.put('/:id', (req, res) => { gameController.update(req, res); });
gameRouter.delete('/:id', (req, res) => { gameController.delete(req, res); });

export default gameRouter;

