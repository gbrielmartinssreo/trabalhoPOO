import { Repository } from "typeorm";
import {database} from "../data-source";
import { Genre } from "../entity/Genre";

export class GenreRepository{
	//cria um atributo do tipo Repository que vai ter as propriedades de Genre
	private repository:Repository<Genre>;

	constructor(){
		//usa a funcao nativa do typeorm para pegar o repositorio criado padraomente e passa pro repositorio criado
		this.repository=database.getRepository(Genre);
	}

	//cria um registro 
  	async create(c: Genre): Promise<Genre> {
    		return await this.repository.save(c);
  	}

	//mostra todos os registros
  	async findAll(): Promise<Genre[]> {
    		return await this.repository.find();
  	}

	//busca o registro com base na id	
  	async findById(id: number): Promise<Genre | undefined> {
    		return await this.repository.findOneBy({ id });
  	}

	//busca o registro com base em info parcial
  	async findPartial(genre: Partial<Genre>): Promise<Genre | null> {
    		return await this.repository.findOne({ where: genre });
  	}

	//remove o registro
  	async delete(c: Genre): Promise<Genre> {
    		return await this.repository.remove(c);
  	}

	//atualiza o registro
  	async upd(id: number, c: Partial<Genre>): Promise<void> {
    		await this.repository.update(id, c);
  	}
}

