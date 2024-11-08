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
            return res.status(400).json({ message: 'Error creating genre.', error: error.message });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const genres = await this.genreService.list();
            return res.status(200).json(genres);
        } catch (error) {
            return res.status(500).json({ message: 'Error listing genres.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const genre: Partial<Genre> = req.body;
            await this.genreService.update(id, genre);
            return res.status(200).json({ message: `Genre with ID ${id} updated successfully.` });
        } catch (error) {
            return res.status(400).json({ message: 'Error updating genre.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const genre = await this.genreService.remove(id);
            return res.status(200).json({ message: `Genre with ID ${id} deleted successfully.`, genre });
        } catch (error) {
            return res.status(400).json({ message: 'Error deleting genre.', error: error.message });
        }
    }
}

