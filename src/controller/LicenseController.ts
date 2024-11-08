import { Request, Response } from 'express';
import { LicenseService } from '../service/LicenseService';
import { License } from '../entity/License';

export class LicenseController {
    private licenseService: LicenseService;

    constructor() {
        this.licenseService = new LicenseService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const license: License = req.body;
            const newLicense = await this.licenseService.create(license);
            return res.status(201).json(newLicense);
        } catch (error) {
            return res.status(400).json({ message: 'Erro na criacao de licenca.', error: error.message });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const licenses = await this.licenseService.list();
            return res.status(200).json(licenses);
        } catch (error) {
            return res.status(500).json({ message: 'Erro na listagem de licencas.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const license: Partial<License> = req.body;
            await this.licenseService.update(id, license);
            return res.status(200).json({ message: `Licenca com ID ${id} atualizada com sucesso.` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar licenca.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const license = await this.licenseService.remove(id);
            return res.status(200).json({ message: `Licenca com ID ${id} deletada com sucesso.`, license });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar licenca.', error: error.message });
        }
    }
}

