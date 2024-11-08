import express from 'express';
import { StoreController } from '../controller/StoreController';

const storeRouter = express.Router();
const storeController = new StoreController();

storeRouter.get('/', (req, res) => { storeController.list(req, res); });
storeRouter.post('/', (req, res) => { storeController.create(req, res); });
storeRouter.put('/:id', (req, res) => { storeController.update(req, res); });
storeRouter.delete('/:id', (req, res) => { storeController.delete(req, res); });

export default storeRouter;

