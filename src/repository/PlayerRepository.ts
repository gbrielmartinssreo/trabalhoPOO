import { Repository } from "typeorm";
import {database} from "../data-source";
import { Player } from "../entity/Player";

export class PlayerRepository{
	//cria um atributo do tipo Repository que vai ter q ter as propriedades de Player
	private repository:Repository<Player>;

	constructor(){
		//usa a funcao nativa do typeorm para pegar  o repositorio que foi criado de forma padrao e passa pro repositorio criado acima
		this.repository=database.getRepository(Player);
	}
	
	//cria um registro de Player
  	async create(c: Player): Promise<Player> {
    		return await this.repository.save(c);
  	}

	//lista todos os players
  	async findAll(): Promise<Player[]> {
    		return await this.repository.find();
  	}

	//encontra o registro de player com base no email
  	async findById(email: string): Promise<Player | undefined> {
    		return await this.repository.findOneBy({ email });
  	}

	//encontra o registro do player com base em info parcial
  	async findPartial(player: Partial<Player>): Promise<Player | null> {
    		return await this.repository.findOne({ where: player });
  	}

	//remove o registro de player
  	async delete(c: Player): Promise<Player> {
    		return await this.repository.remove(c);
  	}

	//atualiza o registro
  	async upd(email: string, c: Partial<Player>): Promise<void> {
    		await this.repository.update({ email }, c);
  	}
}

