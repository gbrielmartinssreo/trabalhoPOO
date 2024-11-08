import { StoreRepository } from '../repository/StoreRepository';
import { Store } from '../entity/Store';

export class StoreService {
  private storeRepository: StoreRepository;

  constructor() {
    this.storeRepository = new StoreRepository();
  }

  async create(store: Store): Promise<Store> {
    return await this.storeRepository.create(store);
  }

  async list(): Promise<Store[]> {
    return await this.storeRepository.list();
  }

  async obtain(id: number): Promise<Store> {
    return await this.storeRepository.obtain(id);
  }

  async research(store: Partial<Store>): Promise<Store | null> {
    return await this.storeRepository.research(store);
  }

  async remove(id: number): Promise<boolean> {
    try {
      const store = await this.storeRepository.obtain(id);
      if (!store) {
        return false;
      }
      await this.storeRepository.remove(store);
      return true;
    } catch (error) {
      console.error("Erro ao remover loja:", error);
      return false;
    }
  }

  async update(id: number, store: Partial<Store>): Promise<void> {
    try {
      await this.storeRepository.update(id, store);
    } catch (error) {
      console.error("Erro ao atualizar loja:", error);
    }
  }
}
