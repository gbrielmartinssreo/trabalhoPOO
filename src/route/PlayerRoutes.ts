import express from 'express';
import { PlayerController } from '../controller/PlayerController';

const playerRouter = express.Router();
const playerController = new PlayerController();

playerRouter.get('/', (req, res) => { playerController.list(res,req); });
playerRouter.post('/', (req, res) => { playerController.create(req,res); });
playerRouter.put('/:email', (req, res) => { playerController.update(req, res); });
playerRouter.delete('/:email', (req, res) => { playerController.delete(req,res); });

// Rotas adicionais para gerenciar licenças do jogador
playerRouter.post('/:email/licenses/:licenseId', (req, res) => { playerController.addLicenseToPlayer(req, res); });
playerRouter.delete('/:email/licenses/:licenseId', (req, res) => { playerController.removeLicenseFromPlayer(req, res); });

export default playerRouter;

