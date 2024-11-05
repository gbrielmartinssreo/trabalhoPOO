import { Genre } from '../entity/Genre';
import { GenreRepository } from '../repository/GenreRepository';

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

  async findOne(id: number): Promise<Genre | undefined> {
    return await this.genreRepository.findOne(id);
  }

  async find(genre: Partial<Genre>): Promise<Genre | null> {
    return await this.genreRepository.find(genre);
  }

  async remove(id: number): Promise<boolean> {
    const genre = await this.genreRepository.findOne(id);
    if (!genre) {
      return false;
    }
    await this.genreRepository.remove(genre);
    return true;
  }

  async update(id: number, genre: Partial<Genre>): Promise<void> {
    await this.genreRepository.update(id, genre);
  }
}
