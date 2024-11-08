import express from 'express';
import { LicenseController } from '../controller/LicenseController';

const licenseRouter = express.Router();
const licenseController = new LicenseController();

licenseRouter.get('/', (req, res) => { licenseController.list(req, res); });
licenseRouter.post('/', (req, res) => { licenseController.create(req, res); });
licenseRouter.put('/:id', (req, res) => { licenseController.update(req, res); });
licenseRouter.delete('/:id', (req, res) => { licenseController.delete(req, res); });

export default licenseRouter;

