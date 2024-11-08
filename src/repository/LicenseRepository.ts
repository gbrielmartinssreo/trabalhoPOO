import { Repository } from "typeorm";
import { License } from "../entity/License";
import { database } from "../data-source";

export class LicenseRepository {
  private repository: Repository<License>;

  constructor() {
    this.repository = database.getRepository(License);
  }

  async create(license: License): Promise<License> {
    return await this.repository.save(license);
  }

  async list(): Promise<License[]> {
    return await this.repository.find();
  }

   async research(license:Partial<License>):Promise<License|null>{
    return await this.repository.findOne({where:license});
  }

  async obtain(id: number): Promise<License | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async obtainByGameAndStore(gameId: number, storeId: number): Promise<License | null> {
    return await this.repository.findOne({
      where: {
        game: { id: gameId },
        store: { id: storeId },
      },
    });
  }

  async remove(license: License): Promise<void> {
    await this.repository.remove(license);
  }

  async update(id: number, license: Partial<License>): Promise<void> {
    await this.repository.update(id, license);
  }
}

