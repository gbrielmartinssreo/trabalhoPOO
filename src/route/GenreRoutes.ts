import express from 'express';
import { GenreController } from '../controller/GenreController';

const genreRouter = express.Router();
const genreController = new GenreController();

genreRouter.get('/', (req, res) => { genreController.list(req, res); });
genreRouter.post('/', (req, res) => { genreController.create(req, res); });
genreRouter.put('/:id', (req, res) => { genreController.update(req, res); });
genreRouter.delete('/:id', (req, res) => { genreController.delete(req, res); });

export default genreRouter;

