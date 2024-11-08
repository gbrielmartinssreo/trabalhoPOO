import { Repository } from "typeorm";
import {database} from "../data-source";
import { Genre } from "../entity/Genre";

export class GenreRepository{
  private repository: Repository<Genre>;

  constructor(){
    this.repository = database.getRepository(Genre);
  }

  async create(genre:Genre):Promise<Genre>{
    return await this.repository.save(genre);
  }

  async list():Promise<Genre[]>{
    return await this.repository.find();
  }

  async obtain(id:number):Promise<Genre>{
    return await this.repository.findOneBy({id:id});
  }

  async research(genre:Partial<Genre>):Promise<Genre|null>{
    return await this.repository.findOne({where:genre});
  }

  async remove(genre:Genre):Promise<Genre>{
    return await this.repository.remove(genre);
  }

  async update(id:number,genre:Partial<Genre>):Promise<void>{
    await this.repository.update(id,genre);
  }
}

