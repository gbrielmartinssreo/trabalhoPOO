import { LicenseRepository } from '../repository/LicenseRepository';
import { License } from '../entity/License';

export class LicenseService {
  private licenseRepository: LicenseRepository;

  constructor() {
    this.licenseRepository = new LicenseRepository();
  }

  async create(license: License): Promise<License> {
    return await this.licenseRepository.create(license);
  }

  async list(): Promise<License[]> {
    return await this.licenseRepository.list();
  }

  async obtain(id: number): Promise<License> {
    return await this.licenseRepository.obtain(id);
  }

  async research(license: Partial<License>): Promise<License | null> {
    return await this.licenseRepository.research(license);
  }

  async remove(id: number): Promise<boolean> {
    try {
      const license = await this.licenseRepository.obtain(id);
      if (!license) {
        return false;
      }
      await this.licenseRepository.remove(license);
      return true;
    } catch (error) {
      console.error("Erro ao remover licença:", error);
      return false;
    }
  }

  async update(id: number, license: Partial<License>): Promise<void> {
    try {
      await this.licenseRepository.update(id, license);
    } catch (error) {
      console.error("Erro ao atualizar licença:", error);
    }
  }
}
