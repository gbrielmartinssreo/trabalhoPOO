import { Request, Response } from 'express';
import { StoreService } from '../service/StoreService';
import { Store } from '../entity/Store';

export class StoreController {
    private storeService: StoreService;

    constructor() {
        this.storeService = new StoreService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const store: Store = req.body;
            const newStore = await this.storeService.create(store);
            return res.status(201).json(newStore);
        } catch (error) {
            return res.status(400).json({ message: 'Erro na criacao da loja.', error: error.message });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const stores = await this.storeService.list();
            return res.status(200).json(stores);
        } catch (error) {
            return res.status(500).json({ message: 'Erro na listagem de lojas.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const store: Partial<Store> = req.body;
            await this.storeService.update(id, store);
            return res.status(200).json({ message: `Loja com ID ${id} atualizada com sucesso.` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar loja.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const store = await this.storeService.remove(id);
            return res.status(200).json({ message: `Loja com ID ${id} deletada com sucesso.`, store });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar loja.', error: error.message });
        }
    }
}

