import { Request, Response } from 'express';
import { GenreService } from '../service/GenreService';
import { Genre } from '../entity/Genre';

export class GenreController {
    private genreService: GenreService;

    constructor() {
        this.genreService = new GenreService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const genre: Genre = req.body;
            const newGenre = await this.genreService.create(genre);
            return res.status(201).json(newGenre);
        } catch (error) {
            return res.status(400).json({ message: 'Erro na criacao de genero.', error: error.message });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const genres = await this.genreService.list();
            return res.status(200).json(genres);
        } catch (error) {
            return res.status(500).json({ message: 'Erro na listagem de generos.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const genre: Partial<Genre> = req.body;
            await this.genreService.update(id, genre);
            return res.status(200).json({ message: `Genero com ${id} atualizado com sucesso.` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar genero.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const genre = await this.genreService.remove(id);
            return res.status(200).json({ message: `Genero com ID ${id} deletado com sucesso.`, genre });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar genero.', error: error.message });
        }
    }
}

