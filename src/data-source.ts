import { DataSource } from 'typeorm';
import { Genre } from './entity/Genre'; 
import { Game } from './entity/Game'; 
import { License } from './entity/License'; 
import { Player } from './entity/Player'; 
import { Store } from './entity/Store'; 

export const database = new DataSource({
  type: 'mysql', 
  host: 'localhost',
  port: 3306,
  username: 'gbmm',
  password: 'hunterxhunter',
  database: 'sgdb_gameStore',
  synchronize: true,  
  logging: false,
  entities: [Genre, Game, License, Player, Store], 
});
