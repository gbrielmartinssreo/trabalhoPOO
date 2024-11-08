import {DataSource} from "typeorm";

export const database = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "gbmm",
    password: "hunterxhunter",
    database: "sgdb_gameStore",
    synchronize: true,
    logging: false, 
    entities: ["./entity/**.ts"],
})
