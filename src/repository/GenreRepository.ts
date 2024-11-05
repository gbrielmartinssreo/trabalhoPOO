import { EntityRepository, Repository } from 'typeorm';
import { Genre } from './Genre';

@EntityRepository(Genre)
export class GenreRepository extends Repository<Genre> {
  async create(c: Genre): Promise<Genre> {
    return await this.repositorio.save(c);
  }

  async findAll(): Promise<Genre[]> {
    return await this.repositorio.find();
  }

  async findById(id: number): Promise<Genre | undefined> {
    return await this.repositorio.findOneBy({ id });
  }

  async find(genre: Partial<Genre>): Promise<Genre | null> {
    return await this.repositorio.findOne({ where: genre });
  }

  async remove(c: Genre): Promise<Genre> {
    return await this.repositorio.remove(c);
  }

  async update(id: number, c: Partial<Genre>): Promise<void> {
    await this.repositorio.update(id, c);
  }
}