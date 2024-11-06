import { Store } from '../entity/Store';
import { StoreRepository } from '../repository/StoreRepository';

export class StoreService {
  private storeRepository: StoreRepository;

  constructor() {
    this.storeRepository = new StoreRepository();
  }

  async create(store: Store): Promise<Store> {
    return await this.storeRepository.create(store);
  }

  async findAll(): Promise<Store[]> {
    return await this.storeRepository.findAll();
  }

  async findById(id: number): Promise<Store | undefined> {
    return await this.storeRepository.findOne(id);
  }

  async find(store: Partial<Store>): Promise<Store | null> {
    return await this.storeRepository.find(store);
  }

  async remover(id: number): Promise<boolean> {
    try {
      const store = await this.storeRepository.findOne(id);
      if (!store) {
        return false;
      }
      await this.storeRepository.remove(store);
      return true;
    } catch (error) {
      console.error('Erro ao excluir loja:', error);
      return false;
    }
  }

  async atualizar(id: number, store: Partial<Loja>): Promise<void> {
    try {
      await this.storeRepository.update(id, store);
    } catch (error) {
      console.error('Erro ao atualizar loja:', error);
    }
  }
}
