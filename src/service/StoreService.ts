import { Loja } from '../entity/Loja';
import { LojaRepository } from '../repository/LojaRepository';

export class LojaService {
    private lojaRepository: LojaRepository;

    constructor() {
        this.lojaRepository = new LojaRepository();
    }

    async criar(loja: Loja): Promise<Loja> {
        return await this.lojaRepository.criar(loja);
    }

    async listar(): Promise<Loja[]> {
        return await this.lojaRepository.listar();
    }

    async obter(id: number): Promise<Loja | undefined> {
        return await this.lojaRepository.obter(id);
    }

    async pesquisar(loja: Partial<Loja>): Promise<Loja | null> {
        return await this.lojaRepository.pesquisar(loja);
    }

    async remover(id: number): Promise<boolean> {
        const loja = await this.lojaRepository.obter(id);
        if (!loja) {
            return false;
        }
        await this.lojaRepository.remover(loja);
        return true;
    }

    async atualizar(id: number, loja: Partial<Loja>): Promise<void> {
        await this.lojaRepository.atualizar(id, loja);
    }
}
