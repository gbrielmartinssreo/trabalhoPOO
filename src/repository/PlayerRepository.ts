import { EntityRepository, Repository } from 'typeorm';
import { Player } from './Player';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
  async create(c: Player): Promise<Player> {
    return await this.repositorio.save(c);
  }

  async findAll(): Promise<Player[]> {
    return await this.repositorio.find();
  }

  async findById(email: string): Promise<Player | undefined> {
    return await this.repositorio.findOneBy({ email });
  }

  async find(player: Partial<Player>): Promise<Player | null> {
    return await this.repositorio.findOne({ where: player });
  }

  async remove(c: Player): Promise<Player> {
    return await this.repositorio.remove(c);
  }

  async update(email: string, c: Partial<Player>): Promise<void> {
    await this.repositorio.update({ email }, c);
  }
}