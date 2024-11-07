import { StoreRepository } from "../repository/StoreRepository";
import { Store } from "../entity/Store";

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
    return await this.storeRepository.findById(id);
  }

  async findPartial(store: Partial<Store>): Promise<Store | null> {
    return await this.storeRepository.findPartial(store);
  }

  async delete(store: Store): Promise<Store> {
    return await this.storeRepository.delete(store);
  }

  async update(id: number, store: Partial<Store>): Promise<void> {
    await this.storeRepository.upd(id, store);
  }
}
