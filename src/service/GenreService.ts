import { GenreRepository } from '../repository/GenreRepository';
import { Genre } from '../entity/Genre';

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }

  async create(genre: Genre): Promise<Genre> {
    return await this.genreRepository.create(genre);
  }

  async list(): Promise<Genre[]> {
    return await this.genreRepository.list();
  }

  async obtain(id: number): Promise<Genre> {
    return await this.genreRepository.obtain(id);
  }

  async research(genre: Partial<Genre>): Promise<Genre | null> {
    return await this.genreRepository.research(genre);
  }

  async remove(id: number): Promise<boolean> {
    try {
      const genre = await this.genreRepository.obtain(id);
      if (!genre) {
        return false;
      }
      await this.genreRepository.remove(genre);
      return true;
    } catch (error) {
      console.error("Erro ao remover gênero:", error);
      return false;
    }
  }

  async update(id: number, genre: Partial<Genre>): Promise<void> {
    try {
      await this.genreRepository.update(id, genre);
    } catch (error) {
      console.error("Erro ao atualizar gênero:", error);
    }
  }
}
