import { GenreRepository } from "../repository/GenreRepository";
import { Genre } from "../entity/Genre";

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }

  async create(genre: Genre): Promise<Genre> {
    return await this.genreRepository.create(genre);
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.findAll();
  }

  async findById(id: number): Promise<Genre | undefined> {
    return await this.genreRepository.findById(id);
  }

  async findPartial(genre: Partial<Genre>): Promise<Genre | null> {
    return await this.genreRepository.findPartial(genre);
  }

  async delete(genre: Genre): Promise<Genre> {
    return await this.genreRepository.delete(genre);
  }

  async update(id: number, genre: Partial<Genre>): Promise<void> {
    await this.genreRepository.upd(id, genre);
  }
}
