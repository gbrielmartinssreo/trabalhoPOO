import { Request, Response } from 'express';
import { GenreService } from '../service/GenreService';

export class GenreController {
  private genreService: GenreService;

  constructor() {
    this.genreService = new GenreService();
  }

  async create(req: Request, res: Response) {
    try {
      const genre = req.body;
      const createdGenre = await this.genreService.create(genre);
      res.status(201).json(createdGenre);
    } catch (error) {
      console.error('Erro ao criar gênero:', error);
      res.status(500).json({ message: 'Erro ao criar gênero' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const genres = await this.genreService.findAll();
      res.json(genres);
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      res.status(500).json({ message: 'Erro ao buscar gêneros' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const genre = await this.genreService.findById(id);
      if (genre) {
        res.json(genre);
      } else {
        res.status(404).json({ message: 'Gênero não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar gênero por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar gênero por ID' });
    }
  }

  // ... (adicionar métodos para outras operações)
}
