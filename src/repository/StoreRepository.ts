import { Repository } from "typeorm";
import {database} from "../data-source";
import { Store } from "../entity/Store";

export class StoreRepository{
  private repository: Repository<Store>;

  constructor(){
    this.repository = database.getRepository(Store);
  }

  async create(store:Store):Promise<Store>{
    return await this.repository.save(store);
  }

  async list():Promise<Store[]>{
    return await this.repository.find();
  }

  async obtain(id:number):Promise<Store>{
    return await this.repository.findOneBy({id:id});
  }

  async research(store:Partial<Store>):Promise<Store|null>{
    return await this.repository.findOne({where:store});
  }

  async remove(store:Store):Promise<Store>{
    return await this.repository.remove(store);
  }

  async update(id:number,store:Partial<Store>):Promise<void>{
    await this.repository.update(id,store);
  }
}
