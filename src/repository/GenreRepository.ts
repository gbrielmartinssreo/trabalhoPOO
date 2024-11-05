import { Repository } from "typeorm";
import {database} from "../data-source";
import { Genre } from "../entity/Genre";

export class GenreRepository{
	private repository:Repository<Genre>;

	constructor(){
		this.repository=database.getRepository(Genre);
	}

  	async create(c: Genre): Promise<Genre> {
    		return await this.repository.save(c);
  	}

  	async findAll(): Promise<Genre[]> {
    		return await this.repository.find();
  	}

  	async findById(id: number): Promise<Genre | undefined> {
    		return await this.repository.findOneBy({ id });
  	}

  	async find(genre: Partial<Genre>): Promise<Genre | null> {
    		return await this.repository.findOne({ where: genre });
  	}

  	async remove(c: Genre): Promise<Genre> {
    		return await this.repository.remove(c);
  	}

  	async update(id: number, c: Partial<Genre>): Promise<void> {
    		await this.repository.update(id, c);
  	}
}

