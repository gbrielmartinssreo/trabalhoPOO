import { Repository } from "typeorm";
import {database} from "../data-source";
import { Game } from "../entity/Game";

export class GameRepository{
  private repository: Repository<Game>;

  constructor(){
    this.repository = database.getRepository(Game);
  }

  async create(game:Game):Promise<Game>{
    return await this.repository.save(game);
  }

  async list():Promise<Game[]>{
    return await this.repository.find();
  }

  async obtain(id:number):Promise<Game>{
    return await this.repository.findOneBy({id:id});
  }

  async research(game:Partial<Game>):Promise<Game|null>{
    return await this.repository.findOne({where:game});
  }

  async remove(game:Game):Promise<Game>{
    return await this.repository.remove(game);
  }

  async update(id:number,game:Partial<Game>):Promise<void>{
    await this.repository.update(id,game);
  }
}
