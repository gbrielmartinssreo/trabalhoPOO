import { Repository } from "typeorm";
import {database} from "../data-source";
import { Game } from "../entity/Game";

export class GameRepository{
	//isso cria um atributo do tipo Repository que vai ter q ter as propriedades de Game
	private repository:Repository<Game>;
	
	constructor(){
		//usa a funcao nativa do typeorm para pegar o repositorio criando padraomente e passa pro repositorio que criamos
		this.repository=database.getRepository(Game);
	}

	//funcao assincrona que cria um novo registro de Game
    	async create(c: Game): Promise<Game> {
        	return await this.repository.save(c);
    	}

	//funcao de buscar geral, lista tudo
    	async findAll(): Promise<Game[]> {
        	return await this.repository.find();
    	}

	//funcao pra buscar game com base na id
    	async findById(id: number): Promise<Game | undefined> {
        	return await this.repository.findOneBy({ id });
    	}

	//funcao de buscar game com base em poucas informacoes mas qualquer info
    	async find(game: Partial<Game>): Promise<Game | null> {
        	return await this.repository.findOne({ where: game });
    	}

	//funcao pra remover o registro do game
    	async remove(c: Game): Promise<Game> {
        	return await this.repository.remove(c);
    	}

	//funcao pra ir atualizar informacoes do game pegando a id pra achar o game e usando as info parciais pra atualizar
    	async update(id: number, c: Partial<Game>): Promise<void> {
        	await this.repository.update(id, c);
    	}

	//funcao que apaga o registro do game
    	async deleteGame(gameId: number): Promise<void> {
        	await this.repository.delete(gameId);

    	}
}
