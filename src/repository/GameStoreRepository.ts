import { Repository } from 'typeorm';
import {database} from "../data-source";
import { GameStore } from '../entity/GameStore';

export class GameStoreRepository{
	//isso cria um atributo do tipo Repository que vai ter as propriedades de GameStore
	private repository:Repository<GameStore>;

	constructor(){
		//usa a funcao nativ do typeorm para pegar o repositoruo criando padraomente e passa pro repositorio que criei
		this.repository=database.getRepository(GameStore);
	}

	//funcao pra criar o registro
  	async create(c: GameStore): Promise<GameStore> {
    		return await this.repository.save(c);
  	}

	//funcao que retorna todos os registros de GameStore
  	async findAll(): Promise<GameStore[]> {
    		return await this.repository.find();
  	}

	//funcao que busca o registro individual de GameStore com base na id
  	async findById(id: number): Promise<GameStore | undefined> {
    		return await this.repository.findOneBy({ id });
  	}

	//funcao que busca o registro com base em informacao parcial do registro
  	async find(gameStore: Partial<GameStore>): Promise<GameStore | null> {
    		return await this.repository.findOne({ where: gameStore });
  	}

	//funcao que apaga o registro
  	async remove(c: GameStore): Promise<GameStore> {
    		return await this.repository.remove(c);
  	}

	//funcao que atualiza o registro achando pela id e atualizando com info parcial
  	async update(id: number, c: Partial<GameStore>): Promise<void> {
    		await this.repository.update(id, c);
  	}

	//funcao que remove um jogo da loja
  	async deleteGameStoreByGameId(gameId: number): Promise<void> {
    		await this.repository.delete(gameId);
  	}
}
