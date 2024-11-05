import { EntityRepository, Repository } from 'typeorm';
import { Store } from './Store';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {
    async create(c: Store): Promise<Store> {
        return await this.repositorio.save(c);
    }

    async findAll(): Promise<Store[]> {
        return await this.repositorio.find();
    }

    async findById(id: number): Promise<Store | undefined> {
        return await this.repositorio.findOneBy({ id });
    }

    async find(Store: Partial<Store>): Promise<Store | null> {
        return await this.repositorio.findOne({ where: Store });
    }

    async remove(c: Store): Promise<Store> {
        return await this.repositorio.remove(c);
    }

    async update(id: number, c: Partial<Store>): Promise<void> {
        await this.repositorio.update(id, c);
    }
}
