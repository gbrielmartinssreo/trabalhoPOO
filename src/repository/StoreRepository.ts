import { Repository } from "typeorm";
import {database} from "../data-source";
import { Store } from "../entity/Store";

export class StoreRepository{
	private repository:Repository<Store>;
	
	constructor(){
		this.repository=database.getRepository(Store);
	}

    	async create(c: Store): Promise<Store> {
        	return await this.repository.save(c);
    	}

    	async findAll(): Promise<Store[]> {
        	return await this.repository.find();
    	}

    	async findById(id: number): Promise<Store | undefined> {
        	return await this.repository.findOneBy({ id });
    	}

    	async find(store: Partial<Store>): Promise<Store | null> {
        	return await this.repository.findOne({ where: store });
    	}

    	async remove(c: Store): Promise<Store> {
        	return await this.repository.remove(c);
    	}

    	async update(id: number, c: Partial<Store>): Promise<void> {
        	await this.repository.update(id, c);
    	}

}

