import { EntityRepository, Repository } from 'typeorm';
import { Game } from './Game';
import { GameStoreRepository } from './GameStoreRepository';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
    async create(c: Game): Promise<Game> {
        return await this.repositorio.save(c);
    }

    async findAll(): Promise<Game[]> {
        return await this.repositorio.find();
    }

    async findById(id: number): Promise<Game | undefined> {
        return await this.repositorio.findOneBy({ id });
    }

    async find(game: Partial<Game>): Promise<Game | null> {
        return await this.repositorio.findOne({ where: game });
    }

    async remove(c: Game): Promise<Game> {
        return await this.repositorio.remove(c);
    }

    async update(id: number, c: Partial<Game>): Promise<void> {
        await this.repositorio.update(id, c);
    }

    async deleteGame(gameId: number): Promise<void> {
        await this.delete(gameId);

        const gameStoreRepository = getRepository(GameStoreRepository);
        await gameStoreRepository.delete({ gameId });
    }
}
