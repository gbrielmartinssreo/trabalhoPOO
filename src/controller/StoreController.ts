import { Request, Response } from 'express';
import { StoreService } from '../service/StoreService';

export class StoreController {
  private storeService: StoreService;

  constructor() {
    this.storeService = new StoreService();
  }

  async create(req: Request, res: Response) {
    try {
      const store = req.body;
      const createdStore = await this.storeService.create(store);
      res.status(201).json(createdStore);
    } catch (error) {
      console.error('Erro ao criar loja:', error);
      res.status(500).json({ message: 'Erro ao criar loja' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const stores = await this.storeService.findAll();
      res.json(stores);
    } catch (error) {
      console.error('Erro ao buscar lojas:', error);
      res.status(500).json({ message: 'Erro ao buscar lojas' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const store = await this.storeService.findById(id);
      if (store) {
        res.json(store);
      } else {
        res.status(404).json({ message: 'Loja não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao buscar loja por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar loja por ID' });
    }
  }

  // ... (adicionar métodos para outras operações)
}
