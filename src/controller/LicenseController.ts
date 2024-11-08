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
            return res.status(400).json({ message: 'Error creating license.', error: error.message });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const licenses = await this.licenseService.list();
            return res.status(200).json(licenses);
        } catch (error) {
            return res.status(500).json({ message: 'Error listing licenses.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const license: Partial<License> = req.body;
            await this.licenseService.update(id, license);
            return res.status(200).json({ message: `License with ID ${id} updated successfully.` });
        } catch (error) {
            return res.status(400).json({ message: 'Error updating license.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const license = await this.licenseService.remove(id);
            return res.status(200).json({ message: `License with ID ${id} deleted successfully.`, license });
        } catch (error) {
            return res.status(400).json({ message: 'Error deleting license.', error: error.message });
        }
    }
}

