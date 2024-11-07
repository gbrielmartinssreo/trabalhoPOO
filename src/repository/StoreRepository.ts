import { Repository } from "typeorm";
import {database} from "../data-source";
import { Store } from "../entity/Store";

export class StoreRepository{
	//isso cria um atributo do tipo Repository que vai ter as propriedades de Store
	private repository:Repository<Store>;
	
	constructor(){
		//usa a funcao nativa do typeorm para pegar o repositorio criando padraomente e passa pro repositorio de Store
		this.repository=database.getRepository(Store);
	}

	//cria um novo registro de Store
    	async create(c: Store): Promise<Store> {
        	return await this.repository.save(c);
    	}

	//lista todos os registros de Store
    	async findAll(): Promise<Store[]> {
        	return await this.repository.find();
    	}

	//busca o registro pela id
    	async findById(id: number): Promise<Store | undefined> {
        	return await this.repository.findOneBy({ id });
    	}

	//busca o registro com base em info parcial
    	async findPartial(store: Partial<Store>): Promise<Store | null> {
        	return await this.repository.findOne({ where: store });
    	}

	//remove o registro
    	async delete(c: Store): Promise<Store> {
        	return await this.repository.remove(c);
    	}

	//atualiza o registro
    	async upd(id: number, c: Partial<Store>): Promise<void> {
        	await this.repository.update(id, c);
    	}

}

