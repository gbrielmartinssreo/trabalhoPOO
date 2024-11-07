import {DataSource} from "typeorm";

export const database = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3000,
    username: "gbmm",
    password: "hunterxhunter",
    database: "sgdb_gameStore",
    synchronize: true,
    logging: true, 
    entities: ["./entity/**.ts"],
})
