import { Repository } from "typeorm";
import {database} from "../data-source";
import { Player } from "../entity/Player";

export class PlayerRepository{
  private repository: Repository<Player>;

  constructor(){
    this.repository = database.getRepository(Player);
  }

  async create(player:Player):Promise<Player>{
    return await this.repository.save(player);
  }

  async list():Promise<Player[]>{
    return await this.repository.find();
  }

  async obtain(email:string):Promise<Player>{
    return await this.repository.findOneBy({email:email});
  }

  async research(player:Partial<Player>):Promise<Player|null>{
    return await this.repository.findOne({where:player});
  }

  async remove(player:Player):Promise<Player>{
    return await this.repository.remove(player);
  }

  async update(email:string,player:Partial<Player>):Promise<void>{
    await this.repository.update(email,player);
  }
}
